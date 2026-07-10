import type { GUID } from "../../Types/shared/Guid";
import type { BookingQueryParams, PaginationParams } from "../../API Data/Booking/BookingApi";

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  listByCustomer: (customerId: GUID, params?: PaginationParams) =>
    [...bookingKeys.lists(), "customer", customerId, params] as const,
  listByPitch: (pitchId: GUID, params: BookingQueryParams) => 
    [...bookingKeys.lists(), "pitch", pitchId, params] as const,
  listByVenue: (venueTableId: GUID, params: BookingQueryParams) => 
    [...bookingKeys.lists(), "venue", venueTableId, params] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: GUID) => [...bookingKeys.details(), id] as const,
};