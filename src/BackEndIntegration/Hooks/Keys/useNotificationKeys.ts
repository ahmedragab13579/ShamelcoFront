import type { GUID } from "../../Types/shared/Guid";

export const NotificationKeys = {
  all: ["notification"] as const,
  list: (userId:GUID,page?: number ) => [...NotificationKeys.all, "Notifications",userId, page] as const,
  detail: (id: GUID) => [...NotificationKeys.all, id] as const,
};