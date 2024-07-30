import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LoadingModalType } from "../../../types";
import mainlogo from "../../../assets/images/mainlogo.png";

const LoadingModal = ({
  open,
  setOpen,
  cancelButtonRef,
  loadingText,
  textToDisplay,
}: LoadingModalType) => {
  const closeModal = () => {
    setOpen(false);
  };

  const [dots, setDots] = useState("");
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (isIncreasing) {
          if (prevDots.length === 4) {
            setIsIncreasing(false);
            return prevDots.slice(0, -1);
          }
          return prevDots + ".";
        } else {
          if (prevDots.length === 0) {
            setIsIncreasing(true);
            return prevDots + ".";
          }
          return prevDots.slice(0, -1);
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isIncreasing]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99999]"
          initialFocus={cancelButtonRef}
          onClose={() => null}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex flex-col gap-3 py-5 px-5 md:px-10 pb-6 transform overflow-hidden rounded-2xl bg-[#000B26] text-left shadow-xl transition-all 2xl:w-[40vw] xl:w-[32vw] md:w-[50vw]">
                  <div className=" flex flex-col justify-center items-center gap-4 text-white">
                    <div>
                      <img src={mainlogo} alt="" width={110} height={110} />
                    </div>

                    <div>
                      <h3 className="text-base font-medium capitalize">
                        {textToDisplay}
                      </h3>
                    </div>

                    <div className="text-xl font-medium capitalize text-white">
                      {loadingText}
                      <span className=" text-2xl text-[#B900FF] font-bold">
                        {dots}
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default LoadingModal;
