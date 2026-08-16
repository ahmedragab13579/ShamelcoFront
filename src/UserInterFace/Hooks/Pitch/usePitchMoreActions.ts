import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { BlockPitchCommand } from "../../../BackEndIntegration/Types/Pitch/Request";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { useBlockPitchMutation } from "../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export interface BlockPitchFormValues {
  pitchId: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export function usePitchMoreActions() {
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

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    getMinDateTime,
    watchedStartTime,
    ValidateDate,
    ValidateEndTime,
    t,
  };
}
