import * as Yup from "yup";
type createCollection = Yup.InferType<typeof CreateCollectionSchema>;

export const CreateCollectionSchema = Yup.object({
  logoImage: Yup.string(),
  coverImage: Yup.string(),
  name: Yup.string().required("Please enter the Collection name"),
  description: Yup.string().required("Please enter the Collection description"),
  Listings: Yup.array(),
  // tag: Yup.string().required("Please select the Collection tag"),
  category: Yup.string().required("Please select the Collection category"),
});
