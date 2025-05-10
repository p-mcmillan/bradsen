import { Link } from "react-router-dom";

const TeamMemberCard = ({ agentInfo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden min-[834px]:w-[375px]">
      <Link to={`/agent/${agentInfo.id}`}>
        <img
          src={agentInfo.agentImage}
          alt={agentInfo.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-2xl"
        />
        <div className="p-4">
          <h4 className="text-gray-700 font-semibold">{agentInfo.name}</h4>
        </div>
      </Link>

      <div className="px-4 pb-4 pt-0">
        <p className="text-sm text-gray-500">{agentInfo.title}</p>
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
    </div>
  );
};
export default TeamMemberCard;
