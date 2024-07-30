import React from "react";
import mainlogo from "../../../assets/images/mainlogo.png";
import { BsFacebook } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoInstagram } from "react-icons/io5";
import { RxTwitterLogo } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#000B26] px-8 md:px-16 py-10 mt-10">
        <div className="flex flex-wrap  justify-between w-full">
          {/* first div */}
          <div className=" flex flex-col gap-5">
            <img src={mainlogo} alt="" width={125} height={125} />
            <p className=" text-[#cfcfcf] leading-6">
              Buy and Sales 100+ Cryptocurrencies with flat currencies
              <br />
              market using bank transfer your credit/debit card.
            </p>
          </div>

          {/* second div */}
          <div className=" flex flex-wrap gap-10 md:gap-20 text-[#cfcfcf] mt-5 ">
            <div className=" flex flex-col gap-4">
              <h3 className=" text-lg font-bold">Marketplace</h3>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Explore
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  All NFT
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Collection
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Visual World
                </a>
              </div>
            </div>

            <div className=" flex flex-col gap-4">
              <h3 className=" text-lg  font-bold">Resources</h3>

              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Explore
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  All NFT
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Collection
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Visual World
                </a>
              </div>
            </div>

            <div className=" flex flex-col gap-4">
              <h3 className=" text-lg font-bold">Company</h3>

              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Explore
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  All NFT
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Collection
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegCircle color="#B900FF" fontSize={11} />
                <a href="" className="hover:text-[#B900FF]">
                  Visual World
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* line */}
        <div className="border-b-2 border-gray-400 w-[100%] my-7 md:my-10"></div>

        {/* third div */}
        <div className=" flex flex-col md:flex-row gap-5 items-center  justify-between text-[#cfcfcf]">
          <div className=" ">
            <p>&copy; 2022, All rights reserved</p>
          </div>

          {/* social icons */}
          <div className=" flex gap-5">
            <BsFacebook
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={24}
            />
            <ImLinkedin
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={24}
            />
            <IoLogoInstagram
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={24}
            />
            <RxTwitterLogo
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={24}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
