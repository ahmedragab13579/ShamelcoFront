import { type ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import type { UserType } from "../../../BackEndIntegration/Types/Enums/AppEnums";

interface ProtectedRouteProps {
  redirectPath?: string;
  allowedRoles?: UserType[];
  children?: ReactNode;
}

const ProtectedRoute = ({
  redirectPath = "/auth/login",
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { user, isInitializing } = useAuth(); 
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-shamelco-darker/5">
        <span className="w-10 h-10 border-4 border-shamelco-gold border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!user || !user.isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => role.toLowerCase() === user.role?.toLowerCase())) {
    if (user.role?.toLowerCase() === "customer") {
      return <Navigate to="/home" replace />;
    } else if (user.role?.toLowerCase() === "owner") {
      const targetEntity = user.pitchId ? "pitch" : "venue";
      const targetId = user.pitchId || user.venueId;
      return <Navigate to={targetId ? `/dashboard/${targetEntity}/${targetId}` : "/setup"} replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;