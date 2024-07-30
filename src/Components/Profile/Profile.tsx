import React, { useState, useEffect, useRef } from "react";
import StyledButton from "../Shared/StyledButton";
import { FaCopy, FaPencilAlt } from "react-icons/fa";
import { MarketPlaceItem } from "../../types/index";
import { marketPlaceData } from "../../data";
import MarketPlaceCard from "../Shared/MarketPlaceCard";
import { _Nft } from "../../types/index";
import { getJson } from "../../helpers/apiInstance";
import { errorToastify, succesToastify } from "../../utils/toast";

// IMAGES

import collection1 from "../../assets/images/collection/c1.jpeg";
import collection2 from "../../assets/images/collection/c2.jpeg";
import collection3 from "../../assets/images/collection/c3.jpeg";
import collection4 from "../../assets/images/collection/c4.jpeg";
import collection5 from "../../assets/images/collection/c5.jpg";
import collection6 from "../../assets/images/collection/c6.jpg";
import collection7 from "../../assets/images/collection/c7.jpg";
import collection8 from "../../assets/images/collection/c8.jpg";
import collection9 from "../../assets/images/collection/c9.jpg";
import collection10 from "../../assets/images/collection/c10.png";
import collection11 from "../../assets/images/collection/c11.jpg";
import collection12 from "../../assets/images/collection/c12.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserSvg from "../../assets/images/user.svg";
import UserLogo from "../../assets/images/user.png";
import UserLogo1 from "../../assets/images/user2.png";
import CollectionCard from "../Home/Collections/CollectionCard";
import {
  getAdd,
  getCollection,
  grpsell,
  grpsell_c,
  mergeArrays,
  ownAuctionList,
  shortAdd,
  succ,
  tohrd,
  userAllAuc,
  userListedAuc,
} from "../../helpers/functions/page";
import CollectionCard1 from "../Home/Collections/CollectionCard1";
import EditProfileModal from "../Shared/EditProfile/EditProfileModal";
import Loader from "../Loader/Loader";

type sicol = {
  add: string;
  collection: string;
  cimg: string;
  pimg: string;
  category: string;
  description: string;
};

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
  price: any;
  category: string;
  items: Item[];
}

interface TabButtonType {
  id: number;
  title: string;
}

const tabButtons = [
  {
    id: 1,
    title: "Collection",
  },
  {
    id: 2,
    title: "On Sale",
  },
  {
    id: 3,
    title: "Owned",
  },
  // {
  //   id: 4,
  //   title: "Favourites",
  // },
];

