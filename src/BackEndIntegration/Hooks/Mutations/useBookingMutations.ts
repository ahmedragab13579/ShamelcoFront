import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type { 
  CreatePitchBookingRequest, 
  CreateVenueBookingRequest, 
  RescheduleBookingRequest 
} from "../../Types/Bookings/Request";
import { BookingsApi } from "../../API Data/Booking/BookingApi";
import { bookingKeys } from "../Keys/useBookingKeys";
import { customerKeys } from "../Keys/useCustomerKeys";
import { pitchKeys } from "../Keys/usePitchKeys";
import { dashboardKeys } from "../Keys/useDashboardKeys";
import type { MutateBookingResponse } from "../../Types/Bookings/Response";
import { venueKeys } from "../Keys/useVenueKeys";
import { NotificationKeys } from "../Keys/useNotificationKeys";

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<SuccessResult<MutateBookingResponse>, FailResult, GUID>({
    mutationKey: [...bookingKeys.all, "cancel"], 
    mutationFn: BookingsApi.cancelBooking,
    onSuccess: (response, bookingId) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(bookingId) });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });

      toast.success("تم إلغاء الحجز بنجاح");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إلغاء الحجز، يرجى المحاولة مرة أخرى.");
    },
  });
};

export const useRescheduleBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResult<MutateBookingResponse>, 
    FailResult, 
    { id: GUID; data: RescheduleBookingRequest }
  >({
    mutationKey: [...bookingKeys.all, "reschedule"], 
    mutationFn: ({ id, data }) => BookingsApi.rescheduleBooking(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(response.data.targetId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });
      
      if (response.data.targetTableId) {
          queryClient.invalidateQueries({ queryKey: venueKeys.availability(response.data.targetTableId) });
      }
      
      toast.success("تمت إعادة جدولة الحجز بنجاح");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إعادة الجدولة، يرجى المحاولة مرة أخرى.");
    },
  });
};

export const useCreatePitchBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResult<MutateBookingResponse>, FailResult, CreatePitchBookingRequest>({
    mutationKey: [...bookingKeys.all, "createPitch"], 
    mutationFn: BookingsApi.createPitchBooking,
    onSuccess: (response, variables) => { 
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });

      toast.success("تم تأكيد حجز الملعب بنجاح");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء حجز الملعب، يرجى التأكد من البيانات.");
    },
  });
};

export const useCreateVenueBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResult<MutateBookingResponse>, FailResult, CreateVenueBookingRequest>({
    mutationKey: [...bookingKeys.all, "createVenue"], 
    mutationFn: BookingsApi.createVenueBooking,
    onSuccess: (response, variables) => { 
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.availability(variables.targetTableId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });
      
      toast.success("تم تأكيد حجز المكان بنجاح");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء حجز المكان، يرجى التأكد من البيانات.");
    },
  });
};