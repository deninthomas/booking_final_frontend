import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

export const loadingStateSlice = createSlice({
    name: "loaderStates",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setIsLoading } = loadingStateSlice.actions;
export const selectAppLoading = (state) => state.appLoadingReducer.isLoading

export default loadingStateSlice.reducer;
