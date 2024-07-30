import { Users } from "../../data";
import { createSlice, nanoid, current } from "@reduxjs/toolkit";

const initialState = {
  users: Users,
};

const createPageSlice = createSlice({
  name: "createpage",
  initialState,
  reducers: {
    addPage: (state, action) => {
      // console.log(action.payload);

      // console.log("state", current(state.users));
      state.users.push(action.payload);
      // console.log("state after fill", current(state.users));
    },
  },
});

export default createPageSlice.reducer;
export const { addPage } = createPageSlice.actions;
