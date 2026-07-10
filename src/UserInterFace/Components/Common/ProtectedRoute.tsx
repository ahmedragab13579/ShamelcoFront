import {  type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
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
  

  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if(allowedRoles && !allowedRoles.includes(user.role as UserType))
    return <Navigate to="/home" replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;