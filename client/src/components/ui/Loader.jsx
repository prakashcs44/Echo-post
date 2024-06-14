import React from "react";

function Loader() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center gap-4">
     <div className="size-14  border border-t-0 border-black rounded-full animate-spin"></div>
     <div>Please wait...</div>
    </div>
   
  );
}

export default Loader;
