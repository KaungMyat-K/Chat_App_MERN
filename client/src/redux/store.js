import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { loaderSlice, userSlice },
});
