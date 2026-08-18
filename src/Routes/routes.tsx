import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../UserInterFace/Components/Common/ProtectedRoute";
import Loading from "../UserInterFace/Components/Common/Loading";

const AuthLayOut = lazy(() => import("../UserInterFace/Layouts/AuthLayOut"));
const Login = lazy(() => import("../UserInterFace/Pages/Auth/Login"));
const Registration = lazy(() => import("../UserInterFace/Pages/Auth/Registration"));
const ForgetPassword = lazy(() => import("../UserInterFace/Pages/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../UserInterFace/Pages/Auth/ResetPassword"));
const ChangePassword = lazy(() => import("../UserInterFace/Pages/Auth/ChangePassword"));
const DashboardLayout = lazy(() => import("../UserInterFace/Layouts/DashBoardLayOut"));
const VenueDashboard = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/Venue"));
const SetupEntityPage = lazy(() => import("../UserInterFace/Pages/DashBoards/SetupEntityPage"));
const AppLayout = lazy(() => import("../UserInterFace/Layouts/AppLayout"));
const Home = lazy(() => import("../UserInterFace/Pages/App/Home"));
const Pitches = lazy(() => import("../UserInterFace/Pages/Pitch/Pitches"));
const Venues = lazy(() => import("../UserInterFace/Pages/Venue/Venues"));
const Profile = lazy(() => import("../UserInterFace/Pages/App/Profile"));
const PlaceDetails = lazy(() => import("../UserInterFace/Pages/Pitch/PitchDetails"));
const TopRatings = lazy(() => import("../UserInterFace/Pages/App/TopRatingPlaces"));
const Explore = lazy(() => import("../UserInterFace/Pages/App/Explore"));
const VenueDetails = lazy(() => import("../UserInterFace/Pages/Venue/VenueDetails"));
const LiveFloorPlan = lazy(() => import("../UserInterFace/Pages/Venue/LiveVenuePlanFloor"));
const BookingPage = lazy(() => import("../UserInterFace/Pages/Bookings/Booking"));
const RescheduleBookingPage = lazy(() => import("../UserInterFace/Pages/Bookings/RescheduleBooking"));
const OwnerSettingsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/OwnerProfile"));
const PitchDashboard = lazy(() => import("../UserInterFace/Pages/DashBoards/Pitch/Pitch"));
const ReportsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Reports"));
const VenueSettingsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/Settings"));
const PitchSettingsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Pitch/Settings"));
const MoreActions = lazy(() => import("../UserInterFace/Pages/DashBoards/Pitch/MoreActions").then(m => ({ default: m.MoreActions })));
const VenueTableSettingsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/Table/TableDetails"));
const NotFoundPage = lazy(() => import("../UserInterFace/Components/Common/NotFoundPage"));
const Root = lazy(() => import("../UserInterFace/Components/Common/RootRedirect").then(m => ({ default: m.Root })));
const VenueConsolesPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/ManageConsoles").then(m => ({ default: m.VenueConsolesPage })));
const VenueMoreActionsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/MoreActions").then(m => ({ default: m.VenueMoreActionsPage })));
const SuccessPage = lazy(() => import("../UserInterFace/Pages/Shared/SuccessPage"));
const ErrorPage = lazy(() => import("../UserInterFace/Pages/Shared/ErrorPage"));
const PaymentResultPage = lazy(() => import("../UserInterFace/Pages/Shared/PaymentResultPage"));
const PitchReviewsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Pitch/PitchReviewsPage"));
const VenueReviewsPage = lazy(() => import("../UserInterFace/Pages/DashBoards/Venue/VenueReviewsPage"));

const ContactUs = lazy(() => import("../UserInterFace/Pages/Shared/ContactUs"));
const AboutUs = lazy(() => import("../UserInterFace/Pages/Shared/AboutUs"));
const PrivacyPolicy = lazy(() => import("../UserInterFace/Pages/Shared/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../UserInterFace/Pages/Shared/RefundPolicy"));

