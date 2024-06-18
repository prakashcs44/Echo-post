import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPostApi, deletePostApi, getAllPostApi} from "../api/postApi";
import { ADDING_POST_FAIL, ADDING_POST_PENDING, ADDING_POST_SUCCESS, DELETING_POST_FAIL, DELETING_POST_PENDING, DELETING_POST_SUCCESS, GETTING_POSTS_FAIL, GETTING_POSTS_PENDING, GETTING_POSTS_SUCCESS } from "../constants/postConstants";




export const getAllPost = createAsyncThunk("post/getAllPost",getAllPostApi);
export const addPost = createAsyncThunk("post/addPost",addPostApi);
export const deletePost = createAsyncThunk("post/deletePost",deletePostApi);

const initialState = {
  status:"idle",
  error:"",
  posts:[],   
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        clearStatus(state){
            state.status = "idle";
            state.error = "";
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllPost.pending,(state,action)=>{
            state.status = GETTING_POSTS_PENDING;
        })
        .addCase(getAllPost.fulfilled,(state,action)=>{
            state.status = GETTING_POSTS_SUCCESS;
            state.posts = action.payload.posts;
        })
        .addCase(getAllPost.rejected,(state,action)=>{
            state.status = GETTING_POSTS_FAIL;
            state.posts = [];
            state.error = action.error.message;
        })
        .addCase(addPost.pending,(state,action)=>{
            state.status = ADDING_POST_PENDING;
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            state.status = ADDING_POST_SUCCESS;
            state.posts = [action.payload.post,...state.posts];
        })
        .addCase(addPost.rejected,(state,action)=>{
            state.status = ADDING_POST_FAIL;
            state.error = action.error.message;
        })
        .addCase(deletePost.pending,(state,action)=>{
            state.status = DELETING_POST_PENDING;
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.status = DELETING_POST_SUCCESS;
            state.posts = state.posts.filter(post=>post._id!==action.payload.id);
        })
        .addCase(deletePost.rejected,(state,action)=>{
            state.status = DELETING_POST_FAIL;
            state.error = action.error.message;
        })

    }
})


export const { clearStatus } = postSlice.actions;
export default postSlice.reducer;