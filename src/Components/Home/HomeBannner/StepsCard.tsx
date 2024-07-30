import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Steps } from "../../../data";

const StepsCard = () => {
  return (
    <>
      <section className="grid grid-cols-4 md:gap-6 gap-2 my-5 mx-auto md:mt-16 mt-10 md:w-[86%] w-[95%]">
        {Steps.map((item, i) => {
          return (
            <>
              {/* main card */}
              <div
                className="w-full md:py-4 py-2 bg-[#1f2045] relative z-[1] md:h-[260px]  rounded-xl cursor-pointer group"
                key={i}
              >
                {/* icon */}
                <div className="absolute z-[2] md:-right-4 md:-top-8 -right-2 -top-2">
                  <img
                    src={item.img}
                    alt=""
                    className=" md:w-full md:h-[65px]  w-7 h-7"
                  />
                </div>
                {/* innner  content*/}
                <div className=" h-full flex flex-col justify-center md:gap-4 gap-[6px] text-left md:px-6 px-2 group-hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                  <span className="md:text-[15px] text-[10px] text-[#cfcfcf] font-semibold tracking-[0.5px] uppercase">
                    Step-{item.step}
                  </span>
                  <h4 className="md:text-lg text-[10px] font-semibold text-white group-hover:text-[#B900FF] transition-colors duration-300 ease-in-out">
                    {item.title}
                  </h4>
                  <p className="md:text-sm text-[6px] text-[#cfcfcf] font-light">
                    {item.description}
                  </p>
                  <FaArrowRight className=" md:mt-2 mt-0 md:text-2xl text-[10px] text-[#cfcfcf] group-hover:text-[#B900FF] transition-colors duration-300 ease-in-out" />
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default StepsCard;
