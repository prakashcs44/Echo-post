import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPostApi, deletePostApi, getAllPostApi, getPostApi} from "../api/postApi";
import { ADDING_POST_FAIL, ADDING_POST_PENDING, ADDING_POST_SUCCESS, DELETING_POST_FAIL, DELETING_POST_PENDING, DELETING_POST_SUCCESS, GETTING_POSTS_FAIL, GETTING_POSTS_PENDING, GETTING_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POSTS_PENDING, GET_POSTS_SUCCESS } from "../constants/postConstants";




export const getAllPost = createAsyncThunk("post/getAllPost",getAllPostApi);
export const addPost = createAsyncThunk("post/addPost",addPostApi);
export const deletePost = createAsyncThunk("post/deletePost",deletePostApi);
export const getPost = createAsyncThunk("post/getPost",getPostApi);

const initialState = {
  status:"idle",
  error:"",
  posts:[],   
  loading:false,
  currentPost:null,
  hasMore:true
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        clearStatus(state){
            state.status = "idle";
            state.error = "";
            state.loading = false;
        },
        resetPosts(state){
            state.posts = [];
            state.hasMore = true;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllPost.pending,(state,action)=>{
            state.status = GETTING_POSTS_PENDING;
            state.loading = true;
        })
        .addCase(getAllPost.fulfilled,(state,action)=>{
            state.status = GETTING_POSTS_SUCCESS;
            state.posts = [...state.posts,...action.payload.posts];
           
            state.loading = false;
            state.hasMore = action.payload.hasMore;
        })
        .addCase(getAllPost.rejected,(state,action)=>{
            state.status = GETTING_POSTS_FAIL;
            state.posts = [];
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(addPost.pending,(state,action)=>{
            state.status = ADDING_POST_PENDING;
            state.loading = true;
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            state.status = ADDING_POST_SUCCESS;
            state.posts = [action.payload.post,...state.posts];
            state.loading = false;
        })
        .addCase(addPost.rejected,(state,action)=>{
            state.status = ADDING_POST_FAIL;
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(deletePost.pending,(state,action)=>{
            state.status = DELETING_POST_PENDING;
            state.loading = true;
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.status = DELETING_POST_SUCCESS;
            state.posts = state.posts.filter(post=>post._id!==action.payload.id);
            state.loading = false;
            state.currentPost = null;
        })
        .addCase(deletePost.rejected,(state,action)=>{
            state.status = DELETING_POST_FAIL;
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getPost.pending,(state,action)=>{
           state.status = GET_POSTS_PENDING;

        })
        .addCase(getPost.fulfilled,(state,action)=>{
            state.status = GET_POSTS_SUCCESS;
            state.currentPost = action.payload.post;
        })
        .addCase(getPost.rejected,(state,action)=>{
            state.status = GET_POSTS_FAIL;
        })

    }
})


export const { clearStatus,resetPosts } = postSlice.actions;
export default postSlice.reducer;