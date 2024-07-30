import React, { useEffect, useState } from "react";
import { shortAdd, formatEth, rTime } from "../..//helpers/functions/page";
import Loader from "../Loader/Loader";

interface NftBids {
  bidtime: number;
  useraddress: string;
  bidAmount: number;
}

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  walletAddress: string;
  profilePic: string;
}

const BidTab = ({ addres, dollar }: { addres: any; dollar: number }) => {
  const [data, setData] = useState<NftBids[]>();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(addres);
  }, [addres]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://euphoria-backend-production.up.railway.app/api/profile/names?status=accepted`
        );
        const profiles = await response.json();
        setUserProfiles(profiles);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error("Error fetching user profiles:", error);
      }
    };
    fetchUserProfiles();
  }, []);

  const getUserProfile = (address: string) => {
    return  userProfiles && userProfiles.find(
      (profile) => profile?.walletAddress?.toLowerCase() === address?.toLowerCase()
    );
  };

  return (
    <div className="flex flex-col divide-y divide-[#ffffff14] h-[265px] overflow-y-scroll scroll-marketplace-dropdown px-2">
      { loading ? (
        <Loader classname="h-[400px]" />
      ): 
      userProfiles && data && data.length > 0 ? (
        data.map((item: NftBids, index: any) => {
          const userProfile = getUserProfile(item.useraddress);
          return (
            <div
              key={index}
              className="flex justify-between items-center group py-4"
            >
              <div className="flex items-center gap-3">
                <img
                  className="rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105 md:w-[50px] md:h-[50px] w-12 h-12  object-cove"
                  src={
                    userProfile?.profilePic ||
                    "https://rainbowit.net/html/nuron/assets/images/client/client-1.png"
                  }
                  alt={userProfile?.name || "User"}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col items-start gap-[1px]">
                  <h6 className="flex justify-center items-center text-sm md:text-base font-medium text-[#00a3ff] capitalize transition-all duration-200 ease-in-out transform-gpu">
                    {userProfile?.name || shortAdd(item.useraddress)}
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
                  <span className="text-xs md:text-sm text-[#cfcfcf]">
                    {rTime(Number(item.bidtime))}
                  </span>
                </div>
              </div>
              <div className=" flex flex-col items-end">
                <span className="text-sm md:text-lg font-medium tracking-wide text-[#cfcfcf]">
                  {formatEth(item.bidAmount)} ETH
                </span>
                <span className=" text-sm md:text-sm font-medium text-[#00a3ff]">
                  ={(Number(formatEth(item.bidAmount)) * dollar).toFixed(10)} $
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center text-right font-bold text-xl">
          <p>No bids Yet!</p>
        </div>
      )}
    </div>
  );
};

export default BidTab;