import moment from "moment";

function PMT(ir, np, pv, fv = 0, type = 0) {
  if (ir === 0) return -(pv + fv) / np;
  const pvif = Math.pow(1 + ir, np);
  let pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);
  if (type === 1) pmt /= 1 + ir;
  return pmt;
}

function getPeriodsPerYear(freq) {
  return (
    {
      Annually: 1,
      "Semi-Annually": 2,
      Quarterly: 4,
      "Bi-Monthly": 6,
      Monthly: 12,
      "Semi-Monthly": 24,
      "Bi-Weekly": 26,
      Weekly: 52,
      "Acc. Bi-Weekly": 26,
      "Acc. Weekly": 52,
    }[freq] || 12
  );
}

function getDateStep(freq) {
  return (
    {
      Annually: { value: 1, unit: "year" },
      "Semi-Annually": { value: 6, unit: "months" },
      Quarterly: { value: 3, unit: "months" },
      "Bi-Monthly": { value: 2, unit: "months" },
      Monthly: { value: 1, unit: "month" },
      "Semi-Monthly": { value: 0.5, unit: "month" },
      "Bi-Weekly": { value: 2, unit: "weeks" },
      Weekly: { value: 1, unit: "week" },
      "Acc. Bi-Weekly": { value: 2, unit: "weeks" },
      "Acc. Weekly": { value: 1, unit: "week" },
    }[freq] || { value: 1, unit: "month" }
  );
}

export function calculateMortgage(inputs) {
  const {
    mortgageAmount,
    amortizationMonths,
    interestRate,
    paymentFrequency,
    firstPaymentDate,
    extraPayment,
    paymentInterval,
    extraAnnualPayment,
  } = inputs;

  const results = {};
  const schedule = [];

  const periodsPerYear = getPeriodsPerYear(paymentFrequency);
  const numberOfPayments = (periodsPerYear * amortizationMonths) / 12;

  // Convert annual rate to monthly compounded then to payment frequency
  const monthlyRate = Math.pow(1 + interestRate / 100 / 2, 1 / 6) - 1;
  const ratePerPeriod = monthlyRate * (12 / periodsPerYear);

  let payment =
    -PMT(monthlyRate, amortizationMonths, mortgageAmount) /
    (periodsPerYear / 12);

  if (paymentFrequency === "Acc. Bi-Weekly") payment = payment / 2;
  if (paymentFrequency === "Acc. Weekly") payment = payment / 4;

  let balance = mortgageAmount;
  let totalInterest = 0;
  const chartLabels = [];
  const chartBalance = [];
  const chartInterest = [];

  let currentDate = moment(firstPaymentDate);
  let payoffDate = null;

  for (let i = 1; i <= Math.ceil(numberOfPayments); i++) {
    let interest = balance * ratePerPeriod;
    let principal = payment - interest;

    let extra = 0;
    if (paymentInterval > 0 && i % paymentInterval === 0) extra += extraPayment;
    if (i % periodsPerYear === 0) extra += extraAnnualPayment;
    principal += extra;

    if (principal > balance) {
      principal = balance;
      payment = interest + principal;
    }

    balance -= principal;
    totalInterest += interest;

    const dueDate = currentDate.clone().format("YYYY-MM-DD");
    currentDate.add(
      getDateStep(paymentFrequency).value,
      getDateStep(paymentFrequency).unit
    );
    payoffDate = dueDate;

    schedule.push({
      index: i,
      dueDate,
      payment: +payment.toFixed(2),
      extraPayment: +extra.toFixed(2),
      interest: +interest.toFixed(2),
      principal: +principal.toFixed(2),
      balance: +balance.toFixed(2),
    });

    chartLabels.push(dueDate);
    chartBalance.push(+balance.toFixed(2));
    chartInterest.push(+totalInterest.toFixed(2));

    if (balance <= 0) break;
  }

  results.mortgagePayment = +payment.toFixed(2);
  results.totalCost = +(mortgageAmount + totalInterest).toFixed(2);
  results.totalInterest = +totalInterest.toFixed(2);
  results.totalPayments = schedule.length;
  results.payoffDate = payoffDate;
  results.chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Balance",
        data: chartBalance,
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
      },
      {
        label: "Total Interest",
        data: chartInterest,
        backgroundColor: "#9CCC65",
        borderColor: "#7CB342",
      },
    ],
  };
  results.pieData = {
    labels: ["Mortgage Amount", "Total Interest Paid"],
    datasets: [
      {
        data: [mortgageAmount, +totalInterest.toFixed(2)],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  results.amortizationSchedule = schedule;

  return results;
}
