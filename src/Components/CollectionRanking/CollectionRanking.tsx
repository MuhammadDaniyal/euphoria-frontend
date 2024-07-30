import React from "react";
import RankingTable from "./RankingTable";

const CollectionRanking = () => {
  return (
    <>
      <section className="w-[90%] h-screen flex flex-col justify-start md:justify-center  gap-6 md:gap-12 text-white mx-auto py-8">
        <h3 className=" text-[33px] md:text-[40px] text-white font-bold">
          Top Collections
        </h3>
        <div className=" w-full">
          <RankingTable />
        </div>
      </section>
    </>
  );
};

export default CollectionRanking;
