import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts/MainLayout";
import ErrorPage from "../SharedPages/Errorpage/error-page";
import Home from "../Pages/Homepages/Home";

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
        ]
      },
])