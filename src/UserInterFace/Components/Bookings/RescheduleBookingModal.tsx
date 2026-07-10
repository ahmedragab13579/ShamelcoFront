import { useForm, type SubmitHandler } from "react-hook-form";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../Common/SharedInput";
import { useRescheduleBookingMutation } from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";

interface RescheduleBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: GUID;
}

interface RescheduleFormInputs {
  newStartTime: string;
  newEndTime: string;
}

export default function RescheduleBookingModal({ isOpen, onClose, bookingId }: RescheduleBookingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RescheduleFormInputs>();

  const { mutate: rescheduleBooking, isPending } = useRescheduleBookingMutation();

  const startTime = watch("newStartTime");

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<RescheduleFormInputs> = (data) => {
    rescheduleBooking(
      {
        id: bookingId,
        data: {
          BookingId: bookingId,
          newStartTime: new Date(data.newStartTime),
          newEndTime: new Date(data.newEndTime),
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-shamelco-darker text-right">إعادة جدولة الحجز</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <SharedInput
            label="وقت البداية الجديد"
            type="datetime-local"
            error={errors.newStartTime?.message}
            {...register("newStartTime", { required: "يرجى اختيار وقت البداية" })}
          />

          <SharedInput
            label="وقت النهاية الجديد"
            type="datetime-local"
            error={errors.newEndTime?.message}
            {...register("newEndTime", { 
              required: "يرجى اختيار وقت النهاية",
              validate: (value) => {
                if (startTime && new Date(value) <= new Date(startTime)) {
                  return "وقت النهاية يجب أن يكون بعد وقت البداية";
                }
                return true;
              }
            })}
          />

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="px-6 py-2 text-sm font-bold text-shamelco-darker bg-shamelco-dark/10 rounded-xl hover:bg-shamelco-dark/20 disabled:opacity-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 text-sm font-bold text-white bg-shamelco-accent rounded-xl hover:opacity-90 disabled:opacity-50 transition-colors"
            >
              {isPending ? "جاري الحفظ..." : "تأكيد التعديل"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}