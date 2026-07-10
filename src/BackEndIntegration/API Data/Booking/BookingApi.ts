import apiClient from "../SharedAPIConfig/api";
import type SuccessResult from "../../Types/Result/Success";
import type PagedResult from "../../Types/Result/PagedResult"; 
import type { GUID } from "../../Types/shared/Guid";
import type { BookingDto, MutateBookingResponse } from "../../Types/Bookings/Response";
import type { CreatePitchBookingRequest, CreateVenueBookingRequest, RescheduleBookingRequest } from "../../Types/Bookings/Request";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface BookingQueryParams extends PaginationParams {
  customerId: GUID;
}

export const BookingsApi = {
  getBookingById: async (
    id: GUID,
  ): Promise<SuccessResult<BookingDto>> => {
    return await apiClient.get<never, SuccessResult<BookingDto>>(
      `bookings/${id}`,
    );
  },

  getBookingsByCustomerId: async (
    params?: PaginationParams,
  ): Promise<SuccessResult<PagedResult<BookingDto>>> => {
    return await apiClient.get<never, SuccessResult<PagedResult<BookingDto>>>(
      `bookings/customer`,
      { params }, 
    );
  },

  getPitchBookings: async (
    pitchId: GUID,
    params: BookingQueryParams,
  ): Promise<SuccessResult<PagedResult<BookingDto>>> => {
    return await apiClient.get<never, SuccessResult<PagedResult<BookingDto>>>(
      `bookings/pitch/${pitchId}`,
      { params },
    );
  },

  getVenueTableBookings: async (
    venueTableId: GUID,
    params: BookingQueryParams,
  ): Promise<SuccessResult<PagedResult<BookingDto>>> => {
    return await apiClient.get<never, SuccessResult<PagedResult<BookingDto>>>(
      `bookings/venue-table/${venueTableId}`,
      { params },
    );
  },

  cancelBooking: async (
    id: GUID,
  ): Promise<SuccessResult<MutateBookingResponse>> => {
    return await apiClient.post<never, SuccessResult<MutateBookingResponse>>(
      `bookings/${id}/cancel`,
    );
  },

  rescheduleBooking: async (
    id: GUID,
    data: RescheduleBookingRequest,
  ): Promise<SuccessResult<MutateBookingResponse>> => {
    return await apiClient.post<never, SuccessResult<MutateBookingResponse>>(
      `bookings/${id}/reschedule`,
      data,
    );
  },

  createPitchBooking: async (
    data: CreatePitchBookingRequest,
  ): Promise<SuccessResult<MutateBookingResponse>> => {
    return await apiClient.post<never, SuccessResult<MutateBookingResponse>>(
      `bookings/pitch`,
      data,
    );
  },

  createVenueBooking: async (
    data: CreateVenueBookingRequest,
  ): Promise<SuccessResult<MutateBookingResponse>> => {
    return await apiClient.post<never, SuccessResult<MutateBookingResponse>>(
      `bookings/venue`,
      data,
    );
  },
};