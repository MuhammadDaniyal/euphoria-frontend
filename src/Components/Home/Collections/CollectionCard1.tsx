import { roundNum, scientificToDecimal, shortAdd } from "../../../helpers/functions/page";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
  idd: string;
  tag: string;
  group: CollectionGroup;
  createdBy: string;
  name: string;
  floorPrice: string;
  Head: string;
  cat: string;
}

const CollectionCard: React.FC<CollectionsCardProps> = ({
  idd,
  tag,
  group,
  createdBy,
  name,
  floorPrice,
  Head,
  cat,
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [items, setItems] = useState<any>();
  const [fp, setfp] = useState<any>();
  const [state1, setState1] = useState<boolean>(false);

  const handleMouseEnter = (img: string) => {
    setHoveredImage(img);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  useEffect(() => {
    if (group && group.items) {
      setItems(group.items);
    }
  }, [group]);

  useEffect(() => {
    const price = floorPrice;
    console.log("Price==>", price);
    setfp(price);
  }, [state1,floorPrice]);

  useEffect(() => {
    if (name && isNaN(Number(floorPrice))) {
      const timer = setTimeout(() => {
        setState1((prevState) => !prevState);
      }, 1000);

      // Clean up the timer on component unmount or if Bd changes
      return () => clearTimeout(timer);
    }
  }, [name]);

  return (
    <NavLink
      to={
        floorPrice != "0"
          ? `/collection/${tag}/${Head != "NA" ? Head : idd}/${
              Head != "NA" ? 1 : "NA"
            }`
          : `/upload-nft/${tag}/${cat}`
      }
    >
      <div className="mx-auto my-3 text-white bg-slate-800 flex flex-col gap-4 rounded-lg h-60 md:w-64 w-60 px-3 py-3 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
        {/* images */}
        <div
          className={`grid h-[60%] ${
            hoveredImage === null && items?.length >= 3
              ? "grid-rows-2 grid-cols-2 gap-2"
              : "grid-rows-2 grid-cols-1 gap-2"
          }`}
        >
          {hoveredImage === null ? (
            group.items
              .slice(0, Math.min(group.items.length, 3))
              .map((item, index) => (
                <img
                  key={index}
                  src={item.Imagelink}
                  alt={`collection${index + 1}`}
                  className={`object-cover h-full w-full rounded-lg transition-all duration-500 ease-in-out ${
                    index === 1 || group.items.length === 1
                      ? "row-span-2"
                      : "col-span-1"
                  }`}
                  onMouseEnter={() =>
                    group.items.length ? handleMouseEnter(item.Imagelink) : null
                  }
                  onMouseLeave={handleMouseLeave}
                />
              ))
          ) : (
            <img
              src={hoveredImage}
              alt="hovered"
              className="object-cover w-full h-32 rounded-lg transition-all duration-500 ease-in-out"
              onMouseLeave={handleMouseLeave}
            />
          )}
        </div>
        {/* content */}
        <div className="h-[40%] flex flex-col justify-center gap-1">
          {/* main heading */}
          <h4 className="text-base font-medium">{name}</h4>
          {/* Created by & price */}
          <div className="flex justify-between items-center">
            {/* first div */}
            <div className=" flex flex-col gap-1">
              <span className="text-xs font-extralight">Created By</span>
              <h4 className="text-[16px] leading-5 font-light">
                {shortAdd(createdBy)}
              </h4>
            </div>
            {/* second div */}
            <div className=" flex flex-col gap-1">
              <span className="text-xs font-extralight">Floor</span>
              <h4 className="text-[16px] leading-5 font-light">
                {scientificToDecimal(roundNum(Number(fp)))} ETH
              </h4>
            </div>
          </div>
          {/* Reserved Price Sum */}
          {/* <div className="mt-2">
            <span className="text-xs font-extralight">Reserved Price Sum</span>
            <h4 className="text-[16px] leading-5 font-light">{group.price} ETH</h4>
          </div> */}
        </div>
      </div>
    </NavLink>
  );
};

export default CollectionCard;
