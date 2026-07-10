import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { isEmpty } from "../../../BackEndIntegration/Types/shared/Guid";

export const useAuthRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      let to = "";

      if (user.role === "Customer") {
        to = "/home";
      } else {
        if (user.pitchId && !isEmpty(user.pitchId)) {
          to = `/dashboard/pitch/${user.pitchId}`;
        } else if (user.venueId && !isEmpty(user.venueId)) {
          to = `/dashboard/venue/${user.venueId}`;
        } else if (isEmpty(user.venueId!) && isEmpty(user.pitchId!)) {
          to = `/setup`;
        }
      }

      if (to) {
        nav(to, { replace: true });
      }
    }
  }, [user, isAuthenticated, nav]);
};