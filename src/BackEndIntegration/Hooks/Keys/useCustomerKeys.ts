import type { GUID } from "../../Types/shared/Guid";
import type { PaginationParams } from "../../API Data/Booking/BookingApi";
import type { SearchPlacesQuery } from "../../Types/Customer/Request";

export const customerKeys = {
  all: ["customer"] as const,
  profiles: () => [...customerKeys.all, "profile"] as const,
  profile: (id: GUID) => [...customerKeys.profiles(), id] as const,
  places: () => [...customerKeys.all, "places"] as const,
  topRated: (params?: PaginationParams) => [...customerKeys.places(), "top-rated", params] as const,
  search: (filters?: SearchPlacesQuery) => [...customerKeys.places(), "search", filters] as const,
};