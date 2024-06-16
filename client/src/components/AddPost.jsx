import React, { useEffect, useState } from "react";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addPost,clearStatus } from "@/redux/slices/postSlice";
import { ADDING_POST_FAIL, ADDING_POST_PENDING, ADDING_POST_SUCCESS } from "@/redux/constants/postConstants";



function AddPost() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const sharePostHandler = async (ev) => {
    ev.preventDefault();
    if (content === "") return;
    dispatch(addPost({ content }));
    setContent("");
  };


 

  useEffect(()=>{
   if(status===ADDING_POST_SUCCESS||status===ADDING_POST_FAIL){
    setOpen(false);
    dispatch(clearStatus());
   
   }
   
  },[status])

  return (
    <MyDialog
      open={open}
      setOpen={setOpen}
      dialogTrigger={<Button className="mt-10 w-32 rounded-lg">Post</Button>}
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={sharePostHandler}
      >
        <textarea
          placeholder="Whats on your mind?"
          className="w-[85%] px-2 py-3"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <div className="space-x-5">
          <Button type="submit" disabled={status === ADDING_POST_PENDING}>
            {status === ADDING_POST_PENDING ? "Sharing.." : "Share"}
          </Button>
         
        </div>
      </form>
    </MyDialog>
  );
}

export default AddPost;
