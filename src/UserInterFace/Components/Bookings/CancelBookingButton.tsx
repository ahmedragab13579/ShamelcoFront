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
      className="px-4 py-2 text-sm font-medium text-white bg-status-danger rounded-xl hover:bg-status-danger/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isPending ? t("messages.CANCELLING") : t("messages.CANCEL_BOOKING")}
    </button>
  );
}