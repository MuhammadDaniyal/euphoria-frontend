import MarketPlaceCard from "../Shared/MarketPlaceCard";
import Collection from "./Collection";
import { BiSearchAlt } from "react-icons/bi";
import { cards } from "../../data";
import MarketContrubutor from "./MarketContrubutor";
import { useState, useEffect } from "react";
import { marketPlaceData, tags, AllCollections } from "../../data";
import CollectionCard1 from "../Home/Collections/CollectionCard1";
import { errorToastify } from "../../utils/toast";
import Loader from "../Loader/Loader";

import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import {
  listedAuction,
  grpsell,
  formatEth,
  shortAdd,
  allAuction,
} from "../../helpers/functions/page";

const MarketPlace = ({ setBgImg }: any) => {
  type MarketCardProps1 = {
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
  };
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
    price: string;
    category: string;
    items: Item[];
  }

  interface CollectionsCardProps {
    id: string;
    tag: string;
    group: CollectionGroup;
    createdBy: string;
    name: string;
    floorPrice: number;
  }

  const [filterData, setFilterData] = useState<CollectionGroup[]>([]);
  const [auc, setAuc] = useState<CollectionGroup[]>([]);

  const [tag, setTag] = useState<string>("");
  const [categoriesNames, setCategoriesNames] = useState<any>();
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");

  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();

  const [loading, setLoading] = useState(false);

  const [openDropDown, setOpenDropDown] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [collectionNames, setCollectionNames] = useState<any>([]);
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [value, setValue] = useState("");

  // DropDown
  const handleDropDownClick = (index: number) => {
    let newOpenDropDown: boolean[] = [];
    newOpenDropDown = openDropDown.map((item, i) => {
      return i === index ? !openDropDown[i] : false;
    });
    setOpenDropDown(newOpenDropDown);
  };

  const handleBgImg = (item: any) => {
    setBgImg(item.class);
  };

  const filterCollectionsData = (
    collectionNameValue: string,
    categoryValue: string,
    sortOrder: string,
    sidebarSearch?: null | boolean,
    minP?:string ,
    maxP?:string
  ) => {
    const min = parseFloat(minP || '0');
    const max = parseFloat(maxP || Number.MAX_VALUE.toString());
    const filteredItems = auc
      .filter((item) => {
        let collectionNameMatch = true;
        let categoryMatch = true;
        let searchNameMatch = true;
        let priceMatch = true;

        if (!sidebarSearch && collectionNameValue !== "") {
          collectionNameMatch = item.collection === collectionNameValue;
        }

        if (!sidebarSearch && categoryValue !== "") {
          categoryMatch =
            item.category?.toLowerCase() === categoryValue?.toLowerCase();
        }
        if (sidebarSearch && collectionNameValue !== "") {
          searchNameMatch = item.collection
            ?.toLowerCase()
            .startsWith(collectionNameValue.toLowerCase());
        }

        const price = parseFloat(item.price);
        if (price < min || price > max) {
          priceMatch = false;
        }
        return collectionNameMatch && categoryMatch && searchNameMatch && priceMatch;
      })
      .sort((a: any, b: any) => {
        if (sortOrder === "" || sortOrder === "Price: low to high") {
          return a.price - b.price;
        } else if (sortOrder === "Price: high to low") {
          return b.price - a.price;
        } else {
          return 0; // No sorting if sortOrder is not recognized
        }
      });
    setFilterData(filteredItems);
  };

  const handleNameChange = (value: string) => {
    setCollectionName(value);
    filterCollectionsData(value, category, sort, false);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    filterCollectionsData(collectionName, value, sort, false);
  };

  const handleSortingChange = (value: string) => {
    setSort(value);
    filterCollectionsData(collectionName, category, value, false);
  };

  const handleChange = (value: any) => {
    setValue(value);
    filterCollectionsData(value, category, sort, true);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterCollectionsData(collectionName, category, sort, false,e.target.value, Number.MAX_VALUE.toString());
  };
  
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterCollectionsData(collectionName, category, sort, false, '0', e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const data = await listedAuction();
        const data = await allAuction();
        const val = grpsell(data);
        console.log(val);
        setAuc(val);
        setFilterData(val);
        setCollectionNames(
          val.map((item) => {
            return item.collection;
          })
        );
        const uniqueCategories = Array.from(
          new Set(val.map((item) => item.category))
        );
        setCategoriesNames(uniqueCategories);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".closeDropdown")
      ) {
        setOpenDropDown([false, false, false]);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" flex h-screen">
        {/* LEFT SIDE */}
        <div
          className={` ${
            isSidebarOpen ? "w-[75%]" : "w-[100%]"
          } flex flex-col justify-start gap-8 pt-12 ${
            isSidebarOpen ? "px-12" : " px-8"
          }  `}
        >
          {/* DROPDOWNS */}
          <div
            className={` flex text-[#cfcfcf] px-5 ${
              isSidebarOpen ? "pl-[10px] gap-8" : "gap-6 pl-2"
            }`}
          >
            <div className="relative flex flex-col gap-2 w-64 ">
              <button
                className=" flex justify-between text-left rounded-lg bg-[#1e1e23] text-sm font-medium py-[15px] px-4 w-full closeDropdown"
                onClick={() => handleDropDownClick(0)}
              >
                <span className=" capitalize">
                  {collectionName ? collectionName : "Collections"}
                </span>
                {openDropDown[0] ? (
                  <IoIosArrowUp className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                ) : (
                  <IoIosArrowDown className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                )}
              </button>
              <div
                className={`${
                  openDropDown[0] ? "block" : "hidden"
                }  top-14 rounded-lg z-50 absolute w-64 max-h-[200px] h-fit overflow-y-scroll py-[6px] bg-[#1e1e23] scroll-marketplace-dropdown `}
              >
                {collectionNames.map((item: any) => (
                  <p
                    className=" py-2 px-3 capitalize font-medium text-[13px] hover:bg-[#141414] cursor-pointer "
                    onClick={() => {
                      handleNameChange(item);
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative flex flex-col gap-2 w-64 ">
              <button
                className=" flex justify-between text-left rounded-lg bg-[#1e1e23] text-sm font-medium py-[15px] px-4 w-full closeDropdown"
                onClick={() => handleDropDownClick(1)}
              >
                <span className=" capitalize">
                  {category ? category : "Categories"}
                </span>
                {openDropDown[1] ? (
                  <IoIosArrowUp className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                ) : (
                  <IoIosArrowDown className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                )}
              </button>
              <div
                className={`${
                  openDropDown[1] ? "block" : "hidden"
                }  top-14 rounded-lg z-50 absolute w-64 max-h-[150px] h-fit overflow-y-scroll  py-[6px] bg-[#1e1e23] scroll-marketplace-dropdown `}
              >
                {categoriesNames &&
                  categoriesNames.map((item: any) => (
                    <p
                      className=" py-2 px-3 capitalize font-medium text-[13px] hover:bg-[#141414] cursor-pointer "
                      onClick={() => {
                        handleCategoryChange(item);
                      }}
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
            <div className="relative flex flex-col gap-2 w-64">
              <button
                className=" flex justify-between text-left rounded-lg bg-[#1e1e23] text-sm font-medium py-[15px] px-4 w-full closeDropdown"
                onClick={() => handleDropDownClick(2)}
              >
                <span>{sort ? sort : "Sort by"}</span>
                {openDropDown[2] ? (
                  <IoIosArrowUp className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                ) : (
                  <IoIosArrowDown className=" absolute right-[14px] top-[15px] text-lg cursor-pointer" />
                )}
              </button>
              <div
                className={`${
                  openDropDown[2] ? "block" : "hidden"
                }  top-14 rounded-lg z-50 absolute w-64 py-[6px] bg-[#1e1e23] `}
              >
                <p
                  className=" py-2 px-3 capitalize font-medium text-[13px] hover:bg-[#141414] cursor-pointer"
                  onClick={() => {
                    handleSortingChange("Price: low to high");
                  }}
                >
                  Price: low to high
                </p>
                <p
                  className=" py-2 px-3 capitalize font-medium text-[13px] hover:bg-[#141414] cursor-pointer"
                  onClick={() => {
                    handleSortingChange("Price: high to low");
                  }}
                >
                  Price: high to low
                </p>
              </div>
            </div>
          </div>

          {/* COLLECTIONS CARDS */}
          <div
            className={`  flex flex-wrap ${
              loading ? "justify-center" : "justify-start"
            } ${
              isSidebarOpen ? "gap-8" : " gap-6"
            } pb-12 pt-3 px-2 overflow-y-auto whitespace-nowrap scrollbarHide transition-all duration-300`}
          >
            {loading ? (
              <Loader classname="h-[400px]" />
            ) : filterData && filterData.length > 0 ? (
              filterData.map((item: CollectionGroup, i: number) => (
                <CollectionCard1
                  idd={item.seller}
                  tag={item.collection}
                  group={item}
                  createdBy={item.seller}
                  name={item.collection}
                  floorPrice={item.price}
                  Head={"NA"}
                  cat={item.category}
                />
              ))
            ) : (
              <div className="flex justify-center items-center mx-auto text-white">
                <h1 className=" text-center  text-3xl font-semibold">
                  No Records Found
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        {isSidebarOpen && (
          <div
            className={` flex flex-col gap-2 w-[25%] py-[28px] px-[36px] bg-[#1f2045] text-[#cfcfcf] border border-[#2e2459] marketPlaceBoxShadow scroll-marketplace transition-all duration-300`}
          >
            <div className="lfr-direction flex justify-between items-center  border-b-2 pb-3 border-[#1e1e23]">
              <div className="flex items-center gap-5">
                <h2 className=" text-lg font-medium">Filters</h2>
                <button
                  className=" font-light active:underline underline-offset-[3px] hover:text-violet-500 "
                  onClick={() => {
                    handleCategoryChange("");
                    handleNameChange("");
                    handleSortingChange("");
                    setBgImg("marketPlaceBgImg");
                    setFilterData(auc);
                    setMaxPrice('')
                    setMinPrice('')
                  }}
                >
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
                  value={value}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
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
                  value={minPrice}
                  onChange={handleMinChange}
                  className=" rounded-lg text-center bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%] focus:outline-none placeholder-[#cfcfcf]"
                />
                <input
                  type="text"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className=" rounded-lg text-center bg-[#1e1e23] text-sm font-medium py-2 px-4 w-[50%] focus:outline-none placeholder-[#cfcfcf]"
                />
              </div>
            </div>
            <div className="lfr-direction flex flex-col gap-4 mt-3">
              <h2 className=" text-lg font-medium">MarktePlace Tags</h2>
              <div className=" flex flex-wrap gap-2 w-full">
                {tags.map((item, i) => {
                  return (
                    <button
                      key={i}
                      className={` rounded-lg ${
                        category === item.tag ? `bg-[#7000ff]` : `bg-[#1e1e23]`
                      } text-sm py-2 px-4 `}
                      onClick={() => {
                        handleCategoryChange(item.tag);
                        handleBgImg(item);
                      }}
                    >
                      {item.tag}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* TOP Ctegory */}
            <div className="lfr-direction flex flex-col gap-4 mt-3">
              <h2 className=" text-lg font-medium">Top Contributers</h2>
              <div className=" h-[180px] flex flex-col gap-3 overflow-y-auto  scrollbarHide">
                {cards.map((card, index) => (
                  <MarketContrubutor
                    key={index}
                    name={card.name}
                    ethAmount={card.ethAmount}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {!isSidebarOpen && (
          <div className=" flex flex-col gap-2 w-[65px] py-[28px] px-[20px] bg-[#1f2045] text-[#cfcfcf] border border-[#2e2459] marketPlaceBoxShadow transition-all duration-300">
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

export default MarketPlace;
