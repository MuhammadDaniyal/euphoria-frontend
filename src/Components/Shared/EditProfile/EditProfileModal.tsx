import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import StyledButton from "../StyledButton";
import { useFormik } from "formik";
import { patchJsonUrl, getJson } from "../../../helpers/apiInstance";
import { succesToastify } from "../../../utils/toast";
import noImage from "../../../assets/images/no-image.jpg";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const EditProfileModal = ({
  open,
  setOpen,
  cancelButtonRef,
  profileInfo,
  setPdata,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<any>();
  const [coverPic, setCoverPic] = useState<any>();
  const [backgroundPic, setBackgroundPic] = useState<any>();
  const { userid } = useParams();
  const data = window.localStorage.getItem("walletId");
  let walletAddress: any;
  if (data) {
    const walletData = JSON.parse(data);
    walletAddress = walletData.walletAddress;
  }

  const initialValues = {
    profilePic: "",
    coverPic: "",
    backgroundPic: "",
    name: "",
    email: "",
    managerEmail: "",
    managerNumber: "",
    websiteURL: "",
  };

  const getProfileData = async () => {
    const response = await getJson(
      `http://localhost:8000/api/profile/${
        profileData && profileData.walletAddress
      }`
    );
    setPdata(response);
  };

  useEffect(() => {
    if (profileInfo) {
      setProfileData(profileInfo);
    }
    setProfilePic(
      profileInfo && profileInfo.profilePic ? profileInfo.profilePic : noImage
    );
    setCoverPic(
      profileInfo && profileInfo.coverPic ? profileInfo.coverPic : noImage
    );
    setBackgroundPic(
      profileInfo && profileInfo.backgroundPic
        ? profileInfo.backgroundPic
        : noImage
    );
  }, [profileInfo]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: { ...profileInfo },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append("profilePic", values.profilePic);
      formData.append("coverPic", values.coverPic);
      formData.append("backgroundPic", values.backgroundPic);
      formData.append("email", values.email);
      formData.append("name", values.name);
      if (profileData && profileData.role === "celebrity") {
        formData.append("managerEmail", values.managerEmail);
        formData.append("managerNumber", values.managerNumber);
        formData.append("websiteURL", values.websiteURL);
      }
      setLoading(true);
      try {
        const res = await patchJsonUrl(
          `http://localhost:8000/api/profile/${profileData.walletAddress}/update`,
          formData
        );
        if (res) {
          setOpen(false);
          setIsEdit(false);
          setLoading(false);
          succesToastify("Profile Updated Succesfully");
          getProfileData();
        }
      } catch (error) {
        setLoading(false);
        console.error("Error updating profile", error);
      }
    },
  });

  const handleFileChange = async (e: any, fieldName: string) => {
    const file = e.target.files[0] && e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // console.log("Reader", typeof reader.result);
          fieldName === "profilePic"
            ? setProfilePic(reader.result)
            : fieldName === "coverPic"
            ? setCoverPic(reader.result)
            : setBackgroundPic(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99999]"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative flex flex-col md:gap-3 gap-1 py-5 px-5 md:px-10 pb-6 transform rounded-2xl bg-[#000B26] text-left shadow-xl transition-all 2xl:w-[40vw] xl:w-[32vw] md:w-[50vw] md:h-[95vh] h-full w-full overflow-auto scroll-marketplace-dropdown overflow-x-hidden text-white">
                <div className="flex justify-between items-center">
                  <div className=" flex items-center gap-3">
                    <h3 className="text-3xl font-semibold">About</h3>
                    {walletAddress && walletAddress == userid && (
                      <div
                        className="bg-[#518EFF] rounded-md flex gap-2 justify-center items-center px-[6px] py-[6px] cursor-pointer"
                        onClick={() => {
                          setIsEdit((prev) => !prev);
                        }}
                      >
                        {isEdit && (
                          <span className=" text-xs font-medium text-white">
                            Editing...
                          </span>
                        )}
                        <FiEdit className="text-base text-white" />
                      </div>
                    )}
                  </div>
                  <IoClose
                    className="text-2xl text-white cursor-pointer"
                    onClick={closeModal}
                  />
                </div>
                {loading ? (
                  <Loader classname="h-[400px]" />
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* profile pic */}
                    <div className="flex-1">
                      <label className="text-base font-medium">
                        Profile Photo
                      </label>
                      <div
                        className="relative flex justify-center items-center gap-5 mt-3 mb-5 border border-gray-500 w-32 h-32 group transition-all hover:border-gray-200 cursor-pointer rounded-full overflow-hidden"
                        onClick={() => {
                          isEdit &&
                            document.getElementById("profilePic")?.click();
                        }}
                      >
                        <input
                          type="file"
                          name="profilePic"
                          id="profilePic"
                          className="hidden"
                          accept=".png, .jpg, .jpeg, .gif"
                          onChange={(e) => {
                            handleFileChange(e, "profilePic");
                          }}
                        />
                        <img
                          className="absolute w-32 h-32 object-fill object-center"
                          src={profilePic}
                          alt=""
                        />
                        {isEdit && (
                          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaPencilAlt />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" flex md:flex-row gap-4 flex-col  md:justify-center justify-start md:items-center  items-start p-3">
                      {/* cover pic */}
                      <div className="flex-1">
                        <label className="text-base font-medium">
                          Cover Photo
                        </label>
                        <div
                          className={`relative flex justify-start items-start gap-5 mt-3 mb-5 border border-gray-500 px-2 py-3 rounded-lg group transition-all hover:border-gray-200 cursor-pointer md:h-32 h-28 md:w-44 w-40
                            `}
                          onClick={() => {
                            isEdit &&
                              document.getElementById("coverPic")?.click();
                          }}
                        >
                          {/* icon */}
                          <input
                            type="file"
                            className="hidden"
                            id="coverPic"
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={(e) => {
                              handleFileChange(e, "coverPic");
                            }}
                          />

                          <img
                            className="w-full h-full object-cover object-center rounded-lg"
                            src={coverPic}
                            alt=""
                          />
                          {isEdit && (
                            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <FaPencilAlt />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* background pic */}
                      <div className="flex-1">
                        <label className="text-base font-medium">
                          Background Photo
                        </label>
                        <div
                          className={`relative flex justify-start items-start gap-5 mt-3 mb-5 border border-gray-500 px-2 py-3 rounded-lg group transition-all hover:border-gray-200 cursor-pointer md:h-32 h-28 md:w-44 w-40`}
                          onClick={() => {
                            isEdit &&
                              document.getElementById("backgroundPic")?.click();
                          }}
                        >
                          {/* icon */}
                          <input
                            type="file"
                            className="hidden"
                            id="backgroundPic"
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={(e) => {
                              handleFileChange(e, "backgroundPic");
                            }}
                          />

                          <img
                            className="w-full h-full object-cover object-center rounded-lg"
                            src={backgroundPic}
                            alt=""
                          />
                          {isEdit && (
                            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <FaPencilAlt />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="text-base font-medium">Name</label>
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        name="name"
                        disabled={!isEdit}
                        value={values.name}
                        className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-base font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        name="email"
                        disabled={!isEdit}
                        value={values.email}
                        className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {profileData && profileData.role === "celebrity" && (
                      <>
                        <div className="flex-1">
                          <label className="text-base font-medium">
                            Manager Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your manager email"
                            name="managerEmail"
                            disabled={!isEdit}
                            value={values.managerEmail}
                            className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-base font-medium">
                            Manager Number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter your manager number"
                            name="managerNumber"
                            disabled={!isEdit}
                            value={values.managerNumber}
                            className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-base font-medium">
                            Website URL
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your website url"
                            name="websiteURL"
                            disabled={!isEdit}
                            value={values.websiteURL}
                            className="collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </>
                    )}
                    {isEdit && (
                      <StyledButton
                        heading="Update"
                        bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
                        classname=" w-full py-2 mt-2"
                        onClick={handleSubmit}
                      />
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditProfileModal;
