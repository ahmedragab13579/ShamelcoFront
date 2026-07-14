import { useForm } from "react-hook-form";
import type { BlockPitchCommand } from "../../../../BackEndIntegration/Types/Pitch/Request";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../../../Components/Common/SharedInput";
import { useParams } from "react-router-dom";
import { useBlockPitchMutation } from "../../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";
import { Loader2, Ban } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface BlockPitchFormValues {
  pitchId: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export const MoreActions = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BlockPitchFormValues>();

  const { mutate: blockPitch, isPending } = useBlockPitchMutation();
  
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };
  
  const watchedStartTime = watch("startTime");
  
  const onSubmit = (data: BlockPitchFormValues) => {
    const payload: BlockPitchCommand = {
      pitchId: id as GUID, 
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      reason: data.reason,
    };

    blockPitch(payload, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  function ValidateDate(value: string) {
    if (new Date(value) < new Date())
      return t('messages.CANNOT_CHOOSE_PAST_DATE') || "لا يمكن اختيار تاريخ في الماضي";
    return true;
  }

  function ValidateEndTime(value: string) {
    if (watchedStartTime && new Date(value) <= new Date(watchedStartTime)) {
      return t('messages.END_TIME_MUST_BE_AFTER_START_TIME') || "وقت النهاية يجب أن يكون بعد وقت البداية";
    }
    return true;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-8 font-sans transition-colors duration-200 animate-in fade-in duration-500">
      
      {/* الترويسة مع توظيف لون الـ muted */}
      <div className="space-y-1 text-start">
        <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight">
          {t('messages.MORE_ACTIONS')}
        </h1>
        <p className="text-shamelco-muted text-sm sm:text-base font-semibold">
          {t('messages.MANAGE_ADVANCED_PITCH_OPS')}
        </p>
      </div>

      {/* قسم حجب الملعب - كارت فخم متوافق مع الـ Tokens */}
      <div className="bg-shamelco-surface p-6 sm:p-8 rounded-lg shadow-md border border-shamelco-border text-start">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-shamelco-border">
          <Ban className="w-6 h-6 text-shamelco-gold shrink-0" />
          <h2 className="text-xl font-black text-shamelco-darker">
            {t('messages.BLOCK_PITCH')}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <SharedInput
                label={t('messages.BLOCK_REASON')}
                type="text"
                placeholder={t('messages.EX_ROUTINE_MAINTENANCE') || "مثال: صيانة دورية للملعب"}
                {...register("reason", { required: t('messages.BLOCK_REASON_REQUIRED') || "سبب الحجب مطلوب" })}
                error={errors.reason?.message}
              />
            </div>

            <SharedInput
              label={t('messages.START_TIME')}
              min={getMinDateTime()}
              type="datetime-local"
              {...register("startTime", { required: t('messages.START_TIME_REQUIRED'), validate: ValidateDate })}
              error={errors.startTime?.message}
            />

            <SharedInput
              label={t('messages.END_TIME')}
              type="datetime-local"
              min={watchedStartTime || getMinDateTime()}
              {...register("endTime", { required: t('messages.END_TIME_REQUIRED'), validate: ValidateEndTime })}
              error={errors.endTime?.message}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-shamelco-border">
            {/* تعديل الزرار للون الذهبي المميز للأكشن الرئيسي */}
            <button
              type="submit"
              disabled={isPending}
              className={`px-8 py-3.5 rounded-md font-black transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-shamelco-gold shrink-0 min-w-[160px]
                 ${isPending
                    ? "bg-shamelco-border text-shamelco-muted cursor-not-allowed opacity-70 shadow-none"
                    : "bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker shadow-gold"}`}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-current shrink-0" aria-hidden="true" />
                  <span>{t('messages.BLOCKING') || "جاري الحجب..."}</span>
                </>
              ) : (
                <>
                  <Ban className="w-4 h-4 shrink-0" />
                  <span>{t('messages.CONFIRM_BLOCK')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};