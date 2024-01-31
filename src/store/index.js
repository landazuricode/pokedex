import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme.slice";
import name from "./slices/name.slice";
import item from "./slices/item.slice";

export default configureStore({
  reducer: {
    theme,
    name,
    item,
  },
});
