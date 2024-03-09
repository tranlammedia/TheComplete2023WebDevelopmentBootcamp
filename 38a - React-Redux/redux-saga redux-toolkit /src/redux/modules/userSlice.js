import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isLoading: false,
    },
    reducers: {
        getUsersFetch: (state) => {
            state.isLoading = true;
        },
        getUsersSuccess: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export const { getUsersFetch, getUsersSuccess, getUsersFailure } =
    userSlice.actions;
export default userSlice.reducer;
