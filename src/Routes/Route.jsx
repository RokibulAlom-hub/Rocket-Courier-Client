import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts/MainLayout";
import ErrorPage from "../SharedPages/Errorpage/error-page";
import Home from "../Pages/Homepages/Home";
import Register from "../Pages/AuthenticationPages/Register/Register";
import Login from "../Pages/AuthenticationPages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
        ]
      },
])