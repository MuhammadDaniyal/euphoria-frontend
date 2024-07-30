import React from "react";
import ProposalsTable from "./ProposalsTable";

const MainPage = () => {
  return (
    <>
      <section className="w-[90%] h-screen flex flex-col justify-start  gap-6 md:gap-6 text-white mx-auto py-8">
        <h3 className=" text-[33px] md:text-[40px] text-white font-bold">
          Active Proposals
        </h3>
        <div className=" w-full">
          <ProposalsTable />
        </div>
      </section>
    </>
  );
};

export default MainPage;