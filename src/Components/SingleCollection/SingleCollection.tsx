import React, { useState, useEffect } from "react";
import { tags, AllCollections } from "../../data";
import { BiSearchAlt } from "react-icons/bi";
import { errorToastify } from "../../utils/toast";

import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import CollectionCard from "../Home/Collections/CollectionCard";
import TabsCollection from "./TabsCollection";
import { CollectionsData } from "../../types/index";
import Loader from "../Loader/Loader";
import {
  getAdd,
  getCollection,
  getipfscoll,
  rTime,
} from "../../helpers/functions/page";

type sicol = {
  add: string;
  collection: string;
  cimg: string;
  pimg: string;
  category: string;
  description: string;
  createdAt: string;
};

type ipfs = {
  image: string;
  desc: string;
};

const SingleCollection = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [singleCollectiondata, setCollectiondata] = useState<any>();
  const [col, setCol] = useState<sicol[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [items, totalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id, tag, state } = useParams();

  const maxLength = 20;
  // const longText = singleCollectiondata && singleCollectiondata[0].description;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? desc : desc.slice(0, maxLength);

  const getSingleCollection = (id: any) => {
    // console.log(id);
    // console.log(AllCollections);
    const filteredCollection = AllCollections.filter(
      (item) => item.id === parseInt(id, 10)
    );
    setCollectiondata(filteredCollection);
    // console.log(filteredCollection);
  };

  useEffect(() => {
    // getSingleCollection(id);

    const fetchData = async () => {
      try {
        const data: sicol[] = await getCollection(id, 2, "a", tag);
        console.log("==>",data)
        setCol(data);
        // const val: ipfs = await getipfscoll(data[0].description)
        setLoading(true)
        setDesc(data[0].description);

        // await data.wait()
        // console.log("==>", val)
      } catch (error) {
        if (error && (error as { reason: string }).reason) {
          errorToastify((error as { reason: string }).reason);
        } else if (error && (error as { message: string }).message) {
          errorToastify((error as { message: string }).message);
        } else {
          if (error) {
            console.log(String(error))
            errorToastify(String(error));
          }
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {}, [singleCollectiondata]);

  return (
    <>
      <div className=" flex h-full min-h-screen">
        {/* LEFT SIDE */}
        <div
          className={` ${
            isSidebarOpen ? "w-[75%]" : "w-[100%]"
          } flex flex-col justify-start gap-8 transition-all duration-300 `}
        >
          <div
            className={` bg-cover bg-center w-full h-80`}
            style={{
              backgroundImage: `url(${
                col[0] && col[0].cimg
                  ? col[0].cimg
                  : "https://i.seadn.io/gcs/files/a15e1494749043f96f3c4d5bf11ee1e8.png?auto=format&dpr=1&w=828"
              })`,
              opacity: 0.8,
            }}
          >
            {/* bg shade */}
            <div
              className=" flex items-end justify-between w-full h-80 text-white px-5 md:px-8 py-8 "
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.419), rgba(65, 61, 61, 0.97))",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* content */}

              {/* first div */}
              <NavLink to={`/profile/${col[0]?.add}`}>
                <div className=" flex flex-col justify-center items-start gap-2 cursor-pointer">
                  <div className="">
                    {col.length > 0 && (
                      <img
                        //src={singleCollectiondata && singleCollectiondata[0].logo} //logo
                        src={col[0].pimg} //logo
                        alt=""
                        width={100}
                        height={100}
                        className="  rounded-xl border border-gray-400 object-contain"
                      />
                    )}
                  </div>

                  <h3 className="font-semibold md:text-lg text-sm md:leading-2 leading-6 tracking-wider text-white mt-4">
                    {/* {singleCollectiondata && singleCollectiondata[0].name} */}
                    {col.length > 0 && col[0].collection}
                  </h3>
                  {/* <span className=" opacity-80 md:text-base text-xs">
                  The Rocks
                </span> */}
                </div>
              </NavLink>

              {/* second div */}
              <div className=" flex justify-between gap-5">
                {/* <div className="flex flex-col justify-between gap-[5px]">
                  <span className="font-bold  md:text-lg text-sm">
                    20 %
                  </span>
                  <span className="md:text-base text-xs opacity-80">
                    Creator Earnings
                  </span>
                </div> */}

                <div className="flex flex-col justify-between gap-[5px]">
                  <span className=" font-bold md:text-lg text-sm">
                    {/* {singleCollectiondata && singleCollectiondata[0].totalItems} */}
                    {items}
                  </span>
                  <span className="md:text-base text-xs opacity-80">
                    Total Items
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* description */}

          <div
            className={` text-white ${
              isSidebarOpen ? "w-[60%]" : "md:w-1/2 w-[80%]"
            } font-extralight px-5 md:px-8 md:text-sm text-xs transition-all duration-300`}
          >
            <div>
              <p className=" transition-all duration-300 leading-4">
                {desc && expanded ? displayText : displayText + "...."}
              </p>
              <span
                className={`font-bold cursor-pointer hover:opacity-80`}
                onClick={toggleExpanded}
              >
                {expanded ? "See less" : "See more"}
              </span>
            </div>

            <div className="mt-3 inline-block">
              <span className="text-base">
                <span className="whitespace-pre">
                  <div className="inline-flex">
                    <span className="font-normal md:text-sm text-xs">
                      Created{" "}
                      <div className="inline-flex">
                        <span className="font-semibold md:text-sm text-xs">
                          {col.length > 0 && rTime(Number(col[0].createdAt))}
                        </span>
                      </div>
                    </span>
                  </div>
                </span>
                <span className=" font-bold">&nbsp;&nbsp;·&nbsp; </span>
                <span className="whitespace-pre">
                  <div className="inline-flex whitespace-pre">
                    <div className="inline-flex">
                      <span className=" font-normal md:text-sm text-xs">
                        Chain{" "}
                        <div className="inline-flex">
                          <span className="font-semibold md:text-sm text-xs">
                            Ethereum
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </span>
              </span>
            </div>
          </div>

          {id && col.length > 0 && tag && loading ? (
            <TabsCollection
              sidebarOpen={isSidebarOpen}
              address={id}
              collectionName={tag}
              ItemCount={totalItems}
              st={Number(state)}
              CreateAt={Number(col[0].createdAt)}
              Titem={items}
              cat={col[0].category}
            />
          ): (
            <div className=" flex justify-center items-center mx-auto">
              <Loader classname=" h-[400px] " />
              </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        {isSidebarOpen && (
          <div
            className={` hidden md:flex flex-col gap-2 w-[25%] py-[28px] px-[36px] bg-[#1f2045] text-[#cfcfcf] border border-[#2e2459] marketPlaceBoxShadow scroll-marketplace transition-all duration-300l`}
          >
            <div className="lfr-direction flex justify-between items-center  border-b  pb-3 border-gray-300">
              <div className="flex items-center gap-5">
                <h2 className=" text-lg font-medium">Filters</h2>
                <button className=" font-light active:underline underline-offset-[3px] ">
                  Clear all
                </button>
              </div>
              <div
                className=" bg-violet-800 rounded py-[2px] pr-[2px] pl-[3px] cursor-pointer"
                onClick={() => setIsSideBarOpen((prev) => !prev)}
              >
                <IoIosArrowForward className=" text-xl" />
              </div>
            </div>
            <div className="lfr-direction flex flex-col gap-4 mt-3">
              <h2 className=" text-lg font-medium">Collections</h2>
              <div className="relative flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="  rounded-lg bg-[#1e1e23] text-sm font-medium py-[15px] px-4 w-full placeholder-[#cfcfcf]"
                />
                <BiSearchAlt className=" absolute right-[14px] top-[14px] text-2xl" />
              </div>
            </div>
            <div className="lfr-direction flex flex-col gap-4 mt-3">
              <h2 className=" text-lg font-medium">Status</h2>
              <div className=" flex gap-2 w-full">
                <button className=" rounded-lg bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%]">
                  Buy Now
                </button>
                <button className=" rounded-lg bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%]">
                  Auction
                </button>
              </div>
            </div>
            <div className="lfr-direction flex flex-col gap-4 mt-3">
              <h2 className=" text-lg font-medium">Price</h2>
              <div className=" flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Min"
                  className=" rounded-lg text-center bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%] focus:outline-none placeholder-[#cfcfcf]"
                />
                <input
                  type="text"
                  placeholder="Max"
                  className=" rounded-lg text-center bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%] focus:outline-none placeholder-[#cfcfcf]"
                />
              </div>
            </div>
          </div>
        )}
        {!isSidebarOpen && (
          <div className="hidden md:flex flex-col gap-2 w-[65px] py-[28px] px-[20px] bg-[#1f2045] text-[#cfcfcf] border border-[#2e2459] marketPlaceBoxShadow transition-all duration-300">
            <div
              className=" bg-violet-800 rounded py-[2px] pr-[3px] pl-[2px] cursor-pointer"
              onClick={() => setIsSideBarOpen((prev) => !prev)}
            >
              <IoIosArrowBack className=" text-xl" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCollection;
