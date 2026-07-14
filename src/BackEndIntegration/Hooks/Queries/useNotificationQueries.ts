import { useQuery } from "@tanstack/react-query";
import { NotificationApi } from "../../API Data/Notification/NotificationAPi";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { NotificationDto } from "../../Types/Notification/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import { useAuth } from "../../../Context/Auth/AuthContext";
import type Pagination from "../../Types/shared/Paganation";
import asGUID from "../../Types/shared/Guid";

export const useGetNotifications = (Pagination: Pagination) => {
  const { user } = useAuth();
  return useQuery<SuccessResult<PagedResult<NotificationDto>>, FailResult>({
    queryKey: NotificationKeys.listPaged(
      asGUID(user?.userId || "00000000-0000-0000-0000-000000000000"), 
      Pagination.page || 1
    ), 
    queryFn: () => NotificationApi.GetNotifications(Pagination),
    enabled: !!user?.userId, 
  });
};
