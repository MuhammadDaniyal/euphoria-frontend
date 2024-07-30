import { configureStore } from "@reduxjs/toolkit";
import createCollectionSlice from "../slices/createCollection";
import createPageSlice from "../slices/createPage";

export const store = configureStore({
  reducer: {
    createpage: createPageSlice,
    createcollection: createCollectionSlice,
  },
});
