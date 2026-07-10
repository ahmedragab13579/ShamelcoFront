import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { useAuthRedirect } from "../../Hooks/Auth/useAuthRedirect";

export const Root = () => {
  useAuthRedirect(); 

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shamelco-darker"></div>
    </div>
  );
};