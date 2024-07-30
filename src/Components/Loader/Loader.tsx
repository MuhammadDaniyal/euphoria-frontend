import React from "react";
import "./Loader.css";
import logoImg from "../../assets/images/logo.png";

interface LoaderProps {
  classname?: string;
}

const Loader: React.FC<LoaderProps> = ({ classname }) => {
  return (
    <>
      <div className={` flex justify-center items-center ${classname}`}>
        <span className="loader">
            <img src={logoImg} alt="" />
        </span>
      </div>
    </>
  );
};

export default Loader;
