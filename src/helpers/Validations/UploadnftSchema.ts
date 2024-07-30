import * as Yup from "yup";
type UploadNFT = Yup.InferType<typeof UploadnftSchema>;

export const UploadnftSchema = Yup.object({
  productName: Yup.string().required("Please enter the Product name"),
  basePriceDollars: Yup.number().required("Please enter your Product base price"),
  basePriceETH: Yup.number(),
  creatorEarning: Yup.number().required("Please enter the earning percentage"),
  startDate: Yup.date().required("Please enter the bidding start date"),
  endDate: Yup.date().required("Please enter the bidding end date"),
  // description: Yup.string().required("Please enter the Product description"),
});
