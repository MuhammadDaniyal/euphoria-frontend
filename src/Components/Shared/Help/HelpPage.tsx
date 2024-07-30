import React from "react";
import HeaderSection from "../Header/HeaderSection";
import FAQ from "../../../Components/Home/FAQ";
import StyledButton from "../StyledButton";
import { BsFacebook } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { IoLogoInstagram } from "react-icons/io5";
import { RxTwitterLogo } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";

const HelpPage = () => {
  return (
    <>
      <div className="h-full">

        {/* main heading */}
        <h3 className=" text-[35px] md:text-[44px] px-5 md:px-16 pt-7 text-white font-bold">
          Help Center
        </h3>

        {/* fqa section */}
        <div className="px-5 md:px-16 py-5"> 
        <FAQ />
        </div>

        <div className="px-5 md:px-16 py-5">
          <hr className="border-t border-gray-300" />
        </div>

        {/* question form */}
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row px-5 md:px-16 py-5">
          {/* first Section  (content) */}
          <div className="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start">
            <h3 className=" text-xl md:text-3xl text-white font-bold">
              Submit your question
            </h3>
            <p className=" text-sm text-center md:text-start md:text-base text-white md:w-2/3 pt-4 leading-5">
              {" "}
              Didn’t find the solution. We are here to help. Send us your
              questions and we will get back to you.{" "}
            </p>
          </div>

          {/* Second Section (form and btn) */}
          <div className=" flex flex-col flex-1">
            {/* form */}
            <div className="  flex flex-col ">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
              />

              <div className=" flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                  />
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Tell us more about it"
                cols={5}
                rows={5}
                className="collectionforminput rounded-lg  mt-3 w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none collectionforminput"
              />
            </div>

            {/* submit btn */}
            <div className=" flex justify-end mt-5">
              <StyledButton
                heading="Submit"
                bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
                width={150}
              />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-16 py-5">
          <hr className="border-t border-gray-300" />
        </div>

        {/* last section */}
        <div className="px-5 md:px-16 py-5 flex flex-col gap-4 justify-center items-center md:justify-start md:items-start">
          <div className=" w-full">
          <h3 className=" text-xl text-center md:text-start md:text-3xl text-white font-bold">
            Ask us anything, anywhere
          </h3>
          <p className=" text-sm text-center md:text-start md:text-base text-white md:w-2/3 pt-4 leading-5">
            Drop us a question anywhere at your convenience
          </p>
          </div>

          <div className=" flex gap-5 text-white">
            <IoLogoInstagram
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={25}
            />
            <RxTwitterLogo
              className=" cursor-pointer hover:text-[#B900FF]"
              fontSize={25}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default HelpPage;
