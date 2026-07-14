import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitReviewCommand } from "../../Types/Reviews/Request";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import { ReviewApi } from "../../API Data/Review/ReviewApi";
import toast from "react-hot-toast";
import { reviewKeys } from "../Keys/useReviewKeys";
import { pitchKeys } from "../Keys/usePitchKeys";
import asGUID from "../../Types/shared/Guid";
import { venueKeys } from "../Keys/useVenueKeys";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";



export const useSubmitReviewMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<GUID>, FailResult, SubmitReviewCommand>({
    mutationKey: [...reviewKeys.all, "submit"], 
    mutationFn: ReviewApi.submitReview,
    onSuccess: (_,variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
      if(variables.placeType==="Pitch" && variables.placeId)
      {
        queryClient.invalidateQueries({ queryKey: pitchKeys.detail(asGUID(variables.placeId)) });
        queryClient.invalidateQueries({ queryKey: venueKeys.detail(asGUID(variables.placeId)) });
        queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      }

      toast.success(t('messages.REVIEW_SUBMITTED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};