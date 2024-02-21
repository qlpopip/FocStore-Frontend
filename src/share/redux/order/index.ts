import { OrderSliceType } from "./interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrderSliceType = {
  orders: [],
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
});
export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
