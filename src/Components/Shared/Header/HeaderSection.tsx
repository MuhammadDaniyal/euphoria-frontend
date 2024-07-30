import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiSearchAlt } from "react-icons/bi";
import { MdWallet } from "react-icons/md";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { requestAccount } from "../../../helpers/ConnectWallet/connect";
import { WalletType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../../redux/slices/createPage";
import { nanoid } from "@reduxjs/toolkit";
import { errorToastify } from "../../../utils/toast";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../../../utils/localstorage.instance";

interface Props {
  openMobileSidebar: boolean;
  setOpenMobileSidebar: (value: boolean) => void;
}

const HeaderSection = (props: Props) => {
  const { setOpenMobileSidebar } = props;
  const [isVisible, setVisible] = useState(false);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const location = useLocation();
  const { id, tag } = useParams();

  const listenToScroll = () => {
    let heightScroll = 200;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (windowScroll > heightScroll) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToDrop = (): void => {
    const dropElement: HTMLElement | null = document.getElementById("drop");
    if (dropElement) {
      dropElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const navigate = useNavigate();
  const [currentWallet, setCurrentWallet] = useState<WalletType | null>(
    JSON.parse((window as any).localStorage.getItem("walletId"))
  );

  const handleEthAccount = async () => {
    try {
      const walletData = await requestAccount();
      walletData &&
        window.localStorage.setItem("walletId", JSON.stringify(walletData));
      setCurrentWallet(walletData);
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify(String(error));
        }
      }
    }
  };

  const handleUserExistForCollection = () => {
    try {
      const walletId = getDataFromLocalStorage("walletId");
      const user = getDataFromLocalStorage("user");

      if (walletId) {
        user ? navigate("/create-collection") : navigate("/create-profile");
      }
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify(String(error));
        }
      }
    }
  };


  const handleConnect = async () => {
    try {
      handleEthAccount();
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify(String(error));
        }
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      removeDataFromLocalStorage("user");
      removeDataFromLocalStorage("walletId");
      // await (window as any).ethereum.request({
      //   method: "wallet_requestPermissions",
      //   params: [
      //     {
      //       eth_accounts: {},
      //     },
      //   ],
      // });
      window.location.reload();
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        errorToastify(String(error));
        console.log(String(error));
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".closeDropdown")
      ) {
        setOpenDropDown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [search, setSearch] = useState<string>();

  return (
    <>
      {location.pathname !== "/upload-nft" &&
        location.pathname !== "/create-collection" &&
        location.pathname !== "/marketplace" &&
        location.pathname !== "/single-collection" &&
        location.pathname !== `/collection/${tag}/${id}` && (
          <header
            className={` flex flex-col w-full z-[20000] ${
              isVisible ? "default-header  scroll-header" : "default-header "
            }`}
          >
            <section className=" flex justify-between items-center md:w-[80%] w-[88%] py-[14px] mx-auto">
              <div className=" flex md:justify-center justify-between md:gap-8 gap-4 items-center">
                <CgMenuLeft
                  className=" md:hidden block text-white text-2xl"
                  onClick={() => setOpenMobileSidebar(true)}
                />
                <button
                  onClick={scrollToDrop}
                  style={{ scrollPadding: "50px" }}
                  className={
                    " text-white md:text-base text-xs font-semibold hover:text-[#ffffffcc] tracking-wide transition-all duration-200 ease-in-out transform-gpu md:block hidden"
                  }
                >
                  Drops
                </button>
                <div
                  onClick={handleUserExistForCollection}
                  className={
                    " cursor-pointer text-white md:text-base text-xs font-semibold hover:text-[#ffffffcc] tracking-wide transition-all duration-200 ease-in-out transform-gpu"
                  }
                >
                  Create NFT
                </div>
                <NavLink
                  to={"/proposals"}
                  className={
                    " text-white md:text-base text-xs font-semibold hover:text-[#ffffffcc] md:tracking-wide tracking-normal transition-all duration-200 ease-in-out transform-gpu"
                  }
                >
                  Proposals
                </NavLink>
              </div>
              <div className=" relative w-[40%] md:block hidden">
                <BiSearchAlt className=" absolute text-2xl text-white z-50 top-3 left-4" />
                <input
                  placeholder="Search"
                  list="fruits"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className=" headerInputSearch rounded-lg w-full placeholder:text-white placeholder:text-base placeholder:font-light placeholder:tracking-wide focus:outline-none"
                />
                <div className="headerInputSearchSlash"> /</div>
              </div>
              {currentWallet ? (
                <div className="relative ">
                  <button
                    className={`w-fit flex justify-center items-center text-center rounded-lg text-white md:px-3 px-[5px] md:py-3 py-[5px] font-semibold transition duration-300 ease-in-out headerConnectBtn hover:shadow-md hover:scale-105 closeDropdown`}
                    title={currentWallet && currentWallet.walletAddress}
                    onClick={() => {
                      setOpenDropDown(!openDropDown);
                    }}
                  >
                    <span className="pr-2 border-r border-white">
                      <MdWallet className="md:text-[22px] text-xl text-white" />
                    </span>
                    <span className="pl-2 md:text-base text-xs ">
                      {currentWallet.walletBalance}
                    </span>
                  </button>
                  {openDropDown && (
                    <div
                      className=" absolute top-14 w-full flex justify-center items-center text-center rounded-lg text-white md:px-2 px-[5px] md:py-2 py-[5px] font-semibold transition duration-300 ease-in-out headerConnectBtn cursor-pointer z-50"
                      onClick={handleDisconnect}
                    >
                      <p className=" capitalize text-base">Disconnect</p>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={`md:w-[190px] w-fit flex justify-center items-center text-center rounded-lg text-white md:px-0 px-[10px] md:py-3 py-[10px] font-semibold transition duration-300 ease-in-out headerConnectBtn hover:shadow-md hover:scale-105`}
                  onClick={handleConnect}
                >
                  <span className=" md:mr-2">
                    <MdWallet className=" md:text-[22px] text-xl text-white" />
                  </span>
                  <span className="md:block hidden">Connect Wallet</span>
                </button>
              )}
            </section>
            <hr
              className={`${
                isVisible ? "w-[100%]" : "md:w-[90%] w-[94%]"
              } text-[#858586] mx-auto`}
            />
          </header>
        )}
    </>
  );
};

export default HeaderSection;
