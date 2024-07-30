// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import StyledButton from "../../Shared/StyledButton";
// import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { grpsell, listedAuction } from "../../../helpers/functions/page"; // Adjust the import path as needed
// import { CollectionsData } from "@/types";
import MarketPlaceCard from "../../../Components/Shared/MarketPlaceCard";
import { errorToastify } from "../../../utils/toast"; // Adjust the import path as needed
import CollectionCard1 from "./CollectionCard1";

// function SampleNextArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <div onClick={onClick} className="cursor-pointer">
//       <IoIosArrowForward className="md:text-5xl text-4xl text-white" onClick={onClick} />
//     </div>
//   );
// }

// interface Item {
//   own: string;
//   seller: string;
//   tokenId: number;
//   Imagelink: string;
//   reservedPrice: number;
//   startAt: number;
//   endAt: number;
//   status: number;
//   highestBid: number;
//   highestBidder: string;
//   royality: number;
//   HON: string;
//   category: string;
//   collection: string;
// }

// interface CollectionGroup {
//   collection: string;
//   seller: string;
//   price: string;
//   items: Item[];
// }

// function SamplePrevArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <div onClick={onClick} className="cursor-pointer">
//       <IoIosArrowBack className="md:text-5xl text-4xl text-white" onClick={onClick} />
//     </div>
//   );
// }

// const Collections = () => {
//   const theme = useTheme();
//   const upSm = useMediaQuery(theme.breakpoints.up("md"));
//   const downSm = useMediaQuery(theme.breakpoints.down("sm"));

//   const [featuredCollection, setFeaturedCollection] = useState<CollectionsData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [auc, setAuc] = useState<CollectionGroup[]>([]);
//  console.log("thus is auc",auc)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await listedAuction();
//         const val = grpsell(data);
//         setAuc(val);
//         console.log(val)
//         setLoading(false);
//       } catch (error) {
//         if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
//         else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
//         else { if (error) { errorToastify(String(error)) } }

//       }
//     };
//     fetchData();
//   }, []);
//   const settings1 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   const settings2 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   return (
//     <>
//       <section className="collection w-[95%] flex flex-col justify-center items-center gap-10 my-8 mx-auto">
//         <div className="flex flex-col justify-center items-center gap-3">
//           <h4 className="uppercase font-semibold text-xl text-[#B900FF]">Popular Creators</h4>
//           <h3 className="text-white font-semibold text-3xl md:text-5xl tracking-wider">Top Collections</h3>
//         </div>
//         {loading ? (
//           <p className="text-white">Loading...</p>
//         ) : (
//           <>
//             {upSm && (
//               <Slider {...settings1} className="w-full">
//               {auc && auc.length > 0 && (
//               // filterData.map((item:any, i:number) => <CollectionCard  {...item} />)
//               auc.map((item: CollectionGroup, i: number) => (

//                 <CollectionCard1
//                    key={i}
//                   idd={item.seller}
//                   tag={item.collection}
//                   group={item}
//                   createdBy={item.seller}
//                   name={item.collection}
//                   floorPrice={(item.price)}
//                 />
//               ))
//             ) }

//               </Slider>
//             )}
//             {downSm && (
//               <Slider {...settings2} className="w-full">
//                  {auc && auc.length > 0 && (
//               // filterData.map((item:any, i:number) => <CollectionCard  {...item} />)
//               auc.map((item: CollectionGroup, i: number) => (

//                 <CollectionCard1
//                 key={i}

//                   idd={item.seller}
//                   tag={item.collection}
//                   group={item}
//                   createdBy={item.seller}
//                   name={item.collection}
//                   floorPrice={(item.price)}
//                 />
//               ))
//             ) }

//               </Slider>
//             )}
//           </>
//         )}
//         <NavLink to={"/marketplace"}>
//           <StyledButton
//             heading="View Collections"
//             bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
//             width={180}
//           />
//         </NavLink>
//       </section>
//     </>
//   );
// };

// export default Collections;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// ICONS
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// COMPONENTS
import CollectionCard from "./CollectionCard";
import StyledButton from "../../Shared/StyledButton";

// MUI
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// SLIDER SLICK
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// DATA
import { AllCollections } from "../../../data";

// TYPES
import { CollectionsData } from "@/types";
import { grpsell, listedAuction } from "../../../helpers/functions/page";
import Loader from "../../../Components/Loader/Loader";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className=" cursor-pointer">
      <IoIosArrowForward
        className={` md:text-5xl text-4xl text-white`}
        onClick={onClick}
      />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className=" cursor-pointer">
      <IoIosArrowBack
        className={` md:text-5xl text-4xl text-white`}
        onClick={onClick}
      />
    </div>
  );
}

const Collections = () => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const [featuredCollection, setFeaturedCollection] =
    useState<CollectionsData[]>(AllCollections);

  useEffect(() => {
    const filteredCollection = AllCollections.filter(
      (item) => item.featured === true
    );
    setFeaturedCollection(filteredCollection);
  }, []);

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

  const [loading, setLoading] = useState(true);

  const [auc, setAuc] = useState<CollectionGroup[]>([]);
  // console.log("thus is auc",auc)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listedAuction();
        const val = grpsell(data);
        setAuc(val);
        //  console.log(val)
        setLoading(true)
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

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <section className="collection w-[90%] flex flex-col justify-center items-center gap-10 my-8 mx-auto">
        <div className="flex flex-col justify-center items-center gap-3">
          <h4 className="uppercase font-semibold text-xl text-[#B900FF]">
            Popular Creators
          </h4>
          <h3 className=" text-white font-semibold text-3xl md:text-5xl tracking-wider">
            Top Collections
          </h3>
        </div>
        {/* DESKTOP */}
        <div className=" hidden xl:block w-full my-6">
          {auc && auc.length > 0 && loading ?  (
            <Slider {...settings1} className="w-full ">
              {auc.map((item: CollectionGroup, i: number) => (
                <CollectionCard1
                  key={i}
                  idd={item.seller}
                  tag={item.collection}
                  group={item}
                  createdBy={item.seller}
                  name={item.collection}
                  floorPrice={item.price}
                  Head={"NA"}
                  cat={item.category}
                />
              ))}
            </Slider>
          ): (
            <div className=" flex justify-center items-center mx-auto">
              <Loader classname=" h-[400px] " />
              </div>
          )}
        </div>
        {/* LAPTOP */}
        <div className="hidden md:block xl:hidden w-full my-6">
          {auc && auc.length > 0 && (
            <Slider {...settings2} className="w-full ">
              {auc.map((item: CollectionGroup, i: number) => (
                <CollectionCard1
                  key={i}
                  idd={item.seller}
                  tag={item.collection}
                  group={item}
                  createdBy={item.seller}
                  name={item.collection}
                  floorPrice={item.price}
                  Head={"NA"}
                  cat={item.category}
                />
              ))}
            </Slider>
          )}
        </div>
        {/* MOBILE */}
        <div className="block md:hidden w-full my-6">
          {auc && auc.length > 0 && (
            <Slider {...settings3} className="w-full ">
              {auc.map((item: CollectionGroup, i: number) => (
                <CollectionCard1
                  key={i}
                  idd={item.seller}
                  tag={item.collection}
                  group={item}
                  createdBy={item.seller}
                  name={item.collection}
                  floorPrice={item.price}
                  Head={"NA"}
                  cat={item.category}
                />
              ))}
            </Slider>
          )}
        </div>
       
        <NavLink to={"/marketplace"}>
          <StyledButton
            heading="View Collections"
            bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
            width={180}
          />
        </NavLink>
      </section>
    </>
  );
};

export default Collections;
