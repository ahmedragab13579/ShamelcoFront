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

export const useUpdateOwnerProfile = () => {
  const queryClient = useQueryClient();
  const {user}=useAuth();
  return useMutation<SuccessResult<boolean>, FailResult, UpdateOwnerProfileCommand>({
    mutationKey: [...ownerKeys.all, "update"], 
    mutationFn: OwnerAPi.UpdateOwnerProfile,
    onSuccess: () => {
      if(user?.userId)
      {
        queryClient.invalidateQueries({ queryKey: ownerKeys.detail(asGUID(user.userId)) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user.userId)) });

      }
      toast.success("تم تعديل البيانات بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تعديل البيانات، يرجى المحاولة مرة أخرى.");
    },
  });
};