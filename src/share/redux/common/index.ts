import { CommonSliceType } from "./interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CommonSliceType = {
  currentLanguage: "en",
};
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    },
  },
});
export const { setCurrentLanguage } = commonSlice.actions;
export default commonSlice.reducer;
