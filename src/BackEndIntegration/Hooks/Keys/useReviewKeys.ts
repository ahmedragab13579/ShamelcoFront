import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";

export const reviewKeys = {
  all: ["reviews"] as const,
  lists: () => [...reviewKeys.all, "list"] as const,
  listByCustomer: (customerId: GUID, pagination: Pagination) => 
    [...reviewKeys.lists(), "customer", customerId, pagination] as const,
  listByPlace: (placeId: GUID, pagination: Pagination) => 
    [...reviewKeys.lists(), "place", placeId, pagination] as const,
  details: () => [...reviewKeys.all, "detail"] as const,
  detail: (id: GUID) => [...reviewKeys.details(), id] as const,
};