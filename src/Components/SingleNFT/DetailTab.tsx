import React, { useEffect, useState } from "react";
import DetailTabPropertyCard from "./DetailTabPropertyCard";
import { shortAdd } from "../../helpers/functions/page";
import { _Nft } from "../../types";
import Loader from "../Loader/Loader";

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  walletAddress: string;
  profilePic: string;
}

const DetailTab = ({ auc }: { auc: _Nft }) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://euphoria-backend-production.up.railway.app/api/profile/names?status=accepted`
        );
        const profiles: UserProfile[] = await response.json();
        const user = profiles.find(
          (profile) =>
            profile.walletAddress.toLowerCase() === auc.seller.toLowerCase()
        );
        if (user) {
          setUserData(user);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [auc.seller]);

  return (
    <div className="flex flex-col gap-5 mt-4">
      {loading ? (
        <Loader classname="h-[200px]" />
      ) : (
        <>
          {/* OWNER */}
          <div className="flex flex-col gap-[8px] group">
            <span className="text-sm font-medium text-[#cfcfcf]">Owner</span>
            <div className="flex items-center gap-4">
              <img
                className="rounded-[50%] border-[3px] border-[#ffffff14] transition-all duration-200 ease-in-out transform-gpu group-hover:border-none group-hover:scale-105 w-12 h-12 object-cover"
                src={
                  userData?.profilePic ||
                  "https://rainbowit.net/html/nuron/assets/images/client/client-1.png"
                }
                alt={userData?.name || "User"}
                width={50}
                height={50}
              />
              <h3 className="text-xl font-medium transition-all duration-200 ease-in-out transform-gpu group-hover:text-[#00a3ff]">
                {userData?.name || shortAdd(auc.seller)}
              </h3>
            </div>
          </div>
          {/* PROPERTY */}
          <div className="flex flex-col gap-[8px] group">
            <span className="text-sm font-medium text-[#cfcfcf]">Property</span>
            <div className="flex flex-wrap items-center gap-3">
              <DetailTabPropertyCard auc={auc} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailTab;