const Profile = () => {
  const [currentTab, setCurrentTab] = useState<TabButtonType>(tabButtons[0]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [onSale, setOnSale] = useState<any>();
  const [filterData, setFilterData] =
    useState<MarketPlaceItem[]>(marketPlaceData);
  const { userid } = useParams();
  const userData = useSelector((data: any) => data.createpage.users);
  const [auc, setAuc] = useState<_Nft[] | []>([]);
  const [userList, setUserList] = useState<_Nft[] | []>([]);
  const [pData, setPdata] = useState<P_type>();
  const [allauc, setAllAuc] = useState<CollectionGroup[]>([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      succesToastify("Address copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy!");
    }
  };

  const data = window.localStorage.getItem("walletId");
  let walletAddress: any;
  if (data) {
    const walletData = JSON.parse(data);
    walletAddress = walletData.walletAddress;
  }

  useEffect(() => {
    const filterUser = userData.filter((item: any) => item.id === "1");
    // console.log(filterUser);
    setCurrentUser(filterUser[0]);
    const sale = filterUser[0].collections.filter(
      (item: any) => item.onSale === true
    );
    setOnSale(sale);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getJson(
          `http://localhost:8000/api/profile/${userid?.toLowerCase()}`
        );
        setPdata(response);
        const list: any = await ownAuctionList(userid, 4, "a", "a"); // return nfts which own
        const userList = await userListedAuc(userid, 1, "a", "a");
        // const userAlList = await userAllAuc(userid);// this one
        // const data: sicol[] = await getCollection(userid, 1, "a", "1") // this one
        // // userAlList && data && console.log("data==>",mergeArrays(grpsell(userAlList),data))

        // // const val = grpsell(userAlList);
        // const val = mergeArrays(grpsell(userAlList), data, userid);
        // setAllAuc(val);
        setAuc(list);
        setUserList(userList);
        setLoading(false);
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
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAlList = await userAllAuc(userid); // this one
        const data: sicol[] = await getCollection(userid, 1, "a", "1"); // this one

        if (userAlList && data) {
          const val = mergeArrays(grpsell_c(userAlList), data, userid);
          console.log(val[0]);
          val && setAllAuc(val);
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
    fetchData();
  }, [userid, userList, auc]);

  return (
    <>
      <section className=" w-[90%] h-full flex flex-col justify-center md:gap-8 gap-4 text-white mx-auto py-10">
        {/* HEADER */}
        <div className="w-full md:h-[350px] h-64 rounded-xl ">
          <div
            className={`h-[75%] rounded-tl-xl rounded-tr-xl bg-cover bg-no-repeat bg-center`}
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.3), 
                rgba(0, 0, 0, 0.3)
              ), url(${
                pData && pData.coverPic
                  ? pData.coverPic
                  : "https://html.ditsolution.net/nftpro/assets/images/resource/author-bg.png"
              })`,
              backgroundBlendMode: "multiply", // Optional blend mode for better dull effect
              // opacity: 0.8,
            }}
          >
            <div className=" flex justify-start md:items-start items-center md:gap-5 gap-4 md:px-10 px-5 md:pt-24 pt-[110px]">
              <img
                className=" relative rounded-[50%] md:w-52 md:h-52 w-28 h-28 z-20 object-cover object-center"
                src={pData && pData.profilePic ? pData.profilePic : UserLogo1}
                alt=""
                style={{ border: "4px solid white" }}
              />
              <div className=" w-full flex md:flex-col md:justify-start justify-between md:pt-8">
                <div className=" flex flex-col">
                  <h3 className=" md:text-xl text-sm font-bold">
                    {pData && pData.name}
                  </h3>
                  <p className="md:text-base text-xs text-[#b725ff] font-medium">
                    @{pData && pData.username}
                  </p>
                </div>

                <div className=" flex gap-2 md:mt-4 mt-2">
                  {/* <button className=" md:flex hidden profilePageBtn">
                    {" "}
                    Follow
                  </button> */}
                  <button className=" group md:flex hidden justify-center items-center gap-2 rounded-[5px] pl-5 bg-[#444882]">
                    <span className=" py-2" id="address">
                      {pData && pData.walletAddress}
                    </span>
                    <div
                      className="profilePageBtn h-full flex items-center justify-center"
                      style={{
                        padding: "0px 8px",
                        display: "flex",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      <FaCopy
                        className=""
                        onClick={() => {
                          copyToClipboard(
                            document.getElementById("address")?.innerText
                          );
                        }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex md:justify-end justify-end md:px-16 px-5 items-center md:gap-4 gap-2 bg-[#2A273E] h-[20%] text-white rounded-bl-xl rounded-br-xl z-[9999999]">
            <button className=" cursor-pointer md:text-base text-xs ">
              Create NFT
            </button>
            <button
              className=" cursor-pointer md:text-base text-xs flex justify-center items-center gap-3 bg-[#518EFF] py-1 text-center rounded-md md:px-4 px-2"
              onClick={() => {
                setOpen(true);
              }}
            >
              <span>About</span>
              {walletAddress && walletAddress == userid && (
                <span className="md:text-base text-[10px]">
                  <FaPencilAlt />
                </span>
              )}
            </button>
          </div>
        </div>
        {/* BODY */}
        <div className="w-full flex md:gap-5 gap-4">
          <div className=" md:w-[75%] w-full flex flex-col gap-5">
            <div className=" flex gap-2 rounded-[7px] border border-[#ffffff14] bg-[#2A273E] p-2 ">
              {tabButtons.map((item) => (
                <button
                  key={item.id}
                  className={` flex-1 h-10 text-sm font-light rounded-[6px] 
                transition-all duration-300 transform-gpu  ${
                  currentTab.id === item.id
                    ? "border-white border border-dashed"
                    : " hover:border-white border border-dashed border-[#ffffff40]"
                }`}
                  onClick={() => setCurrentTab(tabButtons[item.id - 1])}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {loading ? (
              <div className=" flex justify-center items-center mx-auto">
                <Loader classname=" h-[300px] " />
              </div>
            ) : (
              <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 h-screen">
                {/* {currentTab.id === 1 &&
                currentUser &&
                currentUser.collections.map((item: any, i: number) => {
                  return <CollectionCard key={i} {...item} />;
                })} */}

                {
                  currentTab.id === 1 &&
                    allauc &&
                    allauc.length > 0 &&
                    allauc.map((item: CollectionGroup, i: number) => (
                      <CollectionCard1
                        idd={item.seller}
                        tag={item.collection}
                        group={item}
                        createdBy={item.items[0].HON}
                        name={item.collection}
                        floorPrice={item.price}
                        Head={item.items[0].HON}
                        cat={item.category}
                      />
                    ))

                  // filterData.map((item:any, i:number) => <CollectionCard  {...item} />)
                }

                {currentTab.id === 2 &&
                  userList.length > 0 &&
                  userList.map((item: _Nft, index: number) => {
                    // return <CollectionCard key={i} {...item} />;
                    return (
                      <MarketPlaceCard
                        key={index}
                        id={Number(item.tokenId)}
                        marketplace={item.collection}
                        name={item.name}
                        userName={item.seller}
                        currentBid={item.highestBid}
                        inDollars={150}
                        image={item.Imagelink}
                        endAt={Number(item.endAt)}
                        startAt={Number(item.startAt)}
                        NftSt={item.status}
                        type={item.typee}
                      />
                    );
                  })}
                {currentTab.id === 3 &&
                  // marketPlaceData[0].nft?.map((item: any, index: number) => (
                  auc?.map((item: _Nft, index: number) => (
                    <MarketPlaceCard
                      key={index}
                      id={item.tokenId}
                      marketplace={"Nft"}
                      name={item.name}
                      userName={shortAdd(item.own)}
                      currentBid={item.highestBid}
                      inDollars={150}
                      image={item.Imagelink}
                      endAt={Number(item.endAt)}
                      startAt={Number(item.startAt)}
                      NftSt={item.status}
                      type={item.typee}
                    />
                  ))}
              </div>
            )}
          </div>
          <div className=" w-[25%] md:flex hidden flex-col gap-5">
            <div className=" flex flex-col gap-4 bg-[#2A273E] rounded-md py-6 px-8">
              <h4>Search NFT</h4>
              <hr />
              <input
                type="text"
                placeholder="Search Here"
                className=" bg-[#19162F] rounded-md text-white py-2 px-3"
              />
            </div>
            <div className=" flex flex-col gap-4 bg-[#2A273E] rounded-md py-6 px-8">
              <h4>Features</h4>
              <hr />
              <div className=" grid md:grid-cols-3 grid-cols-2 gap-3 pt-1">
                <img
                  src={collection1}
                  alt="collection1"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection2}
                  alt="collection2"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection3}
                  alt="collection3"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection4}
                  alt="collection4"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection5}
                  alt="collection5"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection6}
                  alt="collection6"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection7}
                  alt="collection7"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection8}
                  alt="collection8"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection9}
                  alt="collection9"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection10}
                  alt="collection10"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection11}
                  alt="collection11"
                  className=" h-14 w-full object-cover rounded-md"
                />
                <img
                  src={collection12}
                  alt="collection12"
                  className=" h-14 w-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal
        setOpen={setOpen}
        open={open}
        cancelButtonRef={cancelButtonRef}
        profileInfo={pData}
        setPdata={setPdata}
      />
    </>
  );
};

export default Profile;
