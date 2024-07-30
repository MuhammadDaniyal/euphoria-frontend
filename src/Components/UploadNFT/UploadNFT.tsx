import React, { useEffect, useState,useRef } from "react";
import UploadForm from "./UploadForm";
import { errorToastify } from "../../utils/toast";

import {
  listingprice,
} from "../../helpers/functions/page";
import { FiUpload } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NftTypes } from "../../data";
import { useParams } from "react-router-dom";
import LoadingModal from "../Shared/LoadingModal/LoadingModal";
import { FaLockOpen } from "react-icons/fa6";

const UploadNFT = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { collect,category } = useParams<{ collect: string, category: string  }>();
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    null
  );
  const [openDropDown, setOpenDropDown] = useState<boolean[]>([false]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [loop, setloop] = useState<number | null>();

  const [lipri, setliprice] = useState("");

  useEffect(() => {
    // console.log("query param", collect);
    const fetchData = async () => {
      try {
        const val = await listingprice();
        setliprice(val);

      } catch (error) {
        if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
        else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
        else { if (error) { errorToastify(String(error)) } }

      }


    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loop == 0) {
      setOpen(false);
      setSelectedFile(null)
      setSelectedType(null)
    }
  }, [loop]);

  const handleFileSelect = async (event: any) => {
    const file = event.target.files[0] && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropDownClick = (index: number) => {
    let newOpenDropDown: boolean[] = [];
    newOpenDropDown = openDropDown.map((item, i) => {
      return i === index ? !openDropDown[i] : false;
    });
    setOpenDropDown(newOpenDropDown);
  };

  return (
    <>
      <section className=" w-full md:w-[80%] h-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-12 text-white mx-auto py-10">
        <div className=" w-[90%] md:w-[45%] flex flex-col">
          {/* dropdown */}
          <div>
            <label className="text-base font-medium">
              What type of NFT you would like to add?
            </label>
            <div className=" flex flex-col gap-2 mt-3 ">
              <button
                className=" flex justify-between items-center rounded-lg text-[13px] font-extralight collectionforminput"
                onClick={() => handleDropDownClick(0)}
              >
                <span>
                  {selectedType ? selectedType : "Choose your preferred type"}
                </span>
                {openDropDown[0] ? (
                  <IoIosArrowUp className="text-lg cursor-pointer" />
                ) : (
                  <IoIosArrowDown className="text-lg cursor-pointer" />
                )}
              </button>
              <div
                className={` ${
                  openDropDown[0] ? "block" : "hidden"
                }  rounded-lg z-50  text-base  scroll-marketplace-dropdown collectiondropdown w-full  `}
              >
                {NftTypes.map((item, i) => {
                  return (
                    <p
                      key={i}
                      className=" w-full p-0 capitalize font-normal text-sm py-2 px-5 cursor-pointer hover:bg-gray-400 z-50 "
                      onClick={() => {
                        setSelectedType(item.type);
                        setOpenDropDown([false]);
                      }}
                    >
                      {item.type}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* upload section */}
          <>
            {selectedType &&
            (selectedType === "Photo" ||
              selectedType === "Video/GIF" ||
              selectedType === "Music") ? (
              <div className=" mt-3">
                {/* content */}
                <div>
                  <h2 className="text-white mb-2 font-semibold text-base">
                    Upload File
                  </h2>
                  <h3 className=" text-[15px] font-light text-gray-400">
                    Drag or choose your file to upload
                  </h3>
                </div>

                {/* upload box */}
                <div
                  className=" border-[16px] border-slate-900 bg-slate-900 rounded-lg h-[17rem] md:h-fit mt-9 cursor-pointer
          transition-all duration-300 ease-in-out transform-gpu hover:scale-105 hover:border-[12px] hover:border-[#0077ff]"
                  onClick={() => {
                    document.getElementById("uploadfile")?.click();
                  }}
                >
                  <div
                    className={`flex gap-5 ${
                      imagePreview ? "" : "md:mt-5 md:mb-5 md:py-5"
                    } px-2 md:px-5`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      id="uploadfile"
                      onChange={handleFileSelect}
                    />
                    {/* icon */}
                    <div
                      className={` ${
                        imagePreview && "hidden"
                      } flex-1 flex flex-col justify-center items-center border border-dashed border-level-1 transition-all group-hover:border-solid w-48 md:w-16 h-60 md:h-72 rounded-lg`}
                    >
                      <FiUpload className="text-2xl mb-3" />
                      <h1 className=" text-lg">Drag and drop media</h1>
                      <p className=" text-gray-400 text-sm mt-2">
                        Max size: 50MB
                      </p>
                      <p className=" text-gray-400 text-sm">
                        JPG, PNG, GIF, SVG, MP4
                      </p>
                    </div>
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                {/* note */}
              </div>
            ) : selectedType === "Link" ? (
              <div className="mt-3">
                <label className="text-base font-medium">{selectedType}</label>
                <input
                  type="text"
                  placeholder={`Enter your ${selectedType}`}
                  name={selectedType}
                  className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                />
              </div>
            ) : null}
          </>
          {selectedType && (
            <div className="div">
              <div>
                <h3 className="text-white font-semibold text-base mt-5">
                  Note:
                </h3>
                <p className=" text-[15px] font-light text-gray-400">
                  Service Fee: {lipri} ETH
                </p>
              </div>
              {/* <div>
                <h3 className="text-white font-semibold text-base mt-5">
                  Uploading:{" "}
                </h3>
                <p className=" text-[15px] font-light text-gray-400">
                  4/{loop}
                </p>
              </div> */}
            </div>
          )}
        </div>

        <div className=" w-[90%] md:w-[55%] flex flex-col gap-4">
          <UploadForm file={selectedFile} loop={setloop} coll={collect} modalOpen={setOpen} cat={category} />
        </div>
      </section>
      <LoadingModal
        setOpen={setOpen}
        open={open}
        cancelButtonRef={cancelButtonRef}
        loadingText="Loading"
        textToDisplay="Your NFT is uploading on your collection"
      />
    </>
  );
};

export default UploadNFT;
