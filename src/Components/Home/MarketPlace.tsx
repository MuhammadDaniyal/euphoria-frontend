import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import MarketPlaceCard from "../Shared/MarketPlaceCard";
import { marketPlaceData } from "../../data";
import { _Nft } from "../../types/index";
import {
  listedAuction,
  formatEth,
  grpsell,
  shortAdd,
} from "../../helpers/functions/page";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { errorToastify } from "../../utils/toast";
import Loader from "../Loader/Loader";

type MarketCardProps = {
  id: number;
  marketplace: string;
  name: string;
  userName: string;
  currentBid: number;
  inDollars: number;
};

// struct tokenData{
//   address own;
//   address seller;
//   uint256 tokenId;
//   string Imagelink;
//   uint256 reservedPrice;
//   uint256 startAt;
//   uint256 endAt;
//   uint8 status;
//   uint256 highestBid;
//   address highestBidder;
// }

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

const MarketPlace = () => {
  const [auc, setAuc] = useState<any>();
  const [loading, setLoading] = useState(false);
  const settings1: any = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 768,
        setting: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 520,
        setting: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const settings2: any = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 768,
        setting: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 520,
        setting: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const uniqueMarketplaceNames: string[] = marketPlaceData
    .flatMap((item) => item.nft.map((nft) => nft.marketplace))
    .filter((value, index, self) => self.indexOf(value) === index);

  const [showMarketPlaceData, setShowMarketPlaceData] = useState<
    MarketCardProps[]
  >([]);

  useEffect(() => {
    const data = marketPlaceData.flatMap((item) => item.nft);
    setShowMarketPlaceData(data);
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await listedAuction();
        if (data) {
          // console.log("jkj");
          setLoading(false);
          setAuc(data);
        }

        // console.log("Data===>", data)
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

  return (
    <section
      id="drop"
      className="flex flex-col justify-center items-center  mx-auto pt-16"
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <h4 className="uppercase font-semibold text-lg md:text-xl text-[#B900FF]">
          NFT MARKETPLACE
        </h4>
        <h3 className=" text-white text-center font-semibold text-3xl md:text-5xl tracking-wider">
          Super Hot Drops
        </h3>
      </div>
      <div className=" w-[95%] md:w-[80%]">
        {/* CATEGORY BUTTONS */}
        <div className=" w-[80%] flex items-center mx-auto my-10">
          <IoIosArrowBack
            className=" w-[7%] text-2xl text-white cursor-pointer"
            onClick={() => scroll(-132)}
          />
          <div
            className=" w-full pl-1 flex gap-2 overflow-x-auto whitespace-nowrap scrollbarHide"
            ref={scrollRef}
          >
            {uniqueMarketplaceNames.map((item) => (
              <button
                className={`bg-[#19191b] my-auto flex justify-center text-[15px] capitalize text-white tracking-wider font-normal py-[10px] px-4 min-w-32 rounded-md cursor-pointer`}
              >
                {item}
              </button>
            ))}
          </div>
          <IoIosArrowForward
            className=" w-[6%] ml-2 md:ml-0 text-2xl text-white cursor-pointer"
            onClick={() => scroll(132)}
          />
        </div>
        {/* CARDS */}
        <div className=" md:block hidden ">
          {loading ? (
            <Loader classname=" h-[400px]" />
          ) : (
            <Slider {...settings1} className=" w-full">
              {auc?.map((item: _Nft, index: number) => (
                <div className="slide text-white">
                  <MarketPlaceCard
                    key={index}
                    id={item.tokenId}
                    // marketplace={item.marketplace}
                    marketplace="hello"
                    name={item.name}
                    userName={item.seller}
                    currentBid={item.highestBid}
                    inDollars={Number(item.highestBid)}
                    endAt={Number(item.endAt)}
                    startAt={Number(item.startAt)}
                    image={item.Imagelink}
                    NftSt={item.status}
                    type={item.typee}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className=" md:hidden block ">
          {loading ? (
            <Loader classname=" h-[400px]" />
          ) : (
            <Slider {...settings1} className=" w-full">
              {auc?.map((item: _Nft, index: number) => (
                <div className="slide text-white">
                  <MarketPlaceCard
                    key={index}
                    id={item.tokenId}
                    // marketplace={item.marketplace}
                    marketplace="hello"
                    name={item.name}
                    userName={item.seller}
                    currentBid={item.highestBid}
                    inDollars={Number(item.highestBid)}
                    endAt={Number(item.endAt)}
                    startAt={Number(item.startAt)}
                    image={item.Imagelink}
                    NftSt={item.status}
                    type={item.typee}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketPlace;
