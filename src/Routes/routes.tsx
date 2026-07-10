import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayOut from "../UserInterFace/Layouts/AuthLayOut";
import Login from "../UserInterFace/Pages/Auth/Login";
import Registration from "../UserInterFace/Pages/Auth/Registration";
import ForgetPassword from "../UserInterFace/Pages/Auth/ForgetPassword";
import ResetPassword from "../UserInterFace/Pages/Auth/ResetPassword";
import ChangePassword from "../UserInterFace/Pages/Auth/ChangePassword";
import DashboardLayout from "../UserInterFace/Layouts/DashBoardLayOut";
import VenueDashboard from "../UserInterFace/Pages/DashBoards/Venue/Venue";
import SetupEntityPage from "../UserInterFace/Pages/DashBoards/SetupEntityPage";
import AppLayout from "../UserInterFace/Layouts/AppLayout";
import Home from "../UserInterFace/Pages/App/Home";
import Pitches from "../UserInterFace/Pages/Pitch/Pitches";
import Venues from "../UserInterFace/Pages/Venue/Venues";
import Profile from "../UserInterFace/Pages/App/Profile";
import PlaceDetails from "../UserInterFace/Pages/Pitch/PitchDetails";
import TopRatings from "../UserInterFace/Pages/App/TopRatingPlaces";
import Explore from "../UserInterFace/Pages/App/Explore";
import VenueDetails from "../UserInterFace/Pages/Venue/VenueDetails";
import LiveFloorPlan from "../UserInterFace/Pages/Venue/LiveVenuePlanFloor";
import BookingPage from "../UserInterFace/Pages/Bookings/Booking";
import OwnerSettingsPage from "../UserInterFace/Pages/DashBoards/OwnerProfile";
import PitchDashboard from "../UserInterFace/Pages/DashBoards/Pitch/Pitch";
import ReportsPage from "../UserInterFace/Pages/DashBoards/Reports";
import VenueSettingsPage from "../UserInterFace/Pages/DashBoards/Venue/Settings";
import PitchSettingsPage from "../UserInterFace/Pages/DashBoards/Pitch/Settings";
import { MoreActions } from "../UserInterFace/Pages/DashBoards/Pitch/MoreActions";
import VenueTableSettingsPage from "../UserInterFace/Pages/DashBoards/Venue/Table/TableDetails";
import ProtectedRoute from "../UserInterFace/Components/Common/ProtectedRoute";
import NotFoundPage from "../UserInterFace/Components/Common/NotFoundPage";
import { Root } from "../UserInterFace/Components/Common/RootRedirect";
import { VenueConsolesPage } from "../UserInterFace/Pages/DashBoards/Venue/ManageConsoles";
import { VenueMoreActionsPage } from "../UserInterFace/Pages/DashBoards/Venue/MoreActions";
import SuccessPage from "../UserInterFace/Pages/Shared/SuccessPage";
import ErrorPage from "../UserInterFace/Pages/Shared/ErrorPage";


export const router = createBrowserRouter([
  {
    
    
    path: "/auth",
    element: <AuthLayOut />,
    errorElement: <ErrorPage />, 
    children: [
 
   
      {
        index: true,
        element: <Navigate to="login" replace />, 
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: 
          <ResetPassword />,
      },
      {
        path: "change-password",
        element: <ProtectedRoute allowedRoles={["Customer","Owner"]} >
                   <ChangePassword />
                </ProtectedRoute>,
      },
    ],
  },
  {
   path: "success",
   element: <SuccessPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/dashboard",
        errorElement: <ErrorPage />, 
    element: (
      <ProtectedRoute allowedRoles={["Owner"]} >
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <OwnerSettingsPage />,
      },
      {
        path: "pitch/:id",
        element: <PitchDashboard />,
      },
      {
        path: "pitch/:id/settings",
        element: <PitchSettingsPage />,
      },
      {
        path: "pitch/:id/more-actions",
        element: <MoreActions />,
      },
      {
        path: "venue/:id",
        element: <VenueDashboard />,
      },
      {
        path: "venue/:id/settings",
        element: <VenueSettingsPage />,
      },
       {
        path: "venue/:id/consoles-management",
        element: <VenueConsolesPage />,
      },
      {
        path: "venue/:id/more-actions",
        element: <VenueMoreActionsPage />, 
      },
      {
        path: "venue/:id/table/:tableId",
        element: <VenueTableSettingsPage />,
      },
      {
        path: ":type/:id/reports",
        element: <ReportsPage />,
      },
    ],
  },
  {
    path: "setup",
    element: (
      <ProtectedRoute allowedRoles={["Owner"]} >
        <SetupEntityPage />
      </ProtectedRoute>
    ),
  },
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "top-ratings",
        element: <TopRatings />,
      },
      {
        path: "pitches",
        element: <Pitches />,
      },
      {
        path: "pitches/:id",
        element: <PlaceDetails />,
      },
      {
        path: "pitches/:id/booking",
        element: (
           <ProtectedRoute allowedRoles={["Customer"]} >
              <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "venues",
        element: <Venues />,
      },
      {
        path: "venues/:id",
        element: <VenueDetails />,
      },
      {
        path: "venues/:id/floor",
        element: <LiveFloorPlan />,
      },
      {
        path: "venues/:id/booking/:tId",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]} >
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]} >
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
    {
    path: "/",
    element: <Root/>, 
    errorElement: <ErrorPage />,
  },
]);