const Suspended = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading text="" />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Suspended><AuthLayOut /></Suspended>,
    errorElement: <Suspended><ErrorPage /></Suspended>,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Suspended><Login /></Suspended>,
      },
      {
        path: "register",
        element: <Suspended><Registration /></Suspended>,
      },
      {
        path: "forget-password",
        element: <Suspended><ForgetPassword /></Suspended>,
      },
      {
        path: "reset-password",
        element: <Suspended><ResetPassword /></Suspended>,
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute allowedRoles={["Customer", "Owner"]}>
            <Suspended><ChangePassword /></Suspended>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "success",
    element: <Suspended><SuccessPage /></Suspended>,
  },
  {
    path: "payment-result",
    element: <Suspended><PaymentResultPage /></Suspended>,
  },
  {
    path: "*",
    element: <Suspended><NotFoundPage /></Suspended>,
  },
  {
    path: "/dashboard",
    errorElement: <Suspended><ErrorPage /></Suspended>,
    element: (
      <ProtectedRoute allowedRoles={["Owner"]}>
        <Suspended><DashboardLayout /></Suspended>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Suspended><OwnerSettingsPage /></Suspended>,
      },
      {
        path: "pitch/:id",
        element: <Suspended><PitchDashboard /></Suspended>,
      },
      {
        path: "pitch/:id/reviews",
        element: <Suspended><PitchReviewsPage /></Suspended>,
      },
      {
        path: "pitch/:id/settings",
        element: <Suspended><PitchSettingsPage /></Suspended>,
      },
      {
        path: "pitch/:id/more-actions",
        element: <Suspended><MoreActions /></Suspended>,
      },
      {
        path: "venue/:id",
        element: <Suspended><VenueDashboard /></Suspended>,
      },
      {
        path: "venue/:id/reviews",
        element: <Suspended><VenueReviewsPage /></Suspended>,
      },
      {
        path: "venue/:id/settings",
        element: <Suspended><VenueSettingsPage /></Suspended>,
      },
      {
        path: "venue/:id/consoles-management",
        element: <Suspended><VenueConsolesPage /></Suspended>,
      },
      {
        path: "venue/:id/more-actions",
        element: <Suspended><VenueMoreActionsPage /></Suspended>,
      },
      {
        path: "venue/:id/table/:tableId",
        element: <Suspended><VenueTableSettingsPage /></Suspended>,
      },
      {
        path: ":type/:id/reports",
        element: <Suspended><ReportsPage /></Suspended>,
      },
    ],
  },
  {
    path: "setup",
    element: (
      <ProtectedRoute allowedRoles={["Owner"]}>
        <Suspended><SetupEntityPage /></Suspended>
      </ProtectedRoute>
    ),
  },
  {
    element: <Suspended><AppLayout /></Suspended>,
    errorElement: <Suspended><ErrorPage /></Suspended>,
    children: [
      {
        path: "home",
        element: <Suspended><Home /></Suspended>,
      },
      {
        path: "explore",
        element: <Suspended><Explore /></Suspended>,
      },
      {
        path: "top-ratings",
        element: <Suspended><TopRatings /></Suspended>,
      },
      {
        path: "pitches",
        element: <Suspended><Pitches /></Suspended>,
      },
      {
        path: "pitches/:id",
        element: <Suspended><PlaceDetails /></Suspended>,
      },
      {
        path: "pitches/:id/booking",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <Suspended><BookingPage /></Suspended>
          </ProtectedRoute>
        ),
      },
      {
        path: "venues",
        element: <Suspended><Venues /></Suspended>,
      },
      {
        path: "venues/:id",
        element: <Suspended><VenueDetails /></Suspended>,
      },
      {
        path: "venues/:id/floor",
        element: <Suspended><LiveFloorPlan /></Suspended>,
      },
      {
        path: "venues/:id/booking/:tId",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <Suspended><BookingPage /></Suspended>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <Suspended><Profile /></Suspended>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/bookings/:bookingId/reschedule",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <Suspended><RescheduleBookingPage /></Suspended>
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: <Suspended><ContactUs /></Suspended>,
      },
      {
        path: "about",
        element: <Suspended><AboutUs /></Suspended>,
      },
      {
        path: "privacy-policy",
        element: <Suspended><PrivacyPolicy /></Suspended>,
      },
      {
        path: "refund-policy",
        element: <Suspended><RefundPolicy /></Suspended>,
      },
    ],
  },
  {
    path: "/",
    element: <Suspended><Root /></Suspended>,
    errorElement: <Suspended><ErrorPage /></Suspended>,
  },
]);