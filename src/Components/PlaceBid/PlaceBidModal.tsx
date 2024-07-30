import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BidModalType, WalletType } from "../../types";
import { IoClose } from "react-icons/io5";
import {
  listingprice,
  placeBid,
  roundNum,
  scientificToDecimal,
} from "../../helpers/functions/page";
import { requestAccount } from "../../helpers/ConnectWallet/connect";
import { errorToastify, succesToastify } from "../../utils/toast";
import Loader from "../Loader/Loader";
const PlaceBidModal = ({
  open,
  setOpen,
  cancelButtonRef,
  _id,
  settingstate,
  tdata,
}: BidModalType) => {
  const [formData, setFormData] = useState({ value: 0 });
  const closeModal = () => {
    setOpen(false);
  };

  const [currentWallet, setCurrentWallet] = useState<WalletType | null>();
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [isValid, setisValid] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (formData.value > 0) {
      try {
        setLoading(true);
        console.log(1);
        const pBid = await placeBid(
          _id,
          formData.value,
          Number(formData.value) + Number(calculatedValue)
        );
        // await pBid.wait();
        console.log(3);
        settingstate(!tdata);
        setLoading(false)
        closeModal();
        succesToastify("Bid placed successfully");
        setFormData({ value: 0 });
        // console.log("PBID==>", pBid);
      } catch (error) {
        // console.log(error);
        setLoading(false)
        // closeModal();
        if (error && (error as { reason: string }).reason) {
          errorToastify((error as { reason: string }).reason);
        } else if (
          error &&
          (error as { code: any }).code === "INSUFFICIENT_FUNDS"
        ) {
          errorToastify((error as { code: string }).code);
        } else if (error && (error as { message: string }).message) {
          errorToastify((error as { message: string }).message);
        } else {
          if (error) {
            errorToastify(String(`err=>${error}`));
          }
        }
      }
    } else errorToastify("Enter value");
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const acc = await requestAccount();
        setCurrentWallet(acc);
      } catch (error) {
        if (error && (error as { reason: string }).reason) {
          errorToastify((error as { reason: string }).reason);
        } else if (error && (error as { message: string }).message) {
          errorToastify((error as { message: string }).message);
        } else if (error && (error as { code: any }).code) {
          errorToastify((error as { code: string }).code);
        } else {
          if (error) {
            errorToastify(String(`err=>${error}`));
          }
        }
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const value = formData.value;
    const percentageValue = value * 0.15;
    // setisValid(!isNaN(percentageValue))
    setCalculatedValue(scientificToDecimal(Number(roundNum(percentageValue))));
  }, [formData.value]);

  // console.log("cal Value", !isNaN(calculatedValue))
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex flex-col gap-3 py-5 px-5 md:px-10 pb-10 transform overflow-hidden rounded-2xl bg-[#000B26] text-left shadow-xl transition-all 2xl:w-[40vw] xl:w-[32vw] md:w-[50vw]">
                  <div className="text-white flex justify-end items-end cursor-pointer">
                    <IoClose
                      className="text-2xl text-white"
                      onClick={closeModal}
                    />
                  </div>
                  {loading ? (
                    <Loader classname="h-[300px]" />
                  ) : (
                    <>
                      {/* first div */}
                      <div className="flex flex-col items-center text-white">
                        <h3 className="text-3xl">Place your bid</h3>
                        <p className="text-center md:text-left">
                          You are about to purchase This Product
                        </p>
                      </div>

                      {/* {Label} */}
                      <div className="flex-1 mt-5 mb-2">
                        <label className="text-base font-medium text-white">
                          Your Bid
                        </label>
                        <input
                          type="number"
                          step={0.01}
                          placeholder="Price in ETH"
                          name="creatorEarning"
                          onChange={(e) => {
                            setFormData({ value: parseFloat(e.target.value) });
                            // formData.value=Number(e.target.value)
                          }}
                          value={scientificToDecimal(Number(formData.value))}
                          className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                        />
                      </div>

                      {/* last one */}
                      <div className="flex flex-row text-[#cfcfcf] justify-between leading-6">
                        <div>
                          <p>Your Balance</p>
                          <p>15% Service Fee</p>
                          <p>Total Bid Amount</p>
                        </div>
                        <div>
                          {currentWallet && (
                            <p>{currentWallet.walletBalance}</p>
                          )}
                          {!isNaN(formData.value) ? (
                            <p>{calculatedValue} ETH</p>
                          ) : (
                            <p>0 ETH</p>
                          )}
                          {!isNaN(formData.value) ? (
                            <p>
                              {scientificToDecimal(
                                roundNum(
                                  Number(calculatedValue) +
                                    Number(formData.value)
                                )
                              )}{" "}
                              ETH
                            </p>
                          ) : (
                            <p>0 ETH</p>
                          )}
                        </div>
                      </div>
                      <div className="text-red-600 font-semibold text-center">
                        Note: Gas Fees will be added
                      </div>
                      {/* Button */}
                      <button
                        onClick={handleClick}
                        className="w-full flex justify-center items-center text-center rounded-lg text-white py-3 font-semibold transition duration-300 ease-in-out hover:shadow-md hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(103deg, #E2257A 0%, #563BDA 100%)",
                        }}
                      >
                        Place a Bid
                      </button>
                    </>
                  )}

                  {/* </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default PlaceBidModal;
