// import { History } from "@/types";
import {
  formatEth,
  roundNum,
  scientificToDecimal,
  shortAdd,
} from "../../helpers/functions/page";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

interface NftHis {
  wintime: number;
  winaddress: string;
  winAmount: number;
  status: string;
}

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  walletAddress: string;
  profilePic: string;
}

const HistoryTab = ({ value, dollar }: { value: NftHis[]; dollar: number }) => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "http://localhost:8000/api/profile/names?status=accepted"
        );
        const profiles: UserProfile[] = await response.json();
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
    return userProfiles.find(
      (profile) => profile.walletAddress.toLowerCase() === address.toLowerCase()
    );
  };

  return (
    <div className="flex flex-col divide-y divide-[#ffffff14] h-[265px] overflow-y-scroll scroll-marketplace-dropdown px-2">
  {/* Bid Card */}
  {loading ? (
    <Loader classname="h-[400px]" />
  ) : value && value.length > 0 ? (
    value.map((item: NftHis, index: number) => {
      const userProfile = getUserProfile(item.winaddress);
      return (
        <div className="flex justify-between items-center group py-3" key={index}>
          <div className="flex items-center gap-4 max-w-48 w-full">
            <img
              className="rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105 w-12 h-12 object-cove"
              src={
                userProfile?.profilePic ||
                "https://rainbowit.net/html/nuron/assets/images/client/client-1.png"
              }
              alt={userProfile?.name || "User"}
              width={50}
              height={50}
            />
            <div className="flex flex-col items-start gap-[1px] ">
              <h6 className="text-base font-medium text-[#00a3ff] capitalize transition-all duration-200 ease-in-out transform-gpu">
                {userProfile?.name || shortAdd(item.winaddress)}
              </h6>
              <span className="text-sm text-[#cfcfcf]">
                {/* Add additional user details here */}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-medium tracking-wide text-[#cfcfcf]">
              Action
            </span>
            <span className="text-sm font-medium text-[#00a3ff]">
              {item.status}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-medium tracking-wide text-[#cfcfcf]">
              {scientificToDecimal(roundNum(formatEth(item.winAmount)))} ETH
            </span>
            <span className="w-fit mx-auto text-sm font-medium text-[#00a3ff]">
              =${roundNum(Number(formatEth(item.winAmount)) * dollar)}
            </span>
          </div>
        </div>
      );
    })
  ) : (
    <div className="flex justify-center items-center text-right font-bold text-xl">
      <p>No History Found!</p>
    </div>
  )}
</div>

  );
};

export default HistoryTab;
