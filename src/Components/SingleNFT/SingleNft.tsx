import { useState, useRef, useEffect } from "react";
// import { FiHeart } from "react-icons/fi";
// import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import DetailTab from "./DetailTab";
import BidTab from "./BidTab";
import { useParams } from "react-router-dom";
import { marketPlaceData } from "../../data";
import { NFT, _Nft } from "../../types/index";
import HistoryTab from "./HistoryTab";
import PlaceBidModal from "../PlaceBid/PlaceBidModal";
import {
  // listedAuction,
  getNftBids,
  formatEth,
  shortAdd,
  idAuc,
  getNftHis,
  getAdd,
  endAuc,
  scientificToDecimal,
  roundNum,
  reAuc,
} from "../../helpers/functions/page";
import { errorToastify } from "../../utils/toast";
import { getUSD } from "../../helpers/apiInstance";

interface TabButtonType {
  id: number;
  title: string;
}

const tabButtons: TabButtonType[] = [
  { id: 1, title: "Bids" },
  { id: 2, title: "Details" },
  { id: 3, title: "History" },
];

// interface MarketCardProps1 {
//   own: string;
//   seller: string;
//   tokenId: number;
//   Imagelink: string;
//   reservedPrice: number;
//   startAt: number;
//   endAt: number;
//   status: boolean;
//   highestBid: number;
//   highestBidder: string;
// }

interface NftBids {
  bidtime: number;
  useraddress: string;
  bidAmount: number;
}

interface NftHis {
  wintime: number;
  winaddress: string;
  winAmount: number;
  status: string;
}

