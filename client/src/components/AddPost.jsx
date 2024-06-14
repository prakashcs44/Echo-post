import React, { useEffect, useState } from "react";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addPost,clearStatus } from "@/redux/slices/postSlice";
import toast from "react-hot-toast";


function AddPost() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { status, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const sharePostHandler = async (ev) => {
    ev.preventDefault();
    if (content === "") return;
    dispatch(addPost({ content }));
    setContent("");
  };

  useEffect(()=>{
   if(status==="success"||status==="fail"){
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
          <Button type="submit" disabled={status === "pending"}>
            {status === "pending" ? "Sharing.." : "Share"}
          </Button>
          <Button
            type="button"
            variant="destructive-outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default AddPost;
