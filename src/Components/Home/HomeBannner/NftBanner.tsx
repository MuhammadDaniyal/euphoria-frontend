import { NavLink } from "react-router-dom";
import StyledButton from "../../Shared/StyledButton";
import React from "react";

const NftBanner = () => {
  return (
    <section
      className=" bg-[url('./assets/images/ConnectWalletBackground.jpg')] bg-cover bg-center text-white
    w-full md:w-[86%] flex justify-center items-center gap-7 mx-auto mb-6 md:px-20 px-4 md:py-10 py-14 md:rounded-xl rounded-none"
    >
      <div className=" flex flex-col justify-center items-center gap-4 mx-auto">
        <h3 className=" text-white text-[23px] md:text-[35px] text-center leading-[45px] tracking-widest font-bold">
          Create, Sell and Collect <br /> NFT Digital Assests
        </h3>
        <p className=" text-[#cfcfcf] text-center text-sm md:text-base w-full md:w-[70%]">
          Explore the world of NFT creation with just a click! Discover our
          platform's intuitive process below, outlined in four easy steps. Start
          your journey towards unleashing your creativity and turning it into
          digital assets today!
        </p>

        <div className=" mt-2">
          <NavLink to="/create-collection">
            <StyledButton
              heading="Create NFT"
              bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
              width={160}
            />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NftBanner;
