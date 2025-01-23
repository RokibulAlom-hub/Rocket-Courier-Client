import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayouts/MainLayout";
import ErrorPage from "../SharedPages/Errorpage/error-page";
import Home from "../Pages/Homepages/Home";
import Register from "../Pages/AuthenticationPages/Register/Register";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AllUsers from "../Pages/DashboardPages/AdminPages/AllUsers";
import AllDeliveryMen from "../Pages/DashboardPages/AdminPages/AllDeliveryMen";
import BookParcel from "../Pages/DashboardPages/Userspages/BookParcel";
import Allparcels from "../Pages/DashboardPages/AdminPages/Allparcels";
import MyParcels from "../Pages/DashboardPages/Userspages/MyParcels";
import MydeliveryLIst from "../Pages/DashboardPages/DeliveryManpages/MydeliveryLIst";
import UpdateParcel from "../Pages/DashboardPages/Userspages/UpdateParcel";
import MyProfile from "../Pages/DashboardPages/Userspages/MyProfile";
import Statistics from "../Pages/DashboardPages/AdminPages/Statistics";
import MyReviews from "../Pages/DashboardPages/DeliveryManpages/MYReveiws";

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
        },
        {
            path:"/dashboard/statistics",
            element:<Statistics></Statistics>
        },
        {
            path:"/dashboard/all-parcels",
            element:<Allparcels></Allparcels>
        },
        {
            path:"/dashboard/all-delivery-men",
            element:<AllDeliveryMen></AllDeliveryMen>
        },
        {
            path:"/dashboard/book-parcels",
            element:<BookParcel></BookParcel>
        },
        {
            path:"/dashboard/my-parcels",
            element:<MyParcels></MyParcels>
        },
        {
            path:"/dashboard/update/parcel/:id",
            element:<UpdateParcel></UpdateParcel>,
            loader: ({ params }) => fetch(`https://b10a12-server-side-rokibul-alom-hub.vercel.app/${params.id}`)

        },
        {
            path:"/dashboard/myprofile",
            element:<MyProfile></MyProfile>,

        },
        // deliveryman routes
        {
            path:"/dashboard/delivery-tasks",
            element:<MydeliveryLIst></MydeliveryLIst>
        },
        {
            path:"/dashboard/profile",
            element:<MyReviews></MyReviews>
        },
    ],
  },
]);
