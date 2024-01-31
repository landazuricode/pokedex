import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: 4,
  reducers: {
    getItem: (state, action) => action.payload,
  },
});

export const { getItem } = itemSlice.actions;
export default itemSlice.reducer;
