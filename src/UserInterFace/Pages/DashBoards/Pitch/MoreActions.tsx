import { useForm } from "react-hook-form";
import type { BlockPitchCommand } from "../../../../BackEndIntegration/Types/Pitch/Request";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../../../Components/Common/SharedInput";
import { useParams } from "react-router-dom";
import { useBlockPitchMutation } from "../../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";

interface BlockPitchFormValues {
  pitchId: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export const MoreActions = () => {
  const{id} = useParams();
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

  function ValidateDate(value:string){
       if(new Date(value)<new Date)
             return "لا يمكن اختيار تاريخ فى الماضى "
        return true
  }

  function ValidateEndTime(value:string){
    if (watchedStartTime && new Date(value) <= new Date(watchedStartTime)) {
        return "وقت النهايه يجب ان يكون بعد وقت البدايه";
        }
    return true;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-shamelco-darker mb-2">إجراءات إضافية</h1>
        <p className="text-shamelco-dark/60">إدارة العمليات المتقدمة للملاعب</p>
      </div>

      {/* قسم حجب الملعب */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/5">
        <h2 className="text-xl font-bold text-shamelco-darker mb-6">حجب ملعب</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SharedInput
              label="سبب الحجب"
              type="text"
              placeholder="مثال: صيانة دورية..."
              {...register("reason", { required: "سبب الحجب مطلوب" })}
              error={errors.reason?.message}
            />

            <SharedInput
              label="وقت البدء"
              min={getMinDateTime()}
              type="datetime-local"
              {...register("startTime", { required: "وقت البدء مطلوب" , validate:ValidateDate })}
              error={errors.startTime?.message}
              
            />

            <SharedInput
              label="وقت الانتهاء"
              type="datetime-local"
              min={watchedStartTime || getMinDateTime()}
              {...register("endTime", { required: "وقت الانتهاء مطلوب" ,validate:ValidateEndTime })}
              error={errors.endTime?.message}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200
                 ${
                  isPending
                    ? "bg-shamelco-dark/20 cursor-not-allowed"
                    : "bg-status-success hover:bg-status-success/90 active:scale-95 shadow-lg shadow-status-success/30"
                }`}
            >
              {isPending ? "جاري الحجب..." : "تأكيد الحجب"}
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
};