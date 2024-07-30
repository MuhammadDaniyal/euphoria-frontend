import { IoMdImage } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { useFormik } from "formik";
import {
  CreateCelebrityProfileSchema,
  CreateFanProfileSchema,
} from "../../helpers/Validations/CreateProfileSchema";
import ValidationError from "../Shared/Validation/ValidationError";
import StyledButton from "../Shared/StyledButton";
import ImageSection from "../CreateCollection/ImageSection";
import { useNavigate, useParams } from "react-router-dom";
import { postForm, postJson } from "../../helpers/apiInstance";
import { setVoting, getAdd } from "../../helpers/functions/page";
import { useEffect } from "react";
import { errorToastify } from "../../utils/toast";

const initialValues = {
  profilePic: "",
  coverPic: "",
  backgroundPic: "",
  name: "",
  username: "",
  walletAddress: "",
  email: "",
  role: "",
  managerEmail: "",
  managerNumber: "",
  websiteURL: "",
  kycDocument: "",
};

const ProfileForm = ({ type }: { type: string }) => {
  const navigate = useNavigate();

  const param = useParams();
  const handleFileChange = async (e: any) => {
    setFieldValue(e.target.name, e.target.files[0]);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema:
      param.type === "celebrity"
        ? CreateCelebrityProfileSchema
        : CreateFanProfileSchema,
    onSubmit: async (values, action) => {
      const formData = new FormData();

      formData.append("profilePic", values.profilePic);

      formData.append("coverPic", values.coverPic);
      formData.append("backgroundPic", values.backgroundPic);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("walletAddress", values.walletAddress);
      formData.append("name", values.name);
      formData.append("role", param.type as any);
      if ((param.type as any) === "celebrity") {
        formData.append("managerEmail", values.managerEmail);
        formData.append("managerNumber", values.managerNumber);
        formData.append("websiteURL", values.websiteURL);
        formData.append("kycDocument", values.kycDocument);
      }

      try {
        //un coment above line and write down profile creation api below:
        const res = await postForm(
          `http://localhost:8000/api/profile`,
          formData
        );
        if (res) {
          if ((param.type as any) === "celebrity") {
            const trans = await setVoting();
            await trans.wait();
            console.log("Profile submitted successfully");
            const add = await getAdd();
            navigate(`/proposal/${add}`);
          } else {
            const add = await getAdd();
            navigate(`/profile/${add}`);
          }
        }
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
        console.error("Error submitting profile", error);
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const add = await getAdd();
        console.log("ADD==>", add);
        setFieldValue("walletAddress", add);
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

  return (
    <>
      {/* main div */}
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-6">
          <h3 className=" text-2xl md:text-4xl font-semibold mb-4">
            Create your Customized Page
          </h3>

          <div>
            <label className="text-base font-medium">Profile Pic</label>
            <div
              className="flex justify-center items-center gap-5 mt-3 mb-5 border border-gray-500 px-2 py-3 w-32 h-32 group transition-all hover:border-gray-200 cursor-pointer rounded-[50%]"
              onClick={() => {
                document.getElementById("profilePic")?.click();
              }}
            >
              <input
                type="file"
                name="profilePic"
                id="profilePic"
                className=" hidden"
                onChange={handleFileChange}
                onBlur={handleBlur}
              />
              <div className=" flex-1 flex justify-center items-center border border-dashed border-level-1 transition-all group-hover:border-solid w-28 h-28 rounded-[50%]">
                <IoMdImage className="block group-hover:hidden text-2xl transition-all duration-300" />
                <FiUpload className="hidden group-hover:block text-2xl transition-all duration-300" />
              </div>
            </div>
          </div>

          <ImageSection
            name1="coverPic"
            name2="backgroundPic"
            firstimg={values.backgroundPic}
            secondimg={values.coverPic}
            setFieldValue={setFieldValue}
            label1={"Cover Pic (Optional)"}
            label2={"Background Pic (Optional)"}
          />

          <div className={`flex gap-3`}>
            {/* first input */}
            <div className="flex-1">
              <label className="text-base font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={values.name}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="name"
              />
            </div>

            {/* second input */}
            <div className={`flex-1`}>
              <label className="text-base font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={values.username}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="username"
              />
            </div>
          </div>

          {/* wallet address */}
          <div className={`flex-1`}>
            <label className="text-base font-medium">Wallet Address</label>
            <input
              disabled={true}
              type="text"
              placeholder="Enter your Metamask wallet address"
              name="walletAddress"
              value={values.walletAddress}
              className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ValidationError
              errors={errors}
              touched={touched}
              fieldName="walletAddress"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-base font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="email"
              />
            </div>
          </div>

          {type === "celebrity" && (
            <>
              <div className={`flex gap-2`}>
                <div className="flex-1">
                  <label className="text-base font-medium">Manager email</label>
                  <input
                    type="email"
                    placeholder="Enter your manager email"
                    name="managerEmail"
                    value={values.managerEmail}
                    className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ValidationError
                    errors={errors}
                    touched={touched}
                    fieldName="managerEmail"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-base font-medium">
                    Manager number
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your manager number"
                    name="managerNumber"
                    value={values?.managerNumber}
                    className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ValidationError
                    errors={errors}
                    touched={touched}
                    fieldName="managerNumber"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-base font-medium">Website URL</label>
                <input
                  type="text"
                  placeholder="Enter your Website URL"
                  name="websiteURL"
                  value={values.websiteURL}
                  className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ValidationError
                  errors={errors}
                  touched={touched}
                  fieldName="websiteURL"
                />
              </div>

              <div className="flex-1">
                <label className="text-base font-medium">
                  KYC (Know Your Customer) Documents
                </label>
                <input
                  type="file"
                  placeholder="Enter your Website URL"
                  name="kycDocument"
                  className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                />
                <ValidationError
                  errors={errors}
                  touched={touched}
                  fieldName="kycDocument"
                />
              </div>
            </>
          )}

          <StyledButton
            heading="Submit"
            bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
            width={150}
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
