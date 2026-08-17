import { useCancelBookingMutation } from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface CancelBookingButtonProps {
  bookingId: GUID;
}

export default function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const { mutate: cancelBooking, isPending } = useCancelBookingMutation();
  const { t } = useLanguage();

  const handleCancel = () => {
    const isConfirmed = window.confirm(t("messages.CANCEL_BOOKING_CONFIRM"));
    if (isConfirmed) {
      cancelBooking(bookingId);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="px-4 py-2 text-sm font-bold text-status-danger bg-status-danger/10 hover:bg-status-danger hover:text-white border border-status-danger/20 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
    >
      {isPending && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {isPending ? (t("messages.CANCELLING") || "جاري الإلغاء...") : (t("messages.CANCEL_BOOKING") || "إلغاء الحجز")}
    </button>
  );
}