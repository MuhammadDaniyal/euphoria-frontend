import React, { useEffect, useState, useRef } from "react";
import carouselImg1 from "../../assets/images/carousel_1.png";
import carouselImg2 from "../../assets/images/carousel_2.png";
import ephHeading from "../../assets/images/Ephoria-heading.png";
import StyledButton from "../Shared/StyledButton";
import Lottie from "react-lottie";
import animationData1 from "../../lottie/Animation-1.json";
import animationData2 from "../../lottie/Animation-2.json";
import LoadingModal from "../Shared/LoadingModal/LoadingModal";

interface carouselDataType {
  id: number;
  title: string;
  heading: string;
  description: string;
  img: any;
}

const carouselData: carouselDataType[] = [
  {
    id: 1,
    title: "Euphoria",
    heading:
      "Discover <span style='color:#B900FF;'>Collect</span> & <span style='color:#B900FF;'>Sell</span>  Extraordinary NFTs Art",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam similique, ratione nisi dolores, quod optio officia eius a doloribus ea iste labore, accusantium dignissimos.zf",
    img: animationData1,
  },
  {
    id: 2,
    title: "NFT Market Place",
    heading:
      "Unlock the <span style='color:#B900FF;'>Glamour</span>, <span style='color:#B900FF;'>Connect</span> with Digital Realm!",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam similique, ratione nisi dolores, quod optio officia eius a doloribus ea iste labore, accusantium dignissimos.zf",
    img: carouselImg1,
  },
];

const Carousel = () => {
  const [carousel, setCarousel] = useState(carouselData[0]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: carousel.img,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = carouselData.findIndex((item) => item === carousel);
      const nextIndex = (currentIndex + 1) % carouselData.length;
      setCarousel(carouselData[nextIndex]);
    }, 6000);
    return () => clearInterval(intervalId);
  }, [carousel, carouselData]);

  return (
    <>
      <section className="relative text-white md:h-screen w-full md:w-4/5 flex md:flex-row flex-col justify-center md:justify-between md:items-start items-center md:gap-6 mx-auto md:px-0 px-5 pt-10 md:pt-8 pb-16 md:pb-0">
        {/* LEFT SIDE */}
        <div className=" w-full md:w-[55%] flex flex-col md:gap-6 gap-1">
          {/* <h1 className=" text-[32px] font-bold">{carousel.title}</h1> */}
          <div className=" flex justify-between items-center">
            <img
              src={ephHeading}
              alt="Heading"
              className=" md:w-56 w-32 md:h-full h-8"
            />
            {/* BUTTON SECTION */}
            <div className="flex md:hidden gap-3 md:top-6 top-3 md:right-2 right-4">
              <img
                src={carouselImg1}
                alt="carousel1"
                className={` md:w-[76px] md:h-[75px] w-[66px] h-[64px] p-[10px] border-[2.5px] rounded-[50%] cursor-pointer ${
                  carousel.id === carouselData[0].id && "circle"
                } `}
                onClick={() => setCarousel(carouselData[0])}
              />
              <img
                src={carouselImg2}
                alt="carousel2"
                className={` md:w-[76px] md:h-[75px] w-[66px] h-[64px] p-[10px] border-[2.5px] rounded-[50%] cursor-pointer ${
                  carousel.id === carouselData[1].id && "circle"
                } `}
                onClick={() => setCarousel(carouselData[1])}
              />
            </div>
          </div>
          <h3
            className={`mt-3 md:mt-0 text-[34px]  md:text-[48px] w-full md:w-[90%] font-semibold md:leading-[50px] leading-tight CodeNewRomanFont`}
            dangerouslySetInnerHTML={{ __html: carousel.heading }}
          ></h3>
          <p className=" w-full md:w-[80%] md:text-sm text-[13px] text-[#cfcfcf]">
            {carousel.description}
          </p>
          <div className="mt-4 md:mt-0 mx-auto my-5 w-60 md:hidden flex justify-center items-center">
            {/* // <Lottie options={defaultOptions} width={400} height={500} /> */}
            {carousel.id === 1 ? (
              <img src={carouselImg1} alt="carouselImg" className="  " />
            ) : (
              <img src={carouselImg2} alt="carouselImg" className="  " />
            )}
          </div>
          {carousel.id === 1 && (
            <>
              <div className="mt-4 md:mt-0 flex gap-8 md:justify-start justify-center w-full">
                <StyledButton
                  heading="Sell NFT"
                  bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
                  width={130}
                />
                <StyledButton
                  heading="Create NFT"
                  bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
                  width={130}
                />
              </div>
            </>
          )}
          {carousel.id === 2 && (
            <div className="mt-4 md:mt-0 flex gap-8 md:justify-start justify-center">
              <StyledButton
                heading="Connect Wallet"
                bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
                width={180}
              />
            </div>
          )}
          {/* BUTTON SECTION */}
          <div className="md:flex hidden gap-3 md:top-6 top-3 md:right-2 right-4">
            <img
              src={carouselImg1}
              alt="carousel1"
              className={` md:w-[76px] md:h-[75px] w-[66px] h-[64px] p-[10px] border-[2.5px] rounded-[50%] cursor-pointer ${
                carousel.id === carouselData[0].id && "circle"
              } `}
              loading="lazy"
              onClick={() => setCarousel(carouselData[0])}
            />
            <img
              src={carouselImg2}
              alt="carousel2"
              className={` md:w-[76px] md:h-[75px] w-[66px] h-[64px] p-[10px] border-[2.5px] rounded-[50%] cursor-pointer ${
                carousel.id === carouselData[1].id && "circle"
              } `}
              loading="lazy"
              onClick={() => setCarousel(carouselData[1])}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className=" w-[40%] h-3/4 md:mt-10 mt-20 hidden md:flex justify-end items-center">
          {carousel.id === 1 ? (
            <Lottie options={defaultOptions} width={400} height={500} />
          ) : (
            <img src={carousel.img} alt="carouselImg" className="  " />
          )}
        </div>
      </section>
    </>
  );
};

export default Carousel;
