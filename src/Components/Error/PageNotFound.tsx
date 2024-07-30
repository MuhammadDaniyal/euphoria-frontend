import React from "react";
import StyledButton from "../Shared/StyledButton";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="text-center p-20 flex flex-col justify-center items-center marketPlaceBgImg h-screen text-white">
        <h3 className=" bg-text-image text-[200px] font-bold mb-4 bg-white">Oops!</h3>
        <h3 className=" text-[30px] font-medium">
          {" "}
          404 - PAGE NOT FOUND{" "}
        </h3>
        <p className="mb-10">
          The page you are looking for might have been removed <br /> had its
          name changed or is temporarily unavailable.
        </p>
        <NavLink to={'/'}>
        <StyledButton
          heading="GO TO HOMEPAGE"
          bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
          width={180}
        />
        </NavLink>
      </div>
    </>
  );
};

export default PageNotFound;
