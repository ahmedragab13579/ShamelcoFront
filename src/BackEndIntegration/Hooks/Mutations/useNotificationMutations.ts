import { useMutation, useQueryClient } from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import { NotificationApi } from "../../API Data/Notification/NotificationAPi";
import toast from "react-hot-toast";
import { useAuth } from "../../../Context/Auth/AuthContext";
import asGUID from "../../Types/shared/Guid";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

export const useMarkAsReadNotificationMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation<SuccessResult<boolean>, FailResult, GUID>({
    mutationKey: [...NotificationKeys.detail(asGUID(user?.userId || "00000000-0000-0000-0000-000000000000")), "update"],
    mutationFn: NotificationApi.MarkAsRead,
    onSuccess: () => {
      const userId = asGUID(user?.userId || "00000000-0000-0000-0000-000000000000");
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(userId) });
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};