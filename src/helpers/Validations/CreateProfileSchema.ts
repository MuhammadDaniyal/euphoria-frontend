import * as Yup from "yup";
// type createCelebrityProfile = Yup.InferType<
//   typeof CreateCelebrityProfileSchema
// >;
// type createFanProfile = Yup.InferType<typeof CreateFanProfileSchema>;

export const CreateCelebrityProfileSchema = Yup.object({
  // id: Yup.string(),
  profilePic: Yup.string(),
  coverPic: Yup.string(),
  backgroundPic: Yup.string(),
  role: Yup.string(),
  name: Yup.string().required("Please enter the your name"),
  username: Yup.string().required("Please enter the your user name"),
  walletAddress: Yup.string().required("Please enter the your wallet address"),
  email: Yup.string().email().required("Please enter the your email"),
  managerEmail: Yup.string().email(),
  managerNumber: Yup.number(),
  websiteURL: Yup.string(),
  kycDocument: Yup.string(),
});

export const CreateFanProfileSchema = Yup.object({
  // id: Yup.string(),
  profilePic: Yup.string(),
  coverPic: Yup.string(),
  backgroundPic: Yup.string(),
  role: Yup.string(),
  name: Yup.string().required("Please enter the your name"),
  username: Yup.string().required("Please enter the your user name"),
  walletAddress: Yup.string().required("Please enter the your wallet address"),
  email: Yup.string().email().required("Please enter the your email"),
});
