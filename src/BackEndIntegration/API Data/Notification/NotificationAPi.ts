import type { NotificationDto } from "../../Types/Notification/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import apiClient from "../SharedAPIConfig/api";

export const NotificationApi = {
    GetNotifications: async (pagination:Pagination): Promise<SuccessResult<PagedResult< NotificationDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult< NotificationDto>>>(
      `notifications`,
      {
        params:{pagination}
      }
    );
    
  },
   MarkAsRead: async (id:GUID): Promise<SuccessResult<boolean>> => {
    return await apiClient.put<never,SuccessResult<boolean>>(
      `notifications/${id}/read`,
    );
    
  },
}