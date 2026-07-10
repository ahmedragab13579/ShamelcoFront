import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { InitiatePaymentCommand } from "../../Types/Payment/Request";
import { PaymentAPi } from "../../API Data/Payment/PaymentAPi";
import { bookingKeys } from "../Keys/useBookingKeys";
import { customerKeys } from "../Keys/useCustomerKeys";
import { dashboardKeys } from "../Keys/useDashboardKeys";
import { pitchKeys } from "../Keys/usePitchKeys";
import { venueKeys } from "../Keys/useVenueKeys";
import { paymentKeys } from "../Keys/usePaymentKeys"; 
import type { InitiatePaymentCommandResponse } from "../../Types/Payment/Response";
import { NotificationKeys } from "../Keys/useNotificationKeys";

export const useInitiatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResult<InitiatePaymentCommandResponse>, FailResult, InitiatePaymentCommand>({
    mutationKey: [...paymentKeys.all, "initiate"], 
    mutationFn: PaymentAPi.InitiatePayment,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.BookingId) });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile(response.data.userId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(response.data.targetId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(response.data.targetId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(response.data.userId) });
      if (response.data.targetTableId) {
          queryClient.invalidateQueries({ queryKey: venueKeys.availability(response.data.targetTableId) });
      }
      
      toast.success("تم تجهيز الدفع، جاري تحويلك...");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء بدء عملية الدفع، يرجى المحاولة مرة أخرى.");
    },
  });
};