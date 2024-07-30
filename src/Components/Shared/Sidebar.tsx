import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import profileImg from "../../assets/images/profileImg.jpeg";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { BiSearchAlt, BiCollection, BiDroplet } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosArrowUp, IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import Art from "../../assets/images//art.jpg";
import Game from "../../assets/images//game.jpg";
import Music from "../../assets/images//music.jpg";
import Sports from "../../assets/images//sports.jpg";
import Collection from "../../assets/images/collection.png";
import MessiLogo from "../../assets/images/messi.jpg";
import { getAdd, grpsell, listedAuction } from "../../helpers/functions/page";

import UserLogo1 from "../../assets/images/user2.png";
import { AllCollections } from "../../data";
import { MdWallet } from "react-icons/md";
import { getJson } from "../../helpers/apiInstance";
import { errorToastify } from "../../utils/toast";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../utils/localstorage.instance";
import { requestAccount } from "../../helpers/ConnectWallet/connect";

interface Props {
  openMobileSidebar: boolean;
  setOpenMobileSidebar: (value: boolean) => void;
}
interface P_type {
  backgroundPic: string;
  coverPic: string;
  email: string;
  managerEmail: string;
  managerNumber: number;
  name: string;
  profilePic: string;
  role: string;
  status: string;
  username: string;
  walletAddress: string;
  websiteURL: string;
}
interface Item {
  own: string;
  seller: string;
  tokenId: number;
  Imagelink: string;
  reservedPrice: number;
  startAt: number;
  endAt: number;
  status: number;
  highestBid: number;
  highestBidder: string;
  royality: number;
  HON: string;
  category: string;
  collection: string;
}

interface CollectionGroup {
  collection: string;
  seller: string;
  price: number;
  items: Item[];
}

