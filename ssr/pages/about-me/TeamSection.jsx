import React from "react";
import TeamMemberCard from "../../components/TeamMemberCard"; // Adjust the import path as needed

const TeamSection = ({ agentInfo }) => {
  return (
    <section className=" pt-6">
      <h4 className=" mb-8  min-[834px]:text-[40px]">
        Leadership That Delivers
      </h4>

      <div className="">
        <TeamMemberCard agentInfo={agentInfo} />
      </div>
    </section>
  );
};

export default TeamSection;
