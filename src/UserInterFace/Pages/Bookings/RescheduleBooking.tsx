import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import { useBookingById } from "../../../BackEndIntegration/Hooks/Queries/useBookingQueries";
import { useRescheduleBookingMutation } from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface RescheduleFormInputs {
  newStartTime: string;
  newEndTime: string;
}

export default function RescheduleBookingPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();

  const parsedGuid = asGUID(bookingId || "00000000-0000-0000-0000-000000000000");
  const { data: bookingResult, isLoading, isError } = useBookingById(parsedGuid);
  const { mutate: rescheduleBooking, isPending } = useRescheduleBookingMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RescheduleFormInputs>();

  const startTime = watch("newStartTime");

  const formatDate = (dateString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', options);
  };

  const formatTime = (timeString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(timeString).toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', options);
  };

  const onSubmit: SubmitHandler<RescheduleFormInputs> = (data) => {
    rescheduleBooking(
      {
        id: parsedGuid,
        data: {
          BookingId: parsedGuid,
          newStartTime: new Date(data.newStartTime),
          newEndTime: new Date(data.newEndTime),
        },
      },
      {
        onSuccess: () => {
          navigate("/profile");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-shamelco-bg flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-shamelco-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-shamelco-dark font-medium">{t('messages.LOADING') || "جاري التحميل..."}</p>
        </div>
      </div>
    );
  }

  if (isError || !bookingResult?.data) {
    return (
      <div className="w-full min-h-screen bg-shamelco-bg flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-shamelco-surface border border-shamelco-dark/10 p-8 rounded-3xl text-center space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-shamelco-darker">{t('messages.BOOKING_NOT_FOUND') || "الحجز غير موجود"}</h3>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2.5 bg-shamelco-darker text-shamelco-gold font-bold rounded-xl hover:bg-shamelco-accent transition-all"
          >
            {t('messages.BACK_TO_PROFILE') || "العودة إلى الملف الشخصي"}
          </button>
        </div>
      </div>
    );
  }

  const booking = bookingResult.data;

  // Local ISO string for input min attribute (YYYY-MM-DDTHH:mm)
  const minDateTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  return (
    <div className="w-full min-h-screen bg-shamelco-bg py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-shamelco-dark/70 hover:text-shamelco-darker transition-colors bg-shamelco-surface px-4 py-2 rounded-xl border border-shamelco-dark/10 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t('messages.BACK')}</span>
          </button>

          <h1 className="text-xl font-black text-shamelco-darker flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-shamelco-gold" />
            {t('messages.RESCHEDULE_BOOKING')}
          </h1>
        </div>

        {/* Current Booking Info Card */}
        <div className="bg-shamelco-surface border border-shamelco-dark/10 p-6 rounded-3xl shadow-sm space-y-4">
          <h2 className="text-base font-bold text-shamelco-darker border-b border-shamelco-dark/5 pb-3">
            {t('messages.CURRENT_BOOKING_DETAILS')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {booking.entityName && (
              <div className="sm:col-span-2">
                <span className="text-xs text-shamelco-dark/60 block font-medium mb-1">
                  {t('messages.VENUE_PITCH_NAME')}
                </span>
                <span className="font-bold text-shamelco-darker text-lg">{booking.entityName}</span>
              </div>
            )}

            <div className="flex items-center gap-3 bg-shamelco-bg/50 p-3 rounded-2xl border border-shamelco-dark/5">
              <Calendar className="w-5 h-5 text-shamelco-gold shrink-0" />
              <div>
                <span className="text-xs text-shamelco-dark/60 block font-medium">{t('messages.DATE')}</span>
                <span className="font-bold text-shamelco-darker text-sm">{formatDate(booking.bookingDate)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-shamelco-bg/50 p-3 rounded-2xl border border-shamelco-dark/5">
              <Clock className="w-5 h-5 text-shamelco-gold shrink-0" />
              <div>
                <span className="text-xs text-shamelco-dark/60 block font-medium">{t('messages.TIME')}</span>
                <span className="font-bold text-shamelco-darker text-sm">
                  {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Form */}
        <div className="bg-shamelco-surface border border-shamelco-dark/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-shamelco-darker">
            {t('messages.SELECT_NEW_TIME')}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SharedInput
              label={t('messages.NEW_START_TIME')}
              type="datetime-local"
              min={minDateTime}
              error={errors.newStartTime?.message}
              {...register("newStartTime", {
                required: t('messages.SELECT_START_TIME_REQ'),
                validate: (value) => {
                  if (new Date(value) < new Date()) {
                    return t('messages.START_TIME_MUST_BE_FUTURE');
                  }
                  return true;
                },
              })}
            />

            <SharedInput
              label={t('messages.NEW_END_TIME')}
              type="datetime-local"
              min={startTime || minDateTime}
              error={errors.newEndTime?.message}
              {...register("newEndTime", {
                required: t('messages.SELECT_END_TIME_REQ'),
                validate: (value) => {
                  if (startTime && new Date(value) <= new Date(startTime)) {
                    return t('messages.END_TIME_MUST_BE_AFTER_START');
                  }
                  if (new Date(value) < new Date()) {
                    return t('messages.START_TIME_MUST_BE_FUTURE');
                  }
                  return true;
                },
              })}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-shamelco-dark/5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isPending}
                className="px-6 py-3 text-sm font-bold text-shamelco-dark bg-shamelco-bg rounded-xl hover:bg-shamelco-dark/10 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {t('messages.CANCEL') || "إلغاء"}
              </button>
              
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 text-sm font-bold text-shamelco-darker bg-shamelco-gold rounded-xl hover:bg-shamelco-gold-hover shadow-gold active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                {isPending && <span className="w-4 h-4 border-2 border-shamelco-darker border-t-transparent rounded-full animate-spin" />}
                <span>{t('messages.CONFIRM_RESCHEDULING') || "تأكيد إعادة الجدولة"}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
