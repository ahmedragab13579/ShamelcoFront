import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { useCustomerProfileQuery } from "../../../BackEndIntegration/Hooks/Queries/useCustomerQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import { useLogoutMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";

export type TabType = "info" | "pitches" | "venues";

export function useProfile() {
  const { user, logoutState } = useAuth();
  const logout = useLogoutMutation();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("info");

  const userId = user?.userId ? asGUID(user.userId) : null;

  const { data: profileData, isLoading, isError } = useCustomerProfileQuery(userId!);

  const handleLogOut = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        logoutState();
        nav("/", { replace: true });
      }
    });
  };

  return {
    profileData: profileData?.data,
    isLoading,
    isError,
    activeTab,
    setActiveTab,
    handleLogOut,
    userId,
    isLoggingOut: logout.isPending, 
  };
}