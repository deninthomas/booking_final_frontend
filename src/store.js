import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/productSlice";
import appConfigReducer from "./redux/appConfigurationSlice";
import appLoadingReducer from "./redux/loaderSlice";


export default configureStore({
  reducer: {
    productReducer,
    appConfigReducer,
    appLoadingReducer
  },
});
