import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: true,
    isAuthenticated : false,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsAuthenticated : (state,action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAdmin , setIsAuthenticated } = appConfigSlice.actions;
export const selectIsAdmin = (state) => state.appConfigReducer.isAdmin;
export const selectIsAuthenticated = (state) => state.appConfigReducer.isAuthenticated

export default appConfigSlice.reducer;
