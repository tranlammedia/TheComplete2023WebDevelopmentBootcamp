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
            state.users = action.payload
            state.isLoading = false;
        },
        getUsersFailure: (state) => {
            state.isLoading = false;
        }
    },
});

export const {getUsersFetch, getUsersSuccess, getUsersFailure} = userSlice.actions;
export default userSlice.reducer;