const SingleNft = () => {
  const [currentTab, setCurrentTab] = useState<TabButtonType>(tabButtons[1]);
  const [singleNFTdata, setSingleNFTdata] = useState<NFT[]>([]);
  const { id, category } = useParams<{ id: string; category: string }>();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [auc, setAuc] = useState<_Nft | null>(null);
  const [add, setAdd] = useState<NftBids[]>([]);
  const [his, setHis] = useState<NftHis[]>([]);
  const [data, setData] = useState<boolean>(false);
  const [usd, setUSD] = useState<number>(0);
  const [walladdres, setAddress] = useState<string>("");

  type cRate = {
    USD: number;
    BTC: number;
  };

  useEffect(() => {
    const fetchData = async (id: number) => {
      // console.log("conversion==>",conv?.USD)
      try {
        // console.log(1)
        const addd = await getAdd();
        setAddress(addd);

        const conv: cRate = await getUSD();
        setUSD(conv?.USD);
        const data: _Nft[] = await idAuc(id);

        const Hist: NftHis[] = await getNftHis(id);
        setAuc(data[0]);
        setHis(Hist);

        // }
      } catch (error) {
        if (error && (error as { reason: string }).reason) {
          errorToastify((error as { reason: string }).reason);
        } else if (error && (error as { message: string }).message) {
          errorToastify((error as { message: string }).message);
        } else {
          if (error) {
            console.log(String(error));
            errorToastify(String(error));
          }
        }
      }
    };
    fetchData(Number(id));
  }, [id, data]);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // console.log("auction==>",auc)
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (auc) {
        const startAt = Number(auc.startAt);
        const endAt = Number(auc.endAt);
        const currentTime = Date.now() / 1000;

        if (currentTime < startAt) {
          console.log(11);

          setTimeLeft(0);
          clearInterval(interval); // Stop the timer
        } else if (currentTime >= startAt && currentTime <= endAt) {
          // console.log(2);
          setTimeLeft(endAt - currentTime);
          // clearInterval(interval);
        } else {
          console.log(3);
          setTimeLeft(0);
          clearInterval(interval); // Stop the timer
        }
      }
    };

    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [auc]);

  const formatTime = (milliseconds: number | null) => {
    if (milliseconds === null) {
      return "00:00:00";
    }

    const totalSeconds = Math.floor(milliseconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bi = await getNftBids(id);
        // console.log("Bi===>", bi);
        setAdd(bi);
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
  }, [data]);

  useEffect(() => {
    const getSingleNFT = (id: string) => {
      const filteredNFTs = marketPlaceData
        .flatMap((category) => category.nft)
        .filter((nft) => nft.marketplace === category);

      const finalFilteredNFTs = filteredNFTs.filter(
        (nft: any) => nft.id === parseInt(id, 10)
      );
      setSingleNFTdata(finalFilteredNFTs);
    };
    getSingleNFT(id!);
  }, [id, category]);


  const handleReAuc = async (_tokenId:number,_reservePrice:number) => {
    try {
      console.log("id==>", _tokenId);
      const trans = await reAuc(_tokenId,_reservePrice);
      await trans.wait();
      setData(!data)
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify("check Console for Err");
          console.log(error);
        }
      }
    }
  };




  const handleEndAuc = async (id: number) => {
    try {
      console.log("id==>", id);
      const trans = await endAuc(id);
      await trans.wait();
      setData(!data)
    } catch (error) {
      if (error && (error as { reason: string }).reason) {
        errorToastify((error as { reason: string }).reason);
      } else if (error && (error as { message: string }).message) {
        errorToastify((error as { message: string }).message);
      } else {
        if (error) {
          errorToastify("check Console for Err");
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <PlaceBidModal
        setOpen={setOpen}
        open={open}
        cancelButtonRef={cancelButtonRef}
        _id={Number(id)}
        settingstate={setData}
        tdata={data}
      />
      <section className="w-[90%] md:w-[80%] h-full min-h-screen flex flex-col md:flex-row justify-center md:gap-12 gap-8 text-white mx-auto py-10">
        <div className="w-full md:w-[45%] flex flex-col">
          <div className="w-full border-[16px] border-slate-900 bg-slate-900 rounded-lg h-fit transition-all duration-300 ease-in-out transform-gpu hover:scale-105 hover:border-[12px] hover:border-[#00a3ff]">
            {auc && (
              auc.typee != "video/mp4" ?
                <img
                  src={auc.Imagelink}
                  alt=""
                  className="w-full h-[300px] md:h-[380px] rounded-lg"
                />
                :
                <video width="600" height={200} controls>
                  <source src={auc.Imagelink} type="video/mp4" />
                  {/* <source src={d} type="image/jpeg" /> */}
                  Your browser does not support the video tag.
                </video>
            )}
          </div>
          {add.length > 0 && auc?.highestBidder !== "0x0000000000000000000000000000000000000000" && (
            <div className="w-full flex flex-col gap-[6px] border border-[#ffffff14] bg-[#24243557] rounded-[8px] py-3 px-3 md:px-4 group mt-4">
              <h3 className="text-[17px] font-medium capitalize">
                {/* 1==>opem */}
                {Number(auc?.status) === 0 ? (
                  auc?.highestBidder == auc?.seller ? (
                    <span>Winning Bid</span>
                  ) : (
                    <span>Loosing Bid</span>
                  )
                ) : (
                  <span>Highest Bid</span>
                )}
              </h3>
              <div className="flex md:flex-row justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105 md:w-[50px] md:h-[50px] w-[40px] h-[40px]"
                    src="https://rainbowit.net/html/nuron/assets/images/client/client-1.png"
                    alt=""
                  // width={55}
                  // height={55}
                  />
                  <div className="flex flex-col items-start gap-[1px]">
                    <h6 className=" flex justify-center items-center text-sm md:text-base font-medium text-[#00a3ff] capitalize transition-all duration-200 ease-in-out transform-gpu ">
                      {auc && shortAdd(auc?.highestBidder)}
                      <span
                        className="flex text-sm font-light text-[#cfcfcf]"
                        style={{ textTransform: "none" }}
                      >
                        <span className="mx-0 md:mx-1 md:block hidden"> -</span>
                        <span className="mx-0 md:mx-1 md:block hidden">
                          Placed a Bid
                        </span>
                      </span>
                    </h6>
                    <span className="mx-0 md:hidden block text-xs">
                      Placed a Bid
                    </span>
                    {/* <span className="text-xs md:text-sm text-[#cfcfcf]">
                    1 hour ago
                  </span> */}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm md:text-lg font-medium tracking-wide text-[#cfcfcf]">
                    {auc?.highestBid &&
                      scientificToDecimal(
                        roundNum(formatEth(auc?.highestBid))
                      )}{" "}
                    ETH
                  </span>
                  <span className="text-sm md:text-sm font-medium text-[#00a3ff]">
                    =${" "}
                    {scientificToDecimal(
                      roundNum(Number(formatEth(auc?.highestBid)) * Number(usd))
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-[55%] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {singleNFTdata?.map((item, index) => (
              <div key={index}>
                {item.details.map((name, i) => (
                  <h3 key={i} className="text-[22px] md:text-[34px] font-bold">
                    {name.name}
                  </h3>
                ))}
              </div>
            ))}
            {/* <div className="flex gap-[10px]">
              <div className="flex justify-center items-center gap-1 rounded-md py-[8px] px-[12px] cursor-pointer bg-[#212e48] text-white transition-all duration-300 transform-gpu group hover:bg-[#00a3ff]">
                <FiHeart className="text-[#cfcfcf] group-hover:text-white" />
                <span className="text-sm">33</span>
              </div>
              <div className="flex justify-center items-center gap-1 rounded-md py-[8px] px-[12px] cursor-pointer bg-[#212e48] transition-all duration-300 transform-gpu group hover:bg-[#00a3ff]">
                <BsThreeDots className="text-xl text-[#cfcfcf] group-hover:text-white" />
              </div>
            </div> */}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-10">
            <div className="flex flex-col gap-[6px] group">
              <span className="flex items-center text-base text-[#cfcfcf]">
                MarketPlace <MdKeyboardArrowRight className="text-xl" />{" "}
                Collection
              </span>
              <div className="flex justify-start items-start gap-4">
                <img
                  className="rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105"
                  src="https://rainbowit.net/html/nuron/assets/images/client/client-1.png"
                  alt=""
                  width={50}
                  height={50}
                />
                {auc && (
                  <h6 className="text-sm md:text-xl font-medium transition-all duration-200 ease-in-out transform-gpu hover:text-[#00a3ff]">
                    {auc.name}
                    <br />
                    <span className="text-sm block"> {auc.category} </span>
                  </h6>
                )}
              </div>
            </div>
            {auc &&
              (auc.seller.toLowerCase() != walladdres.toLowerCase() ? (
                auc && Number(auc.status) == 1 ? (
                  Number(timeLeft) != 0 ? (
                    <button
                      className="bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105"
                      onClick={() => setOpen(true)}
                    >
                      Place a Bid
                    </button>
                  ) : auc.highestBidder.toLowerCase() ==
                    walladdres.toLowerCase() ? (
                    <button
                      className="bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105"
                      onClick={() => handleEndAuc(Number(auc.tokenId))}
                    >
                      Claim Now
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      className="bg-[#212e48] text-gray-300 text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105"
                    //onClick={() => endAuc(Number(auc.tokenId))}
                    >
                      Auc End
                    </button>
                  )
                ) : (
                  <button className="bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105">
                    Sold
                  </button>
                )
              ) : Number(timeLeft) != 0 ? (
                <button className="bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105">
                  Owned
                </button>
              ) : //1=> statud Open
                auc &&
                  Number(auc.status) == 1 &&
                  auc.highestBidder ==
                  "0x0000000000000000000000000000000000000000" ? (
                  <button
                    className=" focus:scale-105 bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105"
                    onClick={() => handleEndAuc(Number(auc.tokenId))}
                  >
                    No Bid Now you can Claim
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={()=>{
                      Number(auc.highestBid)!=0?
                      handleReAuc(Number(auc.tokenId),((Number(formatEth(auc.highestBid)))))
                      :
                      handleReAuc(Number(auc.tokenId),((Number(formatEth(auc.reservedPrice)))))
                    }}
                    className="bg-[#212e48] text-white text-center font-medium w-full md:w-[40%] h-fit py-2 px-4 rounded-[10px] tracking-[0.5px] hover:bg-[#00a3ff] hover:text-[#fff] transition-all duration-300 ease-in-out transform-gpu hover:scale-105">
                    Re Auction
                  </button>
                ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1 flex justify-between bg-[#212e48] py-4 px-[12px] rounded-md text-sm font-medium">
              <span>Current Bid</span>
              <span className="text-right text-base font-semibold">
                {auc?.highestBid ? (
                  <span>
                    {scientificToDecimal(
                      roundNum(Number(formatEth(auc.highestBid)))
                    )}
                    &nbsp;ETH
                  </span>
                ) : (
                  <span>No Bid</span>
                )}
              </span>
            </div>
            <div className="flex-1 flex justify-between bg-[#212e48] py-4 px-[12px] rounded-md text-sm font-medium">
              <span>Count Down</span>
              <span className="text-right text-base font-semibold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="flex gap-2 rounded-[7px] border border-[#ffffff14] bg-[#24243557] p-2">
            {tabButtons.map((item) => (
              <button
                key={item.id}
                className={`flex-1 h-12 rounded-[5px] transition-all duration-300 transform-gpu ${currentTab.id === item.id
                  ? "bg-[#212e48]"
                  : "hover:border-white border border-dashed border-[#ffffff14]"
                  }`}
                onClick={() => setCurrentTab(tabButtons[item.id - 1])}
              >
                {item.title}
              </button>
            ))}
          </div>
          {currentTab.id === 1 && add && <BidTab addres={add} dollar={usd} />}
          {currentTab.id === 2 && auc && auc.tokenId > 0 && (
            <DetailTab auc={auc} />
          )}
          {currentTab.id === 3 && his && (
            <HistoryTab value={his} dollar={usd} />
          )}
        </div>
      </section>
    </>
  );
};

export default SingleNft;
