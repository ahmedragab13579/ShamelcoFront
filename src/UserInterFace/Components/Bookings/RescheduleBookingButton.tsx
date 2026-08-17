import { useNavigate } from "react-router-dom";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface RescheduleBookingButtonProps {
  bookingId: GUID;
}

export default function RescheduleBookingButton({ bookingId }: RescheduleBookingButtonProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => navigate(`/profile/bookings/${bookingId}/reschedule`)}
      className="px-4 py-2 text-sm font-bold text-shamelco-darker bg-shamelco-gold/20 hover:bg-shamelco-gold text-shamelco-gold hover:text-shamelco-darker border border-shamelco-gold/30 rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
    >
      {t('messages.RESCHEDULE') || "إعادة جدولة"}
    </button>
  );
}