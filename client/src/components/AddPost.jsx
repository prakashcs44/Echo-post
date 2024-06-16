import React, { useEffect, useState } from "react";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addPost, clearStatus } from "@/redux/slices/postSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  ADDING_POST_FAIL,
  ADDING_POST_PENDING,
  ADDING_POST_SUCCESS,
} from "@/redux/constants/postConstants";

function AddPost() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const sharePostHandler = async (ev) => {
    ev.preventDefault();
    if (content === "") return;
    dispatch(addPost({ content,file }));
    setContent("");
    setFile(null);
  };

  const onFileChange = (ev) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setFile(reader.result);
      }
    };

    reader.readAsDataURL(ev.target.files[0]);
  };

  useEffect(() => {
    if (status === ADDING_POST_SUCCESS || status === ADDING_POST_FAIL) {
      setOpen(false);
      dispatch(clearStatus());
    }
  }, [status]);

  return (
    <MyDialog
      open={open}
      onOpenChange={(state)=>{
        setOpen(state)
        setContent("")
        setFile(null)
       
      }}
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
          rows="5"
        />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={file}
                alt="file"
                className="rounded-full size-32 flex-shrink-0 object-cover"
              />
              <p className="">{file.name}</p>
            </div>

            <Button
              variant="destructive-outline"
              onClick={() => {
                setFile(null);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <label
              htmlFor="avatar"
              className=" mb-2 text-sm text-center font-medium text-gray-900 dark:text-white border-2 py-4 border-dashed flex flex-col items-center gap-2 w-2/3"
            >
              <div>Upload file</div>

              <IoCloudUploadOutline size={30} />
            </label>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              id="avatar"
              name="avatar"
              onChange={onFileChange}
            />
          </>
        )}
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
