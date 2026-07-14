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
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  
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

      toast.success(t('messages.BOOKING_CANCELLED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useRescheduleBookingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

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
      
      toast.success(t('messages.BOOKING_RESCHEDULED'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useCreatePitchBookingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation<SuccessResult<MutateBookingResponse>, FailResult, CreatePitchBookingRequest>({
    mutationKey: [...bookingKeys.all, "createPitch"], 
    mutationFn: BookingsApi.createPitchBooking,
    onSuccess: (response, variables) => { 
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });

      toast.success(t('messages.BOOKING_CREATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useCreateVenueBookingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation<SuccessResult<MutateBookingResponse>, FailResult, CreateVenueBookingRequest>({
    mutationKey: [...bookingKeys.all, "createVenue"], 
    mutationFn: BookingsApi.createVenueBooking,
    onSuccess: (response, variables) => { 
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.targetId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.availability(variables.targetTableId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });
      
      toast.success(t('messages.BOOKING_CREATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};