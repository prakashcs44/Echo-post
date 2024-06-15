import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, registerApi,getLoggedInUserApi, updateProfileApi } from "../api/authApi";




export const login = createAsyncThunk("users/login", loginApi);
export const register = createAsyncThunk("users/register", registerApi);
export const logout = createAsyncThunk("users/logout", logoutApi);
export const getLoggedInUser = createAsyncThunk("users/getLoggedInUser",getLoggedInUserApi);
export const updateProfile = createAsyncThunk("users/updateProfile",updateProfileApi);

const initialState = {
    isAuthenticated: false,
    userData: {},
    error: "",
    status: "idle", // idle, pending, success, fail
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = "idle";
            state.error = "";
        },
        updateFollowing:(state,action)=>{
            state.userData.following = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = "";
                state.status = "success";
                state.userData = action.payload.user;
                
            })
            .addCase(login.pending, (state) => {
                state.status = "pending";
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.status = "fail";
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = "pending";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = "";
                state.status = "success";
                state.userData = action.payload.user;
              
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.status = "fail";
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.status = "pending";
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.error = "";
                state.status = "success";
                state.userData = {};
            })
            .addCase(logout.rejected, (state) => {
                state.status = "fail";
            })
            .addCase(getLoggedInUser.pending,(state)=>{
                state.status = "pending";
            })
            .addCase(getLoggedInUser.fulfilled,(state,action)=>{
                state.isAuthenticated = true;
                state.error = "";
                state.status = "success";
                state.userData = action.payload.user;
               
            })
            .addCase(getLoggedInUser.rejected,(state,action)=>{
                state.isAuthenticated = false;
                state.status = "fail";
                state.error = action.error.message;
            })
            .addCase(updateProfile.pending,(state,action)=>{
                state.status = "pending";
            })
            .addCase(updateProfile.fulfilled,(state,action)=>{
                state.status = "success";
                state.userData = action.payload.user;
            })
            .addCase(updateProfile.rejected,(state,action)=>{
                state.status = "fail";
            })
           
            
    },
});

export const { clearStatus,updateFollowing } = authSlice.actions;
export default authSlice.reducer;
