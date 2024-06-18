import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "@/redux/slices/postSlice";
import {
  DELETING_POST_FAIL,
  DELETING_POST_PENDING,
  DELETING_POST_SUCCESS,
} from "@/redux/constants/postConstants";
import { FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import { clearStatus } from "@/redux/slices/postSlice";

function DeletePost({ postId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.post);

  const deleteHandler = () => {
    dispatch(deletePost(postId));
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (status === DELETING_POST_SUCCESS) {
      toast.success("Post deleted successfully");
      dispatch(clearStatus());
      setOpen(false);
    } else if (status === DELETING_POST_FAIL) {
      toast.error(error);
      dispatch(clearStatus());
      setOpen(false);
    }
  }, [status]);

  return (
    <MyDialog
      open={open}
      onOpenChange={(state) => setOpen(state)}
      dialogTrigger={
        <button className="text-red-500 ">
          <AiFillDelete size={30} />
        </button>
      }
    >
      <p className="text-center font-bold text-xl text-red-500">
        Are you sure you want to delete this post
      </p>
      <FaExclamationTriangle className="mx-auto" size={60} color="red" />
      <div className="flex justify-center gap-10 mt-10">
        <Button
          variant="destructive-outline"
          onClick={deleteHandler}
          disabled={status === DELETING_POST_PENDING}
        >
          {status === DELETING_POST_PENDING ? "Deleting..." : "Delete"}
        </Button>
        {status !== DELETING_POST_PENDING && (
          <Button onClick={cancelHandler}>Cancel</Button>
        )}
      </div>
    </MyDialog>
  );
}

export default DeletePost;
