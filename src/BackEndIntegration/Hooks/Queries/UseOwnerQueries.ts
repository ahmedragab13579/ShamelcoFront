import { useQuery } from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import { OwnerAPi } from "../../API Data/Owner/OwnerAPi";
import type { GUID } from "../../Types/shared/Guid";
import type OwnerProfileDto from "../../Types/Owner/Response";
import { ownerKeys } from "../Keys/UseOwnerKeys";

export const useGetOwnerProfile = (id: GUID) => {
  return useQuery<SuccessResult<OwnerProfileDto>, FailResult>({
    queryKey: ownerKeys.detail(id),
    queryFn: () => OwnerAPi.GetOwnerProfile(),
    staleTime: 5 * 60 * 1000, 
    enabled: !!id,
  });
};