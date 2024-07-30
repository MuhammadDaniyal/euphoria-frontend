import { formatEth, shortAdd, tohrd } from "../../helpers/functions/page";
import React, { useState } from "react";
import { _Nft } from "../../types";

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

const DetailTabPropertyCard = ({ auc }: { auc: _Nft }) => {
  // const[data,setData]=useState<any>(details.details[0])
  // console.log(details);
  // console.log(data);
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">
          Contract Address
        </span>
        <span className="text-sm tracking-[0.5px] text-white uppercase">
          {/* {data.contractAddress}
           */}
          {shortAdd(auc.own)}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Token ID</span>
        <span className="text-sm tracking-[0.5px] text-white uppercase">
          {/* {data.tokenId}
              1 */}
          {Number(auc.tokenId)}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Token Standard</span>
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
      {/* <div
            className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4"
          >
            <span className="text-xs text-[#cfcfcf] uppercase">
              Last Updated
            </span>
            <span className="text-sm tracking-[0.5px] text-white uppercase">
              {tohrd(Number(auc.startAt))}
            </span>
          </div> */}
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">
          Creator Earnings
        </span>
        <span className="text-sm tracking-[0.5px] text-white uppercase">
          {/* {data.creatorEarnings} */}
          {Number(auc.royality)} %
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-4">
        <span className="text-xs text-[#cfcfcf] uppercase">Reserved Price</span>
        <span className="text-sm tracking-[0.5px] text-white uppercase">
          {/* {data.creatorEarnings} */}
          {formatEth(auc.reservedPrice)}
        </span>
      </div>
    </>
  );
};

export default DetailTabPropertyCard;
