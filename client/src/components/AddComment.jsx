import React, { useState } from "react";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { FaRegComment } from "react-icons/fa";
import { addCommentApi } from "@/redux/api/commentApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddComment({ totalComment, postId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const commentHandler = async (ev) => {
    ev.preventDefault();
    if(comment==="") return;
    setLoading(true);
    try {
      await addCommentApi({ postId, content:comment });
      navigate(`/post/${postId}`);
    } catch (err) {
        
        toast.error(err.message);
    } finally {
      setOpen(false);
      setLoading(false);
      setComment("");
    }
  };

  return (
    <MyDialog
      open={open}
      setOpen={setOpen}
      dialogTrigger={
        <Button variant="ghost" className="rounded-full space-x-2">
          <FaRegComment size={24} />
          <p>{totalComment}</p>
        </Button>
      }
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={commentHandler}
      >
        <textarea
          placeholder="say something..."
          className="w-[85%] px-2 py-3"
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
        />
        <div className="space-x-5">
          <Button type="submit" disabled={loading}>
            {loading ? "Commenting.." : "Comment"}
          </Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default AddComment;
