import { PlayerSliceType } from "./interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PlayerSliceType = {
  countryCode: "",
  playerAvatar: "https://robohash.org/1753?set=set5",
  playerInvest: 20,
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCountryCode: (state, action) => {
      return {
        ...state,
        countryCode: action.payload,
      };
    },
    setPlayerAvatar: (state, action) => {
      return {
        ...state,
        playerAvatar: action.payload,
      };
    },
    setPlayerInvest: (state, action) => {
      return {
        ...state,
        playerInvest: action.payload,
      };
    },
  },
});
export const {
  setCountryCode,
  setPlayerAvatar,
  setPlayerInvest,
} = playerSlice.actions;
export default playerSlice.reducer;
