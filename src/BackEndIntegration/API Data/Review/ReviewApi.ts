import apiClient from "../SharedAPIConfig/api";
import type SuccessResult from "../../Types/Result/Success";
import type { GUID } from "../../Types/shared/Guid";
import type { ReviewDto } from "../../Types/Reviews/Response";
import type { SubmitReviewCommand } from "../../Types/Reviews/Request";
import type Pagination from "../../Types/shared/Paganation";
import type PagedResult from "../../Types/Result/PagedResult";

export const ReviewApi = {
  getReviewById: async (
    id: GUID,
  ): Promise<SuccessResult<ReviewDto>> => {
    return await apiClient.get<never, SuccessResult<ReviewDto>>(
      `reviews/${id}`,
    );
  },

  getReviewsByCustomer: async (
    pagination:Pagination,
  ): Promise<SuccessResult<PagedResult<ReviewDto>>> => {
    return await apiClient.get<never, SuccessResult<PagedResult<ReviewDto>>>(
      `reviews/customer`,
        {params:pagination},
    );
  },

  getReviewsByPlace: async (
    placeId: GUID,
    pagination:Pagination,
  ): Promise<SuccessResult<PagedResult<ReviewDto>>> => {
    return await apiClient.get<never, SuccessResult<PagedResult<ReviewDto>>>(
      `reviews/place/${placeId}`,
        {params:pagination},
    );
  },

  submitReview: async (
    data: SubmitReviewCommand,
  ): Promise<SuccessResult<GUID>> => {
    return await apiClient.post<never, SuccessResult<GUID>>(
      `reviews`,
      data,
    );
  },
};