import React, { useEffect, useState } from "react";
import MyDialog from "./MyDialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { FiCamera } from "react-icons/fi";
import { clearStatus, updateProfile } from "@/redux/slices/authSlice";

function EditProfile() {
  const { userData,status,error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [open,setOpen] = useState(false);


  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
    setBio(userData?.bio);
    setAvatarPreview(userData?.avatar);
  }, [userData]);

  const onAvatarChange = (ev) => {
    const file = ev.target.files[0];

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  const saveHandler = (ev) => {
    ev.preventDefault();
    const data  = new FormData();
    data.append("name",name);
    data.append("email",email);
    data.append("bio",bio);
    if(avatar)
    data.append("avatar",avatar);
    dispatch(updateProfile(data));
  };


  useEffect(()=>{
      if(status==="fail"){
        dispatch(clearStatus());
      }
      else if(status==="success"){
        dispatch(clearStatus());
        setOpen(false);
      }
  },[status])

  return (
    <MyDialog dialogTrigger={<Button>Edit Profile</Button>} open={open} setOpen={setOpen}>
      <form
        className="flex flex-col items-center px-5 py-5 gap-5 bg-white rounded-lg"
        onSubmit={saveHandler}
      >
        <div className="relative">
          <img
            src={avatarPreview}
            alt={name}
            className="rounded-full size-40 object-cover"
          />
          {!avatar && (
            <>
              <input
                type="file"
                id="avatar"
                className="sr-only"
                onChange={onAvatarChange}
              />
              <label
                htmlFor="avatar"
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-800 text-white p-2 opacity-75 hover:opacity-100"
              >
                <FiCamera size={20} />
              </label>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label htmlFor="name" className="text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col  w-full max-w-sm">
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col  w-full max-w-sm">
          <label htmlFor="bio" className="text-lg font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(ev) => setBio(ev.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="flex justify-center gap-12 w-full max-w-sm">
          <Button type="submit" disabled = {status==="pending"}>{status==="pending"?"Saving...":"Save Changes"}</Button>
          <Button
            type="button"
            variant="destructive-outline"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default EditProfile;
