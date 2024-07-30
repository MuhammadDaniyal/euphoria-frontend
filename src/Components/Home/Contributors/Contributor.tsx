import { useEffect, useState } from "react";
import ContributorCard from "./ContributorCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getJson } from "../../../helpers/apiInstance";
import { ethers } from "ethers";
import { getProvider } from "../../../helpers/functions/page";
import Loader from "../../../Components/Loader/Loader";

const Contributor = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // const settings: any = {
  //   infinite: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  //   pauseOnHover: false,
  //   autoplay: true,
  //   speed: 2000,
  //   autoplaySpeed: 2000,
  //   cssEase: "linear",
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       setting: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 520,
  //       setting: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };
  const settings1: any = {
    infinite: true,
    slidesToShow: 6,
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
    slidesToShow: 2,
    slidesToScroll: 2,
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

  const fetchBalance = async (accountAddress: string) => {
    try {
      const Provider = await getProvider();
      const balance = await Provider.getBalance(accountAddress);
      const balanceInEther = ethers.formatEther(balance);
      return Number(balanceInEther).toFixed(3);
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getJson(
          `https://euphoria-backend-production.up.railway.app/api/profile/profiles?status=accepted`
        );
        if (response) {
          const contributorsWithBalances = await Promise.all(
            response.map(async (contributer: any) => {
              const balanceInEther = await fetchBalance(
                contributer.walletAddress
              );
              return { ...contributer, ethAmount: balanceInEther };
            })
          );
          setContributors(contributorsWithBalances);
          setLoading(true)
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("contributors", contributors);
  }, [contributors]);

  return (
    <section className=" w-[85%] flex flex-col justify-center items-center my-5 mx-auto mt-10">
      <div className="flex flex-col justify-center items-center gap-3">
        <h4 className="uppercase  font-semibold text-xl text-[#B900FF]">
          NFT Creators
        </h4>
        <h3 className=" text-white font-semibold text-3xl md:text-5xl tracking-wider">
          Top Contributors
        </h3>
      </div>
      <div className="hidden md:block w-full my-9">
        {loading ? ( <Slider {...settings1}>
          {contributors.map((contributer, index) => (
            <ContributorCard
              key={index}
              walletAddress={contributer.walletAddress}
              name={contributer.username}
              img={contributer.profilePic}
              ethAmount={contributer.ethAmount}
            />
          ))}
        </Slider>) : (
          <div className=" flex justify-center items-center mx-auto">
          <Loader classname=" h-[300px] " />
          </div>
        )}
       
      </div>
      <div className="block md:hidden w-full my-9">
        <Slider {...settings2}>
          {contributors.map((contributer, index) => (
            <ContributorCard
              key={index}
              walletAddress={contributer.walletAddress}
              name={contributer.username}
              img={contributer.profilePic}
              ethAmount={contributer.ethAmount}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Contributor;
