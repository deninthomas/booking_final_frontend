import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  search: "",
  filters: [],
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = productSlice.actions;

export default productSlice.reducer;
