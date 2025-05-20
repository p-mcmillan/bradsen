export const monitorOptions = {
  title: "Bradsen Server Monitor",
  path: "",
  //   websocket: null,
  spans: [
    { interval: 1, retention: 60 },
    { interval: 5, retention: 60 },
    { interval: 15, retention: 60 },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [
    {
      protocol: "http",
      host: "localhost",
      path: "/api/health",
      port: "3003",
    },
    {
      protocol: "http",
      host: "localhost",
      path: "/api/ping",
      port: "3003",
    },
  ],
};
