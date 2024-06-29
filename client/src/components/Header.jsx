import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Link} from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import SideMenu from "./SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearStatus } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar";

function SideBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1 lg:hidden">
      <button onClick={() => setOpen(true)} className="border">
        <MdMenu size={20} />
      </button>
      <div
        className={`fixed top-0 left-0 w-screen h-screen ${
          !open && "-translate-x-full"
        } transition-transform z-40 flex`}
      >
        <SideMenu />

        <div
          className=" flex-grow opacity-20 bg-black h-full"
          onClick={() => setOpen(false)}
        ></div>
      </div>
    </div>
  );
}

function Header() {
  const { userData, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
     if(status==="fail"){
      toast.error("Something went wrong!!");
      dispatch(clearStatus());
     }
  }, [status]);


  

  return (
    <div className="w-full fixed top-0 left-0 z-30 bg-white border h-14 flex items-center px-5 md:px-14 justify-between">
      <div className="flex gap-2 items-center">
        <SideBar />
        <div className="text-xl font-bold">ECHO POST</div>
      </div>

      <Popover>
        <PopoverTrigger>
        <Avatar>
          <AvatarImage src = {userData?.avatar.url}/>
          <AvatarFallback>{userData?.name[0]}</AvatarFallback>
        </Avatar>
        </PopoverTrigger>
        <PopoverContent className=" mr-4 md:mr-8 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
          <Avatar>
          <AvatarImage src = {userData?.avatar.url}/>
          <AvatarFallback>{userData?.name[0]}</AvatarFallback>
        </Avatar>
            <Link to={`/user/${userData?._id}`} className="font-medium hover:underline">
              {userData?.name}
            </Link>
            <p>{userData?.email}</p>
          </div>
          <Button
            variant="destructive-outline"
            className="flex items-center justify-center"
            onClick={logoutHandler}
          >
            {status === "loading" ? (
              "loading..."
            ) : (
              <>
                <IoExitOutline size={17} />
                <span>{status==="pending"?"Logging out..":"Logout"}</span>
              </>
            )}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Header;
