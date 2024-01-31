import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: false,
  reducers: {
    getTheme: (state) => !state,
  },
});

export const { getTheme } = themeSlice.actions;
export default themeSlice.reducer;