const Sidebar = (props: Props) => {
  const navigate = useNavigate();
  const { openMobileSidebar, setOpenMobileSidebar } = props;
  const location = useLocation();
  const [active, setActive] = useState<number>(1);
  const [dropDown, setDropDown] = useState<boolean[]>([false, true]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(true);
  const [collections, setCollections] = useState<
    Array<{
      id: number | null;
      title: string;
      logo: string;
      tag: string;
    }>
  >([
    {
      id: null,
      title: "",
      logo: "",
      tag: "",
    },
  ]);
  const [add, setAdd] = useState("");

  const handleDropdownClick = (index: number | null) => {
    if (index !== null) {
      const newDropDown = [...dropDown]; // Create a copy of the current state

      // Toggle the state of the clicked index
      newDropDown[index] = !newDropDown[index];

      setDropDown(newDropDown); // Update the state
    }
  };

  // useEffect(() => {
  //   // Check if the current pathname matches any link

  //   const fetchdata = async () => {
  //     try {
  //       const _add = await getAdd()
  //       const matchingLink = Links.find((link) => location.pathname === link.link);
  //       if (matchingLink) {
  //         setActive(matchingLink.id);
  //       }
  //       console.log("address==>", _add)
  //       setAdd(_add);

  //     } catch (error) {
  //       // console.log(error)
  //       if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
  //       // else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
  //       else if (error && (error as { message: string }).message) { }
  //       else { if (error) { errorToastify(String(error)) } }
  //     }
  //   }
  //   fetchdata()
  // }, [location.pathname]);

  // kaam ka nii
  useEffect(() => {
    try {
      // const updatedCollections = AllCollections.map((item) => ({
      //   id: item.id,
      //   title: item.name,
      //   logo: item.logo,
      //   tag: item.tag,
      // }));
      // setCollections(updatedCollections);
      const fetchData = async () => {
        const data = await listedAuction();
        console.log(1)
        const val = grpsell(data);
        setAuc(val);
      };
      fetchData();
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
  }, [AllCollections]);

  const Links = [
    {
      id: 1,
      button: <GoHome className=" text-white text-[24px]" />,
      link: "/",
      title: "Home",
    },
    {
      id: 2,
      button: <RxDashboard className=" text-white text-[24px] " />,
      link: "/marketplace",
      title: "MarketPlace",
    },
    {
      id: 3,
      button: <TbCategoryPlus className=" text-white text-[24px] " />,
      link: "#",
      title: "Categories",
      categoriesdropdownitems: [
        {
          title: "Sports",
          img: Sports,
        },
        {
          title: "Game",
          img: Game,
        },
        {
          title: "Art",
          img: Art,
        },
      ],
    },
    {
      id: 4,
      button: <BiCollection className=" text-white text-[24px] " />,
      link: "#",
      title: "Collections",
      dropdownitems: collections,
    },
    {
      id: 5,
      button: (
        <HiOutlineQuestionMarkCircle className=" text-white text-[24px] " />
      ),
      link: "/help",
      title: "Help Center",
    },
  ];
  const [userId, setUserId] = useState<string>("");
  const [userData, setuserData] = useState<P_type>();
  const [found, setFound] = useState<boolean>(false);
  const [auc, setAuc] = useState<CollectionGroup[]>([]);
  const user = getDataFromLocalStorage("user");
  const wallet = getDataFromLocalStorage("walletId");
  // console.log(wallet, user);

  useEffect(() => {
    // handleEthAccount()
    const matchingLink = Links.find((link) => location.pathname === link.link);
    if (matchingLink) {
      setActive(matchingLink.id);
    }

    if (user && wallet) {
      setAdd(wallet.walletAddress);
      setuserData(user);
      setLoading(true);
      setFound(true);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const add = await getAdd()
  //       const response = await getJson(`${process.env.BASE_URL}/api/profile/${add}`);
  //       if (response) {
  //         setuserData(response)
  //         // console.log("==>", response)
  //         setFound(true)
  //       }

  //     } catch (error) {
  //       setFound(false)
  //       if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
  //       // else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
  //       else if (error && (error as { message: string }).message) { }
  //       else { if (error) { errorToastify(String(error)) } }
  //     }
  //   }
  //   try {
  //     const id = window.localStorage.getItem("id");
  //     setUserId(id as string);

  //   } catch (error) {
  //     if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
  //     else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
  //     else { if (error) { errorToastify(String(error)) } }
  //   }
  //   fetchData()
  // }, [window.localStorage.getItem("id")]);
  // console.log("user id ", userId);

  const handleEthAccount = async () => {
    try {
      // const _add = await getAdd();
      // console.log("addddd", _add);

      
      const walletData = await requestAccount();
      walletData &&
      window.localStorage.setItem("walletId", JSON.stringify(walletData));
      setLoop(false);
      setAdd(walletData.walletAddress);

      //==========
      const response = await getJson(
        `${process.env.BASE_URL}/api/profile/${walletData.walletAddress}`
      );
      if (response) {
        console.log("ress",response)
        setuserData(response);
        setDataInLocalStorage("user", response);
        // console.log("==>", response)
        setFound(true);
      }

      // ===========
      const matchingLink = Links.find(
        (link) => location.pathname === link.link
      );
      if (matchingLink) {
        setActive(matchingLink.id);
      }
      // ===========

      setLoading(true);
    } catch (error) {
      setLoop(true);
      setFound(false);
      setLoading(false);

      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (
        error &&
        (error as { message: string }).message ==
        "Request failed with status code 404"
      ) {
        errorToastify((error as { message: string }).message);
        navigate(`/create-profile`);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        errorToastify(String(error));
      }
    }
  };

  return (
    <div
      className={`${openMobileSidebar
        ? " fixed top-0 md:w-[70px] md:hover:w-64 w-[70%]"
        : " md:w-[70px] md:hover:w-64 w-0"
        } flex py-4 fixed flex-col  hover:items-start justify-between border-r border-[#858586] h-full bg-[#1f2045] pl-0 z-[2000] group transition-width duration-300 ease-out delay-250`}
    >
      <div
        className={`${openMobileSidebar ? " w-60" : "w-0"
          } flex flex-col  md:w-[60px] md:group-hover:w-60 group-hover:items-start gap-8 
      transition-width duration-300 ease-out delay-250 overflow-y-scroll scrollbarHide`}
      >
        <div className=" w-full flex justify-between items-center">
          <img
            src={logoImg}
            alt="logo"
            className=" ml-3 w-10 h-10 rounded-[50%] object-cover"
          />
          <IoClose
            className=" md:hidden text-2xl text-white"
            onClick={() => setOpenMobileSidebar(false)}
          />
        </div>
        <div
          className=" flex flex-col items-center group-hover:items-start gap-3 w-full 
        transition-width duration-200 ease-out delay-250"
        >
          {Links.map((item, i) => {
            return (
              <>
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={`flex items-center gap-3 py-[8px] pl-4 pr-2 rounded-e-[20px] w-full
                ${active === item.id ? "bg-slate-500" : ""}
                ${active !== item.id ? "hover:bg-slate-600" : ""}
              `}
                  onClick={() => {
                    setActive(item.id);

                    (item.title === "Categories" ||
                      item.title === "Collections") &&
                      handleDropdownClick(item.title === "Categories" ? 0 : 1);
                  }}
                >
                  {item.button}
                  <p
                    className={`${openMobileSidebar && "block"
                      } md:hidden md:group-hover:block text-white `}
                  >
                    {item.title}
                  </p>
                  {item.title === "Categories" && (
                    <span
                      className={`${openMobileSidebar && "block"
                        } md:hidden ml-auto md:group-hover:block`}
                    >
                      {dropDown[0] ? (
                        <IoIosArrowDown className="text-xl text-white" />
                      ) : (
                        <IoIosArrowBack className="text-xl text-white" />
                      )}
                    </span>
                  )}
                  {item.title === "Collections" && (
                    <span
                      className={`${openMobileSidebar && "block"
                        } md:hidden ml-auto md:group-hover:block`}
                    >
                      {dropDown[1] ? (
                        <IoIosArrowDown className="text-xl text-white" />
                      ) : (
                        <IoIosArrowBack className="text-xl text-white" />
                      )}
                    </span>
                  )}
                </NavLink>
                {item.title === "Categories" && dropDown[0] && (
                  <div
                    className={`${openMobileSidebar && "block"
                      } flex-col md:justify-start justify-between items-start gap-3 py-[4px] pl-12 pr-2 rounded-e-[20px] w-full md:hidden md:group-hover:flex text-white `}
                  >
                    {item.categoriesdropdownitems?.map((dropdown, i) => {
                      return (
                        <div
                          key={i}
                          className=" flex  justify-start items-center gap-3 py-[4px]">
                          <img
                            src={dropdown.img}
                            className=" rounded-md w-8 h-8"
                            alt=""
                          />
                          <a href="#">{dropdown.title}</a>
                        </div>
                      );
                    })}
                  </div>
                )}
                {item.title === "Collections" && dropDown[1] && (
                  <div
                    className={`${openMobileSidebar && "block"
                      } flex-col md:justify-start justify-between items-start gap-3 py-[4px] pl-12 pr-2 rounded-e-[20px] w-full md:hidden md:group-hover:flex text-white overflow-y-scroll h-40 scroll-marketplace-dropdown `}
                  >
                    {/* {item.dropdownitems?.map((dropdown: any, i) => {
                      return (
                        <NavLink
                          className=" text-sm"
                          to={`/collection/${dropdown.tag}/${dropdown.id}`}
                        >
                          <div className=" flex  justify-start items-center gap-3 py-[4px]">
                            <img
                              src={dropdown.logo}
                              className="rounded-md w-8 h-8"
                              alt=""
                            />
                            <div className=" flex flex-col">
                              {dropdown.title}
                            </div>
                          </div>
                        </NavLink>
                      );
                    })} */}
                    {auc &&
                      auc.length > 0 &&
                      auc.map((item: CollectionGroup, i) => {
                        return (
                          <NavLink
                            key={i}
                            className=" text-sm"
                            to={`/collection/${item.collection}/${item.seller}/0`}
                          >
                            <div className=" flex  justify-start items-center gap-3 py-[4px]">
                              <img
                                src={item.items[0].Imagelink}
                                className="rounded-md w-8 h-8"
                                alt=""
                              />
                              <div className=" flex flex-col">
                                {item.collection}
                              </div>
                            </div>
                          </NavLink>
                        );
                      })}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {loading && add && add != "" ? (
        found && userData?.status != "rejected"  ? (
          userData?.status == "accepted" || userData?.role == "fan" ? (
            <NavLink to={add ? `/profile/${add}` : `/profile/1`}>
              <div
                className={` flex justify-start items-center gap-4  bottom-0 mt-5 text-white`}
              >
                <img
                  src={userData && userData?.profilePic}
                  alt="profile"
                  className=" ml-4 w-10 h-10 rounded-[50%] object-cover"
                />
                <div
                  className={`${openMobileSidebar ? "block" : "hidden"
                    } md:hidden md:group-hover:flex flex-col`}
                >
                  <h4 className="text-lg">{userData && userData.name}</h4>
                  <span className=" text-base text-[#B900FF]">
                    @{userData && userData.username}
                  </span>
                </div>
              </div>
            </NavLink>
          ) : (
            <NavLink to={`/proposal/${add}`}>
              <div
                className={` flex justify-start items-center gap-4  bottom-0 mt-5 text-white`}
              >
                <span className="text-2xl mx-auto">
                  <FaFileAlt />
                </span>
                <div
                  className={`${openMobileSidebar ? "block" : "hidden"
                    } md:hidden md:group-hover:flex flex-col mx-auto`}
                >
                  <h4 className="text-lg">See Your Proposal</h4>
                  {/* <span className=" text-base text-[#B900FF]">@{userData && userData.username}</span> */}
                </div>
              </div>
            </NavLink>
          )
        ) : (
          userData?.status != "rejected" ?
            <NavLink to={"/create-profile"}>
              <div
                className={` flex justify-start items-center gap-4  bottom-0 mt-5 text-white`}
              >
                <span className="text-2xl mx-auto">
                  <IoCreateOutline />
                </span>
                <div
                  className={`${openMobileSidebar ? "block" : "hidden"
                    } md:hidden md:group-hover:flex flex-col mx-auto`}
                >
                  <h4 className="text-lg">Create Profile</h4>
                  {/* <span className=" text-base text-[#B900FF]">@{userData && userData.username}</span> */}
                </div>
              </div>
            </NavLink>
            :
            <NavLink to={"/create-profile"}>
              <div
                className={` flex justify-start items-center gap-4  bottom-0 mt-5 text-white`}
              >
                <span className="text-2xl mx-auto">
                  <IoCreateOutline />
                </span>
                <div
                  className={`${openMobileSidebar ? "block" : "hidden"
                    } md:hidden md:group-hover:flex flex-col mx-auto`}
                >
                  <h4 className="text-lg">Re Create Profile</h4>
                  {/* <span className=" text-base text-[#B900FF]">@{userData && userData.username}</span> */}
                </div>
              </div>
            </NavLink>
        )


      ) : loop ? (
        <button
          className={`mx-auto w-fit flex justify-center items-center text-center rounded-lg text-white md:px-0 px-[10px] md:py-3 py-[10px] font-semibold transition duration-300 ease-in-out headerConnectBtn hover:shadow-md hover:scale-105`}
          onClick={handleEthAccount}
        >
          <span className=" md:mx-2">
            <MdWallet className=" md:text-[22px] text-xl text-white" />
          </span>
          <div
            className={`${openMobileSidebar ? "block" : "hidden"
              } md:hidden md:group-hover:flex flex-col`}
          >
            <span className="md:block hidden mr-2">Connect Wallet</span>
          </div>
        </button>
      ) : (
        <button
          className={`mx-auto w-fit flex justify-center items-center text-center rounded-lg text-white md:px-0 px-[10px] md:py-3 py-[10px] font-semibold transition duration-300 ease-in-out headerConnectBtn hover:shadow-md hover:scale-105`}
        >
          <span className=" md:mx-2">
            <MdWallet className=" md:text-[22px] text-xl text-white" />
          </span>
          <div
            className={`${openMobileSidebar ? "block" : "hidden"
              } md:hidden md:group-hover:flex flex-col`}
          >
            <span className="md:block hidden mr-2">Loading...</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
