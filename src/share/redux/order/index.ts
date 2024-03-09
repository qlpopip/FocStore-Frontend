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
    clearOrders: (state) => {
      state.orders = initialState.orders
    },
  },
});
export const { setOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
