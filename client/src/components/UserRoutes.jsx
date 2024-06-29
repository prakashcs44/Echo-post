import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import PageWrapper from "./PageWrapper";

function UserLayout() {
  return (
    <>
      <Header />
      <div className="fixed top-20 left-[5vw] h-[60vh] hidden lg:block">
        <SideMenu />
      </div>
      <PageWrapper>
       <Outlet/>
      </PageWrapper>
      
    </>
  );
}


function UserRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated === true ? (<UserLayout/>) : <Navigate to="/login" />;
}

export default UserRoutes;
