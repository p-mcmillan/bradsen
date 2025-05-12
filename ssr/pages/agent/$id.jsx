import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { agentInfo } from '../../constants';
import ContactForm from '../../components/ContactForm';

const AgentDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const agent = agentInfo;

  if (!agent) return <div className="p-6">Agent not found</div>;

  return (
    <div className=" mx-auto px-4 min-[834px]:px-8 min-[1440px]:px-16 mt-24 mb-12 max-w-[1344px]">
      <div className="   flex flex-col   min-[834px]:flex-row justify-between ">
        <div className=" min-[834px]:w-[333px] min-[1440px]:w-[433px]">
          {' '}
          <h3 className="min-[1440px]:text-[64px] min-[834px]:text-[40px] text-[32px] font-semibold mb-8">
            Agent Details
          </h3>
          <img
            src={agent.agentImage}
            alt={agent.name}
            className="w-full h-96 object-cover rounded mb-4 object-[50%_10%]"
          />
          <div className="p-3 mb-6 bg-white rounded-xl shadow">
            <div className="flex justify-between  ">
              <h4 className="text-gray-700 font-semibold">{agentInfo.name}</h4>

              <div className="flex gap-4 mt-2">
                <a
                  href={agentInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ion-icon
                    name="logo-instagram"
                    className="text-xl text-gray-700"
                  ></ion-icon>
                </a>

                <a
                  href={agentInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ion-icon
                    name="logo-linkedin"
                    className="text-xl text-gray-700"
                  ></ion-icon>
                </a>
              </div>
            </div>
            <p className=" text-gray">{agentInfo.title}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 mb-6  ">
            <div className="mt-4 space-y-2 ">
              <p>
                {' '}
                <ion-icon class="mr-4" name="call"></ion-icon>{' '}
                <a href={`tel:${agentInfo.phoneLink}`}>{agentInfo.phone}</a>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 mb-6  ">
            <div className="mt-4 space-y-2 ">
              <p>
                <ion-icon class="mr-4" name="navigate"></ion-icon>
                {agent.brokerage.address.street}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 mb-6  ">
            <div className="mt-4 space-y-2 ">
              <p>
                <ion-icon class="mr-4" name="mail"></ion-icon>{' '}
                <a href={`mailto:${agentInfo.email}`}>{agentInfo.email}</a>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className=" min-[834px]:w-[389px] text-gray-800 space-y-4">
            <section>
              <h3 className="font-semibold">About Me</h3>
              <p>{agent.bio}</p>
            </section>

            <section>
              <h3 className="font-semibold mt-4">Areas Served</h3>
              <ul className="list-disc list-inside">
                <li key={agent.id}>North Vancouver</li>
                <li key={agent.id}>Vancouver</li>
                <li key={agent.id}>Burnaby</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mt-4">Certifications</h3>
              <ul className="list-disc list-inside">
                <li key={agent.id}>Licensed Real Estate Agent</li>
              </ul>
            </section>
          </div>

          <ContactForm agent={agent} />
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
