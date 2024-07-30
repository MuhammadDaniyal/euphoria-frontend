import React from "react";
import { BsThreeDots } from "react-icons/bs";
import contrubutor from "../../assets/images/contrubutor.png";
import eth from "../../assets/images/eth.png";

interface CardProps {
    name: string;
    ethAmount: string;
  }

const MarketContrubutor: React.FC <CardProps> = ({name, ethAmount }) => {
    return (
        <>
        <div className=" flex gap-2 justify-between px-3 items-center rounded-md text-white border-[2.2px] border-violet-800 py-1">
    
          <div className="flex justify-center items-center gap-1">
            <img src={contrubutor} alt="" height={40} width={40} />
          <div className="text-xs">
            <h2 >{name}</h2>
            <p className=" flex items-center gap-1"><img src={eth} alt="" width={12} height={12} /><span>{ethAmount} ETH</span></p>
          </div>
          </div>
    
    
          <div className=" cursor-pointer">
          <BsThreeDots fontSize={20} />
          </div>
    
        </div>
        </>
      );
}

export default MarketContrubutor