import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PitchApi } from "../../API Data/Pitch/PitchAPi";
import type { AddPitchCommand, BlockPitchCommand, UpdatePitchCommand } from "../../Types/Pitch/Request";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import { pitchKeys } from "../Keys/usePitchKeys";
import { dashboardKeys } from "../Keys/useDashboardKeys";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import { useAuth } from "../../../Context/Auth/AuthContext";
import asGUID from "../../Types/shared/Guid";
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

export const useAddPitchMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();
  return useMutation<SuccessResult<GUID>, FailResult, AddPitchCommand>({
    mutationKey: [...pitchKeys.all, "add"], 
    mutationFn: PitchApi.AddPitch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pitchKeys.lists() });
      
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitches() });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.PITCH_ADDED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useBlockPitchMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, BlockPitchCommand>({
    mutationKey: [...pitchKeys.all, "block"],
    mutationFn: PitchApi.BlockPitch,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(variables.pitchId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.detail(variables.pitchId) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(variables.pitchId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.PITCH_BLOCKED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useUpdatePitchMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, UpdatePitchCommand>({
    mutationKey: [...pitchKeys.all, "update"], 
    mutationFn: PitchApi.UpdatePitch,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pitchKeys.availability(variables.id) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: pitchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.pitchDetails(variables.id) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.PITCH_UPDATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};