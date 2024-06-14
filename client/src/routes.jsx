import ViewPost from "./pages/ViewPost";
import Following from "./pages/Following";
import Home from "./pages/Home";
import Profile from "./pages/Profile";



export const privateRoutes = [
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/me",
        element:<Profile/>
    },
    {
        path:"/following",
        element:<Following/>
    },
   {
    path:"/follower",
    element:<Following/>
   },
   {
    path:"/post/:id",
    element:<ViewPost/>
   },
   {
    path:"/user/me",
    element:<Profile/>
   },
   {
    path:"/user/:id",
    element:<Profile/>
   },
   
]