import React from "react";
import { useState, useEffect } from "react";
import MarketPlaceCard from "../Shared/MarketPlaceCard";
import HistoryTab from "../SingleNFT/HistoryTab";
import { Listings, History, _Nft } from "../../types";
import {
  formatEth,
  userListedAuction,
  filterDataBySellerAndCollection,
  getAdd,
  userAllAuc,
  filterDataByHonAndCollection,
  shortAdd,
} from "../../helpers/functions/page";
import { Link } from "react-router-dom";
import { errorToastify } from "../../utils/toast";
import DetailTabPropertyCardCol from "./DetailTabPropertyCardCol";

interface TabButtonType {
  id: number;
  title: string;
}

const tabButtons = [
  {
    id: 1,
    title: "Listing",
  },
  {
    id: 2,
    title: "Details",
  },
  {
    id: 3,
    title: "Upload Nft",
  },
];

const TabsCollection = ({
  sidebarOpen,
  address,
  collectionName,
  ItemCount,
  st,
  CreateAt,
  Titem,
  cat,
}: {
  CreateAt: number;
  Titem: number;
  sidebarOpen: boolean;
  address: string | null;
  collectionName: string | null;
  cat: string | null;
  ItemCount: any;
  st: number;
}) => {
  const [currentTab, setCurrentTab] = useState<TabButtonType>(tabButtons[0]);
  const [nfts, setNfts] = useState<_Nft[]>([]);
  const [add, setAdd] = useState<string>("");

  const [collectionHistory, setCollectionHistory] = useState<History[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        let filterData;
        // if (Number(st) != 1) {
        if (false) {
          // console.log("if running")
          data = await userListedAuction(address, 2, collectionName, "a");
          filterData = filterDataBySellerAndCollection(
            data,
            address,
            collectionName
          );
        } else {
          // console.log("else running")
          const da: _Nft[] = await userAllAuc(address);
          // console.log({ add: address, coll: collectionName, Data: da })
          data = da.filter((nft) => nft.collection === collectionName);
          filterData = filterDataByHonAndCollection(
            data,
            address,
            collectionName
          );
          // filterData = filterDataBySellerAndCollection(data, address, collectionName);
        }
        const _add = await getAdd();
        setAdd(_add);
        ItemCount(filterData.length);
        setNfts(filterData);
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
  }, [address, collectionName]);

  // function filterDataBySellerAndCollection(data: any, seller: any, collection: any) {
  //   return data.filter((item: any) => item.seller === seller && item.collection === collection);
  // }

  return (
    <>
      <div>
        <div className=" flex gap-4  p-2 md:w-1/3 w-full text-gray-400 px-5 md:px-8">
          {tabButtons.map((item) =>
            item.title != "Upload Nft" ? (
              <button
                key={item.id}
                className={`md:h-9 h-8 w-20 rounded-lg text-xs md:text-sm
                transition-all duration-300 transform-gpu  ${
                  currentTab.id === item.id
                    ? "bg-[#212e48] text-stone-200"
                    : "hover:border-white border border-[#9c9c9cb4]"
                }`}
                onClick={() => setCurrentTab(tabButtons[item.id - 1])}
              >
                {item.title == "Upload Nft" ? (
                  <span aria-disabled={true}>
                    {
                      <Link to={`/upload-nft/${collectionName}/${cat}`}>
                        {item.title}
                      </Link>
                    }
                  </span>
                ) : (
                  item.title
                )}
              </button>
            ) : (
              add &&
              address &&
              add.toLowerCase() === address.toLowerCase() && (
                <Link key={item.id} to={`/upload-nft/${collectionName}/${cat}`}>
                  <button
                    className={`md:h-9 h-8 w-20 rounded-lg text-xs md:text-sm
                transition-all duration-300 transform-gpu  ${
                  currentTab.id === item.id
                    ? "bg-[#212e48] text-stone-200"
                    : "hover:border-white border border-[#9c9c9cb4]"
                }`}
                    onClick={() => setCurrentTab(tabButtons[item.id - 1])}
                  >
                    {item.title == "Upload Nft" ? (
                      <span>{item.title}</span>
                    ) : (
                      item.title
                    )}
                  </button>
                </Link>
              )
            )
          )}
        </div>

        <div className="px-5 md:px-8 mt-3 mb-3">
          <hr className="border-t border-gray-300" />
        </div>

        {currentTab.title === "Listing" && (
          <div
            className={` flex justify-start items-start flex-wrap ${
              sidebarOpen ? `gap-8` : `gap-8`
            } pb-12 pt-3 overflow-y-auto whitespace-nowrap scrollbarHide transition-all duration-300 ${
              sidebarOpen ? `px-8` : `px-9`
            }`}
          >
            {/* hammad */}
            {nfts &&
              nfts.map((item: _Nft, index) => {
                return (
                  <MarketPlaceCard
                    key={index}
                    id={item.tokenId}
                    marketplace={item.collection}
                    name={item.name}
                    NftSt={item.status}
                    userName={(item.seller)}
                    currentBid={Number(formatEth(item.highestBid))}
                    inDollars={Number(formatEth(item.highestBid))}
                    endAt={Number(item.endAt)}
                    startAt={Number(item.startAt)}
                    image={item.Imagelink}
                    type={item.typee}
                  />
                );
              })}
          </div>
        )}

        {currentTab.title === "Details" && (
          <div className={`w-full md:px-8 px-5 mt-3 mb-3`}>
            <DetailTabPropertyCardCol cAt={CreateAt} TNft={Titem} />
          </div>
        )}

        {currentTab.title === "Upload Nft" && (
          <Link to={`/upload-nft/${collectionName}/${cat}`}>
            <div className={`w-full md:px-8 px-5`}>
              <DetailTabPropertyCardCol cAt={CreateAt} TNft={Titem} />
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default TabsCollection;
