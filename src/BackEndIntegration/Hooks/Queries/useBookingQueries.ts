import { useQuery} from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type PagedResult from "../../Types/Result/PagedResult";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type { BookingDto } from "../../Types/Bookings/Response";
import { BookingsApi, type BookingQueryParams, type PaginationParams } from "../../API Data/Booking/BookingApi";
import { bookingKeys } from "../Keys/useBookingKeys";


export const useBookingById = (id: GUID) => {
  return useQuery<SuccessResult<BookingDto>, FailResult>({
    queryKey: bookingKeys.detail(id),
    queryFn: () => BookingsApi.getBookingById(id),
    enabled: !!id, 
  });
};

export const useBookingsByCustomer = (customerId: GUID, params?: PaginationParams) => {
  return useQuery<SuccessResult<PagedResult<BookingDto>>, FailResult>({
    queryKey: bookingKeys.listByCustomer(customerId, params),
    queryFn: () => BookingsApi.getBookingsByCustomerId(params),
    enabled: !!customerId,
  });
};

export const usePitchBookings = (pitchId: GUID, params: BookingQueryParams) => {
  return useQuery<SuccessResult<PagedResult<BookingDto>>, FailResult>({
    queryKey: bookingKeys.listByPitch(pitchId, params),
    queryFn: () => BookingsApi.getPitchBookings(pitchId, params),
    enabled: !!pitchId && !!params.customerId,
  });
};

export const useVenueTableBookings = (venueTableId: GUID, params: BookingQueryParams) => {
  return useQuery<SuccessResult<PagedResult<BookingDto>>, FailResult>({
    queryKey: bookingKeys.listByVenue(venueTableId, params),
    queryFn: () => BookingsApi.getVenueTableBookings(venueTableId, params),
    enabled: !!venueTableId && !!params.customerId,
  });
};
