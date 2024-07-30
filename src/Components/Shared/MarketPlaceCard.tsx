import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { formatEth, scientificToDecimal, tohrd, tohrdd } from "../../helpers/functions/page";
import { useEffect, useState } from "react";

type MarketCardProps = {
  id: number;
  marketplace: string;
  name: string;
  userName: string; // This is the address
  currentBid: number;
  inDollars: number;
  endAt: number;
  startAt: number;
  image: string;
  NftSt: number;
  type: string;
};

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  walletAddress: string;
  profilePic: string;
}

type time = { days: number; hours: number; minutes: number; seconds: number } | string;

const MarketPlaceCard: React.FC<MarketCardProps> = ({
  id,
  marketplace,
  name,
  userName, // This is the address
  currentBid,
  inDollars,
  endAt,
  image,
  startAt,
  NftSt,
  type,
}) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [remTime, setRemTime] = useState<time>();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const [userProfilePic, setUserProfilePic] = useState<string>(); // default profile image

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/profile/names?status=accepted`);
        const profiles = await response.json();
        setUserProfiles(profiles);
      } catch (error) {
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

  useEffect(() => {
    const userProfile = getUserProfile(userName.toLowerCase());
    console.log("UserProfile: ", userProfile); // Debug log
    console.log("UserName: ", userName); // Debug log
    if (userProfile) {
      setUserDisplayName(userProfile.username);
      setUserProfilePic(userProfile.profilePic); // Set profile pic from API
    } else {
      setUserDisplayName("User");
    }
  }, [userProfiles, userName]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = tohrd(endAt);
      setRemainingTime(timeLeft);
      if (timeLeft == "End") {
        clearInterval(intervalId);
      }
    }, 950);

    return () => clearInterval(intervalId);
  }, [endAt]);

  useEffect(() => {
    const intervalId1 = setInterval(() => {
      const timeLeft: time = tohrdd(startAt);
      setRemTime(timeLeft);
      if (timeLeft == "End") {
        clearInterval(intervalId1);
      }
    }, 960);

    return () => clearInterval(intervalId1);
  }, [startAt]);

  return (
    <NavLink
      to={`/nft/${marketplace}/${id}`}
      className="card main-card flex flex-col gap-4 px-3 py-5 text-white md:w-[270px] w-[260px] bg-[#1f2045] border-2 border-[#2e2459] rounded-lg cursor-pointer md:h-[390px] h-[420px]
    group transition-all duration-300 ease-in-out hover:scale-105 my-[10px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img
            src={userProfilePic} // Use fetched profile pic
            alt="profile"
            className="w-11 h-11 rounded-[50%] object-cover"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-sm">{name}</h3>
            <p className="text-[#cfcfcf] text-xs">{userDisplayName}</p>
          </div>
        </div>
        <FaRegHeart />
      </div>
      <div className=" relative md:h-52 h-60 mb-2">
        {/* <img src={image} alt="img " className=" rounded-lg h-full w-full" /> */}
        {type != "video/mp4" ?
          <img
            src={image}
            alt=""
            className=" rounded-lg h-full w-full"
          />
          :
          <video width="600" height={200} controls>
            <source src={image} type="video/mp4" />
            {/* <source src={d} type="image/jpeg" /> */}
            Your browser does not support the video tag.
          </video>}
          
        <div className=" absolute bottom-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
          <div className=" w-11">
            <p className=" bg-[#707070] marketplaceCardTimerbg px-1 py-1 rounded text-center">
              {typeof remTime != "string" ? remTime?.days : 0}
            </p>
            <p className="text-[#cfcfcf] w-full text-center">DAY</p>
          </div>
          <div className="w-11">
            <p className="bg-[#707070] marketplaceCardTimerbg px-1 py-1 rounded text-center">
              {typeof remTime !== "string" ? remTime?.hours : 0}
            </p>
            <p className="text-[#cfcfcf] w-full text-center">HR'S</p>
          </div>
          <div className="w-11">
            <p className="bg-[#707070] marketplaceCardTimerbg px-1 py-1 rounded text-center">
              {typeof remTime !== "string" ? remTime?.minutes : 0}
            </p>
            <p className="text-[#cfcfcf] w-full text-center">MIN'S</p>
          </div>
          <div className="w-11">
            <p className="bg-[#707070] marketplaceCardTimerbg px-1 py-1 rounded text-center">
              {typeof remTime !== "string" ? remTime?.seconds : 0}
            </p>
            <p className="text-[#cfcfcf] w-full text-center">SEC</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-3/6 border-r flex flex-col gap-1 border-[#cfcfcf]">
          <p className="text-[#cfcfcf] text-xs">Current Bid</p>
          <h4 className="text-[15px] font-semibold pr-6">
            {typeof currentBid === "bigint"
              ? scientificToDecimal(formatEth(currentBid))
              : scientificToDecimal(currentBid)}{" "}
            ETH
          </h4>
        </div>
        <div className="w-3/6 pl-6 flex flex-col gap-1">
          <p className="text-[#cfcfcf] text-xs">Ending In</p>
          <h4 className="text-[15px] font-semibold">{remainingTime}</h4>
          <div className="flex gap-2">
            <p className="text-[#cfcfcf] text-xs">Hrs</p>
            <p className="text-[#cfcfcf] text-xs">Mins</p>
            <p className="text-[#cfcfcf] text-xs">Secs</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default MarketPlaceCard;
