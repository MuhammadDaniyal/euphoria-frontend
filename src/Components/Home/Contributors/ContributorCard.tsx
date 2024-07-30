import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import contrubutor from "../../assets/images/contrubutor.png";
import eth from "../../assets/images/eth.png";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CardProps {
  name: string;
  walletAddress?: string;
  img?: string;
  ethAmount?: string;
  role?: string;
}

const ContributorCard: React.FC<CardProps> = ({
  name,
  ethAmount,
  img,
  walletAddress,
  role,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex flex-col gap-5 justify-center items-center rounded-md text-white p-2">
        <div
          className=" relative w-24 h-24 cursor-pointer transition-all duration-300 ease-in-out transform-gpu hover:scale-110"
          onClick={() => navigate(`/profile/${walletAddress}`)}
        >
          <img
            src={
              img ||
              "https://html.ditsolution.net/nftpro/assets/images/resource/seller3.png"
            }
            className=" object-cover w-full h-full rounded-md"
            alt=""
            height={100}
            width={100}
          />
          {role === "celebrity" && (
            <div className=" absolute -top-1 -right-1 bg-cyan-500 rounded-full p-1">
              <FaCheck className=" text-white text-xs" />
            </div>
          )}
        </div>
        <div className=" flex flex-col justify-center items-center gap-2">
          <h4
            className="text-xl font-semibold cursor-pointer hover:text-[#B900FF] transition-colors duration-300 ease-in-out"
            onClick={() => navigate(`/profile/${walletAddress}`)}
          >
            {name}
          </h4>
          <p className=" text-[17px] text-[#B900FF]">{ethAmount} ETH</p>
        </div>
      </div>
    </>
  );
};

export default ContributorCard;
