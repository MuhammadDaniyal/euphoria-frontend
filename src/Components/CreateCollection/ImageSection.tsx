import React, { useState } from "react";
import { IoMdImage } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

const ImageSection = ({
  label1,
  label2,
  name1,
  name2,
  firstimg,
  secondimg,
  setFieldValue,
}: {
  label1: string;
  label2: string;
  name1: string;
  name2: string;
  firstimg: string;
  secondimg: string;
  setFieldValue: any;
}) => {
  const [coverPicPreview, setCoverPicPreview] = useState<string | null>(null);
  const [backgroundPicPreview, setBackgroundPicPreview] = useState<
    string | null
  >(null);

  const handleCoverPicSelect = async (e: any) => {
    const file = e.target.files[0] && e.target.files[0];
    if (file) {
      setFieldValue(name1, file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // console.log("Reader", typeof reader.result);
          setCoverPicPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundPicSelect = async (e: any) => {
    const file = e.target.files[0] && e.target.files[0];
    if (file) {
      setFieldValue(name2, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFieldValue(reader.result);
          setBackgroundPicPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className=" flex flex-col md:flex-row md:gap-3">
        {/* cover pic upload div */}
        <div
          className=" flex-1"
          onClick={() => {
            document.getElementById("coverPic")?.click();
          }}
        >
          <label className="text-base font-semibold">{label1}</label>
          {/* upload */}
          <div
            className={`flex justify-start  items-start  gap-5 mt-3 mb-5 border border-gray-500 px-2 py-3 rounded-lg group transition-all hover:border-gray-200 cursor-pointer`}
          >
            {/* icon */}
            <input
              type="file"
              className="hidden"
              id="coverPic"
              onChange={handleCoverPicSelect}
            />
            <div className=" flex-1 flex justify-center items-center border border-dashed border-level-1 transition-all group-hover:border-solid w-full h-20 rounded-md">
              <IoMdImage className="block group-hover:hidden text-2xl transition-all duration-300" />
              <FiUpload className="hidden group-hover:block text-2xl transition-all duration-300" />
            </div>

            {/* content */}
            <div className=" flex-1 flex flex-col">
              <h3 className="text-[14px] font-semibold">
                Drag and drop or click to upload
              </h3>
            </div>
          </div>
          {coverPicPreview && (
            <img
              src={coverPicPreview}
              alt="Preview"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>

        {/* background image upload div */}
        <div
          className=" flex-1"
          onClick={() => {
            document.getElementById("backgroundPic")?.click();
          }}
        >
          <label className="text-base font-semibold">{label2}</label>
          {/* upload */}
          <div
            className={`flex justify-start  items-start  gap-5 mt-3 mb-5 border border-gray-500 px-2 py-3 rounded-lg group transition-all hover:border-gray-200 cursor-pointer`}
          >
            {/* icon */}
            <input
              type="file"
              className=" hidden"
              id="backgroundPic"
              onChange={handleBackgroundPicSelect}
            />
            <div className=" flex-1 flex justify-center items-center border border-dashed border-level-1 transition-all group-hover:border-solid w-full h-20 rounded-md">
              <IoMdImage className="block group-hover:hidden text-2xl" />
              <FiUpload className="hidden group-hover:block text-2xl" />
            </div>

            {/* content */}
            <div className=" flex-1 flex flex-col">
              <h3 className="text-[14px] font-semibold">
                Drag and drop or click to upload
              </h3>

              {/* <h3 className="text-[13px] font-extralight mt-2">
                File types allowed: JPG, PNG, SVG, or GIF
              </h3> */}
            </div>
          </div>
          {backgroundPicPreview && (
            <img
              src={backgroundPicPreview}
              alt="Preview"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ImageSection;
