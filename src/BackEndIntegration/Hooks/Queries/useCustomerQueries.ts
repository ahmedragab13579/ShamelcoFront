import { useQuery } from "@tanstack/react-query";
import { CustomerApi } from "../../API Data/Customer/CustomerAPi";
import type { SearchPlacesQuery} from "../../Types/Customer/Request";
import type { CustomerProfileDto, PlaceSearchDto } from "../../Types/Customer/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type { PaginationParams } from "../../API Data/Booking/BookingApi";
import { customerKeys } from "../Keys/useCustomerKeys";

export const useTopRatedPlacesQuery = (data: PaginationParams) => {
  return useQuery<SuccessResult<PagedResult<PlaceSearchDto>>, FailResult>({
    queryKey: customerKeys.topRated(data),
    queryFn: () => CustomerApi.GetTopRating(data),
  });
};

export const useSearchPlacesQuery = (filters: SearchPlacesQuery) => {
  return useQuery<SuccessResult<PagedResult<PlaceSearchDto>>, FailResult>({
    queryKey: customerKeys.search(filters),
    queryFn: () => CustomerApi.GetSearchingPlaces(filters),
    enabled: !!filters, 
  });
};

export const useCustomerProfileQuery = (id: GUID) => {
  return useQuery<SuccessResult<CustomerProfileDto>, FailResult>({
    queryKey: customerKeys.profile(id),
    queryFn: () => CustomerApi.GetProfile(),
    enabled: !!id,
  });
};
