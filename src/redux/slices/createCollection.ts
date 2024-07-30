import { AllCollections } from "../../data";
import { createSlice, nanoid, current } from "@reduxjs/toolkit";

const initialState = {
  collections: AllCollections,
};

const createCollectionSlice = createSlice({
  name: "createcollection",
  initialState,
  reducers: {
    createCollection: (state, action) => {
      // console.log(action.payload);

      // console.log("state", current(state.collections));
      state.collections.push(action.payload);
      // console.log("state after fill", current(state.collections));
    },
  },
});

export default createCollectionSlice.reducer;
export const { createCollection } = createCollectionSlice.actions;
