import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";

import Loader from "./components/ui/Loader";
import { getLoggedInUser } from "./redux/slices/authSlice";
import UserRoutes from "./components/route/UserRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Following from "./pages/Following";

import ViewPost from "./pages/ViewPost";
import PageNotFound from "./components/PageNotFound";
function App() {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  if (status === "pending") {
    return <Loader />;
  }

  return (
    <div className="relative">
      {isAuthenticated && <Header />}
      {isAuthenticated && (
        <div className="fixed top-20 left-[5vw] h-[60vh] hidden lg:block">
          <SideMenu />
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<UserRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id">
            <Route index element={<Profile />} />
            <Route path="following" element={<Following />} />
            <Route path="follower" element={<Following />} />
          </Route>
          <Route path="/post/:id" element={<ViewPost />} />
        </Route>
        <Route path="*" element = {<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
