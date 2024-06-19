import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch} from "react-redux";
import { deletePost } from "@/redux/slices/postSlice";


function DeletePost({ postId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deletePost(postId));
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  return (
    <MyDialog
      open={open}
      onOpenChange={(state) => setOpen(state)}
      dialogTrigger={
        <button className="text-red-500 ">
          <AiFillDelete size={24} />
        </button>
      }
    >
      <p className="text-center font-bold text-xl text-red-500">
        Are you sure you want to delete this post
      </p>
    
      <div className="flex justify-center gap-10 mt-10">
        <Button variant="destructive-outline" onClick={deleteHandler}>
          Delete
        </Button>

        <Button onClick={cancelHandler}>Cancel</Button>
      </div>
    </MyDialog>
  );
}

export default DeletePost;
