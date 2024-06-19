import React, { Suspense, lazy, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";

import Loader from "./components/ui/Loader";
import { getLoggedInUser } from "./redux/slices/authSlice";
import UserRoutes from "./components/route/UserRoutes";
const Home = lazy(()=>import("./pages/Home"));
const Profile = lazy(()=>import("./pages/Profile"));
const Following = lazy(()=>import("./pages/Following"));
const ViewPost = lazy(()=>import("./pages/ViewPost"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const IndexPage = lazy(()=>import("./pages/IndexPage"));


function App() {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    if (!isAuthenticated&&status!=="pending") {
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
      <Suspense fallback = {<Loader/>}>
      <Routes>
        <Route path="/" element = {<IndexPage/>}/>
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
      </Suspense>
     
    </div>
  );
}

export default App;
