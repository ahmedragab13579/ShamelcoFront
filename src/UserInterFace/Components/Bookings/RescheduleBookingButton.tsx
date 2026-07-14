import { useState } from "react";
import RescheduleBookingModal from "./RescheduleBookingModal";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface RescheduleBookingButtonProps {
  bookingId: GUID;
}

export default function RescheduleBookingButton({ bookingId }: RescheduleBookingButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
      >
        {t('messages.RESCHEDULE')}
      </button>

      <RescheduleBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
}