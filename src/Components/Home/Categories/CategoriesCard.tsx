import React from "react";
import { CategoriesCardProps } from "../../../types/index";
import { useNavigate } from "react-router-dom";

const CategoriesCard: React.FC<CategoriesCardProps> = ({
  title,
  cardimage,
}) => {
  const navigate = useNavigate();

  const handletagChange = (title: string) => {
    navigate("/marketplace", {
      state: title,
    });
  };
  return (
    <>
      <div
        className={`relative bg-slate-600 md:py-24 py-[90px] md:px-[82px] w-full h-24 md:w-[200px] md:h-[220px] flex flex-col justify-center items-center mb-0 md:mb-10 rounded-2xl`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.419), rgba(65, 61, 61, 0.97)), url(${cardimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className=" text-white font-bold text-xl text-center">{title}</h2>
        <button
          className="absolute bottom-0 md:text-sm text-xs bg-white py-[11px] md:px-8 rounded-[10px] mb-5 font-semibold text-[#B900FF] md:w-40 w-[80%]"
          onClick={() => {
            handletagChange(title);
          }}
        >
          See all {title}
        </button>
      </div>
    </>
  );
};

export default CategoriesCard;
