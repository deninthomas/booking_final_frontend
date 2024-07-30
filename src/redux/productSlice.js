import { createSlice, original } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  search: "",
  filters: [],
  formData: {
    name: "",
    price: "",
    place: "",
    description: "",
  },
  wishList: [],
  currentEntityView: null,
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setFormState: (state, action) => {
      state.formData = { ...state.formData, [action.payload.key]: action.payload.value };
    },
    setForm: (state, action) => {
      state.formData = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload.value;
    },
    setCurrentEntity: (state, action) => {
      state.currentEntityView = action.payload
    },
  },
});

export const { setList, setFormState, setForm,setWishList, setCurrentEntity } =
  productSlice.actions;
export const selectFormState = (state) => state.productReducer.formData;
export const selectWishList = (state) => state.productReducer.wishList;
export const selectList = (state) => state.productReducer.list;
export const selectCurrentEntity = (state) =>
  state.productReducer.currentEntityView;

export default productSlice.reducer;
