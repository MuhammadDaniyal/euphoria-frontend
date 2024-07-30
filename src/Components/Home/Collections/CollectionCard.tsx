import React, { useState } from "react";
import { CollectionsCardProps } from "../../../types/index";
import { NavLink } from "react-router-dom";

const CollectionCard: React.FC<CollectionsCardProps> = ({
  id,
  tag,
  img1,
  img2,
  img3,
  img4,
  createdBy,
  name,
  floorPrice,
}) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (img: any) => {
    setHoveredImage(img);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <>
      <NavLink to={`/collection/${tag}/${id}`}>
        <div className=" mx-auto my-3 text-white bg-slate-800 flex flex-col gap-4 rounded-lg h-60  md:w-64 w-60 px-3 py-3 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
          {/* images */}
          <div
            className={` grid ${
              hoveredImage === null
                ? "h-[60%] grid-rows-2 grid-flow-col gap-2"
                : "grid-col-1"
            } `}
          >
            {hoveredImage === null ? (
              <>
                <div className="col-span-2 gap-2">
                  <div className=" grid grid-cols-2 h-full gap-2">
                    <img
                      src={img1}
                      alt="collection1"
                      className=" object-cover h-full rounded-lg transition-all duration-500 ease-in-out"
                      onMouseEnter={() => handleMouseEnter(img1)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <img
                      src={img2}
                      alt="collection2"
                      className=" object-cover  h-full rounded-lg  transition-all duration-500 ease-in-out"
                      onMouseEnter={() => handleMouseEnter(img2)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                </div>
                <div className="row-span-2 col-span-2 rounded-lg mt-1">
                  <img
                    src={img3}
                    alt="collection3"
                    className=" object-cover  w-full h-full rounded-lg  transition-all duration-500 ease-in-out"
                    onMouseEnter={() => handleMouseEnter(img3)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
                <div className="row-span-3 col-span-2 rounded-lg">
                  <img
                    src={img4}
                    alt="collection4"
                    className=" object-cover h-full rounded-lg  transition-all duration-500 ease-in-out"
                    onMouseEnter={() => handleMouseEnter(img4)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </>
            ) : (
              <img
                src={hoveredImage}
                alt="collection1"
                className=" object-cover w-full  h-32 rounded-lg transition-all duration-500 ease-in-out"
                onMouseLeave={handleMouseLeave}
              />
            )}
          </div>
          {/* content */}
          <div className=" h-[40%] flex flex-col justify-center gap-1">
            {/* main heading */}
            <h4 className=" text-base font-medium">{name}</h4>
            {/* Created by & price */}
            <div className="flex justify-between items-center">
              {/* first div */}
              <div>
                <span className=" text-xs font-extralight">Created By</span>
                <h4 className=" text-[16px] leading-5 font-light">
                  {createdBy}
                </h4>
              </div>
              {/* second div */}
              <div>
                <span className=" text-xs font-extralight">Floor</span>
                <h4 className=" text-[16px] leading-5 font-light">
                  {floorPrice} ETH
                </h4>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default CollectionCard;
