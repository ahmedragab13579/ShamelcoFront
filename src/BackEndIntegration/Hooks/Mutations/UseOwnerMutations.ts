import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { UpdateOwnerProfileCommand } from "../../Types/Owner/Request";
import { OwnerAPi } from "../../API Data/Owner/OwnerAPi";
import { ownerKeys } from "../Keys/UseOwnerKeys";
import { useAuth } from "../../../Context/Auth/AuthContext";
import asGUID from "../../Types/shared/Guid";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

export const useUpdateOwnerProfile = () => {
  const queryClient = useQueryClient();
  const {user}=useAuth();
  const { t } = useLanguage();
  return useMutation<SuccessResult<boolean>, FailResult, UpdateOwnerProfileCommand>({
    mutationKey: [...ownerKeys.all, "update"], 
    mutationFn: OwnerAPi.UpdateOwnerProfile,
    onSuccess: () => {
      if(user?.userId)
      {
        queryClient.invalidateQueries({ queryKey: ownerKeys.detail(asGUID(user.userId)) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user.userId)) });

      }
      toast.success(t('messages.OWNER_PROFILE_UPDATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};