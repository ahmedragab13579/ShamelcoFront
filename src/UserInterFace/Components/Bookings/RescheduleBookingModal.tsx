import { useForm, type SubmitHandler } from "react-hook-form";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../Common/SharedInput";
import { useRescheduleBookingMutation } from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

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
  const { t } = useLanguage();

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
        <h2 className="text-xl font-semibold mb-6 text-shamelco-darker text-start">{t('messages.RESCHEDULE_BOOKING')}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <SharedInput
            label={t('messages.NEW_START_TIME')}
            type="datetime-local"
            error={errors.newStartTime?.message}
            {...register("newStartTime", { required: t('messages.SELECT_START_TIME_REQ') })}
          />

          <SharedInput
            label={t('messages.NEW_END_TIME')}
            type="datetime-local"
            error={errors.newEndTime?.message}
            {...register("newEndTime", { 
              required: t('messages.SELECT_END_TIME_REQ'),
              validate: (value) => {
                if (startTime && new Date(value) <= new Date(startTime)) {
                  return t('messages.END_TIME_MUST_BE_AFTER_START');
                }
                return true;
              }
            })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-shamelco-dark bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {t('messages.CANCEL')}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-shamelco-darker rounded-xl hover:bg-shamelco-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              {isPending && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {t('messages.CONFIRM_RESCHEDULING')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}