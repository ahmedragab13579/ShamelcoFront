import { useState } from "react";
import RescheduleBookingModal from "./RescheduleBookingModal";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";

interface RescheduleBookingButtonProps {
  bookingId: GUID;
}

export default function RescheduleBookingButton({ bookingId }: RescheduleBookingButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
      >
        إعادة جدولة
      </button>

      <RescheduleBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
}