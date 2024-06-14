import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPostApi, getAllPostApi} from "../api/postApi";




export const getAllPost = createAsyncThunk("post/getAllPost",getAllPostApi);
export const addPost = createAsyncThunk("post/addPost",addPostApi);

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
            state.status = "pending";
        })
        .addCase(getAllPost.fulfilled,(state,action)=>{
            state.status = "success";
            state.posts = action.payload.posts;
        })
        .addCase(getAllPost.rejected,(state,action)=>{
            state.status = "fail";
            state.posts = [];
            state.error = action.error.message;
        })
        .addCase(addPost.pending,(state,action)=>{
            state.status = "pending";
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            state.status = "success";
            state.posts = [...state.posts,action.payload.post];
        })

    }
})


export const { clearStatus } = postSlice.actions;
export default postSlice.reducer;