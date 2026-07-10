import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import { CustomerApi } from "../../API Data/Customer/CustomerAPi";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import { customerKeys } from "../Keys/useCustomerKeys";
import type { UpdateCustomerProfileCommand } from "../../Types/Customer/Request";
import { useAuth } from "../../../Context/Auth/AuthContext";
import asGUID from "../../Types/shared/Guid";
import { NotificationKeys } from "../Keys/useNotificationKeys";

export const useUpdateCustomerProfileMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  return useMutation<SuccessResult<boolean>, FailResult, UpdateCustomerProfileCommand>({
    mutationKey: [...customerKeys.profiles(), "update"],
    mutationFn: CustomerApi.UpdateProfile,
    onSuccess: () => {
      if(user?.userId)
      {

        queryClient.invalidateQueries({ queryKey: customerKeys.profile(asGUID(user.userId)) });
        queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user.userId)) });
      }
      toast.success("تم تحديث البيانات بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تحديث البيانات، يرجى المحاولة مرة أخرى.");
    },
  });
};