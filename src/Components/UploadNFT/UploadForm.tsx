import React, { useEffect, useState } from "react";
import {
  mintAuc,
  getImage,
  uploadImage,
  formatEth,
  priceEth,
  toEpochtime_E,
  toEpochtime_S,
  toPinata,
  getpinata,
  scientificToDecimal,
} from "../../helpers/functions/page";
import StyledButton from "../Shared/StyledButton";
import { useFormik } from "formik";
import { UploadnftSchema } from "../../helpers/Validations/UploadnftSchema";
import ValidationError from "../Shared/Validation/ValidationError";
import { errorToastify, succesToastify } from "../../utils/toast";
import { getUSD } from "../../helpers/apiInstance";

type cRate=
  {
    USD:number;
    BTC:number;
  }

const initialValues = {
  productName: "",
  basePriceDollars: "",
  basePriceETH: "",
  creatorEarning: "",
  startDate: "",
  endDate: "",
  description: "",
};
interface UploadFormProps {
  file: File | null;
  loop: any;
  coll: any;
  cat: any;
  modalOpen: any;
}

const UploadForm: React.FC<UploadFormProps> = ({
  file,
  loop,
  coll,
  cat,
  modalOpen,
}) => {
  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: UploadnftSchema,

    onSubmit: async (values, action) => {
      // const val=mintAuc()
      try {
        loop(1);
        modalOpen(true);
        console.log("file==>",file && file?.type)

        const val = await toPinata(file, values.description); // nft.storge

        loop(2);
        const url = getpinata(val)
        loop(3);
        const st = await mintAuc(
          val.IpfsHash,
          values.basePriceDollars,
          toEpochtime_E(values.endDate),
          toEpochtime_S(values.startDate),
          values.productName,
          url,
          cat,
          coll,
          values.creatorEarning,
          file?.type,

        );
        loop(4);
        action.resetForm();
        loop(0);
        succesToastify("NFT Uploaded Successfully")
      } catch (error) {

        modalOpen(false)
        if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
        else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
        else { if (error) { errorToastify("error see console") } }
        console.log("nft upload-->", String(error));
        errorToastify("err")
      }
    },
  });
  const [usd, setUSD] = useState<number>(0)


  useEffect(() => {
    const fetchData =async () => {
      const conv: cRate = await getUSD()
      setUSD(conv?.USD)
    }
    fetchData()
  },[])



  return (
    <>
      {/* main div */}
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-6">
          {/* first input */}
          <div>
            <label className="text-base font-medium">NFT Name</label>
            <input
              type="text"
              placeholder="e.g. Digital Awesome Game"
              name="productName"
              value={values.productName}
              className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ValidationError
              errors={errors}
              touched={touched}
              fieldName="productName"
            />
          </div>

          {/* Price */}
          <div className=" flex gap-4">
            {/* Price in $ */}
            <div className="flex-1">
              <label className="text-base font-medium">Base Price in ETH</label>
              <input
                type="number"
                placeholder="e.g. 20$ "
                name="basePriceDollars"
                value={values.basePriceDollars}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={(e) => {
                  const dollarValue = e.target.value;
                  setValues((prevValues) => ({
                    ...prevValues,
                    basePriceDollars: dollarValue,
                    basePriceETH: (parseFloat(dollarValue) * 0.000379).toFixed(
                      2
                    ),
                  }));
                }}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="basePriceDollars"
              />
            </div>
            {/* Price in Eth */}
            <div className="flex-1">
              <label className="text-base font-medium">Base Price in $</label>
              <input
                type="number"
                disabled
                name="basePriceETH"
                value={Number(scientificToDecimal(values.basePriceDollars)*usd)}
                className=" collectionforminput disabled rounded-lg w-full text-sm font-extralight placeholder:text-white placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Royalty */}
          <div className="flex-1">
            <label className="text-base font-medium">Creator Earning</label>
            <input
              type="number"
              placeholder="e.g 0%-5%"
              name="creatorEarning"
              value={values.creatorEarning}
              className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ValidationError
              errors={errors}
              touched={touched}
              fieldName="creatorEarning"
            />
          </div>

          {/* Date */}
          <div className=" flex gap-4">
            {/* Start Date */}
            <div className="flex-1">
              <label className="text-base font-medium">Start Date</label>
              <input
                type="date"
                placeholder=""
                name="startDate"
                value={values.startDate}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="startDate"
              />
            </div>
            {/* End Date */}
            <div className="flex-1">
              <label className="text-base font-medium">End Date</label>
              <input
                type="date"
                placeholder=""
                name="endDate"
                value={values.endDate}
                className=" collectionforminput rounded-lg w-full placeholder:text-white text-sm font-extralight placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none mt-3"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="endDate"
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="text-base font-medium">Description</label>

            <div className=" mt-3">
              <textarea
                name="description"
                id=""
                placeholder="e.g. After purchasing the product you can get item..."
                cols={5}
                rows={5}
                value={values.description}
                className="rounded-lg w-full text-sm font-extralight placeholder:text-white placeholder:text-[13px] placeholder:font-extralight placeholder:tracking-wide focus:outline-none collectionforminput"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ValidationError
                errors={errors}
                touched={touched}
                fieldName="description"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-4 md:mt-0 flex gap-5 w-full">
            <StyledButton
              heading="Preview"
              bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
              width={250}
            />
            <StyledButton
              heading="Submit"
              bgColor="linear-gradient(103deg, #E2257A 0%, #563BDA 100%)"
              width={250}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadForm;
