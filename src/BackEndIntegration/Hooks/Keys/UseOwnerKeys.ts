import type { GUID } from "../../Types/shared/Guid";

export const ownerKeys = {
  all: ["owner"] as const,
  details: () => [...ownerKeys.all, "detail"] as const,
  detail: (id: GUID) => [...ownerKeys.details(), id] as const,
};