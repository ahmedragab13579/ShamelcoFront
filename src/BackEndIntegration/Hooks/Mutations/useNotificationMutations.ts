import { useMutation, useQueryClient } from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import { NotificationApi } from "../../API Data/Notification/NotificationAPi";
import toast from "react-hot-toast";
import { useAuth } from "../../../Context/Auth/AuthContext";
import asGUID from "../../Types/shared/Guid";

export const useMarkAsReadNotificationMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();
  return useMutation<SuccessResult<boolean>, FailResult, GUID>({
    mutationKey: [...NotificationKeys.detail(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")), "update"],
    mutationFn: NotificationApi.MarkAsRead,
    onSuccess: (_,variables) => {
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(variables) });
      toast.success("تم تحديث البيانات بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تحديث البيانات، يرجى المحاولة مرة أخرى.");
    },
  });
};