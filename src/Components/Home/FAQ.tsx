import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { faqs } from "../../data";

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState<boolean[]>(
    new Array(faqs.length).fill(false)
  );

  const handleAccordionClick = (index: number) => {
    setOpenIndexes((prevState) => {
      const newOpenIndexes = prevState.map((item, i) =>
        i === index ? !prevState[i] : false
      );
      return newOpenIndexes;
    });
  };

  return (
    <div className="text-white mx-auto max-w-7xl px-5 sm:py-8 lg:px-8">
      {/* FAQ */}
      <div className="flex flex-col justify-center items-center mx-auto max-w-4xl divide-y divide-gray-900/10">
        <div className="flex max-w-[768px] flex-col items-center justify-center gap-5">
          <h3 className="text-center text-3xl font-semibold md:text-4xl">
            FAQ'ssss
          </h3>
        </div>
        {/* ACCORDION */}
        <div className="w-full mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((step, index) => (
            <div
              key={index}
              className="p-5 bg-[#000B26] rounded-xl cursor-pointer"
            >
              <button
                className="flex w-full items-start justify-between text-left"
                onClick={() => handleAccordionClick(index)}
                type="button"
                data-track={`faq-button-${step.question
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <span className="text-sm font-semibold leading-7">
                  {step.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  {openIndexes[index] ? (
                    <IoIosArrowUp className="text-xl" />
                  ) : (
                    <IoIosArrowDown className="text-xl" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-300 mt-2 pr-12 ${
                  openIndexes[index]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-sm font-extralight leading-7">
                  {step.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;