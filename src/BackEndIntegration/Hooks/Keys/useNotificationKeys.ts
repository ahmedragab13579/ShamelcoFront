import type { GUID } from "../../Types/shared/Guid";

export const NotificationKeys = {
  all: ["notification"] as const,
  list: (userId: GUID) => [...NotificationKeys.all, "Notifications", userId] as const,
  listPaged: (userId: GUID, page: number) => [...NotificationKeys.list(userId), page] as const,
  detail: (id: GUID) => [...NotificationKeys.all, id] as const,
};