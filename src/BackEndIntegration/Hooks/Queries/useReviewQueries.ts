import { useQuery } from "@tanstack/react-query";
import type { ReviewDto } from "../../Types/Reviews/Response";
import type SuccessResult from "../../Types/Result/Success";
import type PagedResult from "../../Types/Result/PagedResult";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import { ReviewApi } from "../../API Data/Review/ReviewApi";
import { reviewKeys } from "../Keys/useReviewKeys";


export const useGetReviewById = (id: GUID) => {
  return useQuery<SuccessResult<ReviewDto>, FailResult>({
    queryKey: reviewKeys.detail(id),
    queryFn: () => ReviewApi.getReviewById(id),
    enabled: !!id,
  });
};

export const useGetReviewsByCustomer = (customerId: GUID, pagination: Pagination) => {
  return useQuery<SuccessResult<PagedResult<ReviewDto>>, FailResult>({
    queryKey: reviewKeys.listByCustomer(customerId, pagination),
    queryFn: () => ReviewApi.getReviewsByCustomer(pagination),
    enabled: !!customerId,
  });
};

export const useGetReviewsByPlace = (placeId: GUID, pagination: Pagination) => {
  return useQuery<SuccessResult<PagedResult<ReviewDto>>, FailResult>({
    queryKey: reviewKeys.listByPlace(placeId, pagination),
    queryFn: () => ReviewApi.getReviewsByPlace(placeId, pagination),
    enabled: !!placeId,
  });
};
