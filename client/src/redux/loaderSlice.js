import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hiddenLoader: (state) => {
      state.loader = false;
    },
  },
});

export const { showLoader, hiddenLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
