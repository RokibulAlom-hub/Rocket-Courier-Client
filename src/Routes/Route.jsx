import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts/MainLayout";
import ErrorPage from "../SharedPages/Errorpage/error-page";
import Home from "../Pages/Homepages/Home";
import Register from "../Pages/AuthenticationPages/Register/Register";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AllUsers from "../Pages/DashboardPages/AdminPages/AllUsers";

export const router = createBrowserRouter([
  // mainlayout
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  //   dashboard layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/dashboard/all-users",
            element:<AllUsers></AllUsers>
        }
    ],
  },
]);
