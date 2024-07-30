import {
  formatEth,
  shortAdd,
  ContAdd,
  rTime,
} from "../../helpers/functions/page";
import React, { useState } from "react";
// import { _Nft } from "../../types";

type MarketCardProps1 = {
  own: string;
  seller: string;
  tokenId: number;
  Imagelink: string;
  reservedPrice: number;
  startAt: number;
  endAt: number;
  status: number;
  highestBid: number;
  highestBidder: string;
};

const DetailTabPropertyCard = ({
  cAt,
  TNft,
}: {
  cAt: number;
  TNft: number;
}) => {
  // const[data,setData]=useState<any>(details.details[0])
  // console.log(details);
  // console.log(data);
  return (
    <>
      <div className=" flex flex-wrap items-center gap-3">
        <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
          <span className="text-xs text-[#cfcfcf] uppercase">
            Contract Address
          </span>
          <span className="text-sm tracking-[0.5px] text-white uppercase">
            {shortAdd(ContAdd())}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
          <span className="text-xs text-[#cfcfcf] uppercase">Created At</span>
          <span className="text-sm tracking-[0.5px] text-white uppercase">
            {rTime(Number(cAt))}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
          <span className="text-xs text-[#cfcfcf] uppercase">Total Nfts</span>
          <span className="text-sm tracking-[0.5px] text-white uppercase">
            {Number(TNft)}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
          <span className="text-xs text-[#cfcfcf] uppercase">
            Token Standard
          </span>
          <span className="text-sm tracking-[0.5px] text-white uppercase">
            {/* {data.tokenStandard} */}
            ERC721
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
          <span className="text-xs text-[#cfcfcf] uppercase">Chain</span>
          <span className="text-sm tracking-[0.5px] text-white uppercase">
            {/* {data.chain} */}
            SEPOLIA ETH
          </span>
        </div>
      </div>
    </>
  );
};

export default DetailTabPropertyCard;
