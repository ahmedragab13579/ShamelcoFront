import { useQuery } from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GovernorateDto, CityDto } from "../../Types/Locations/Response";
import { LocationApi } from "../../API Data/Location/LocationApi";
import { locationKeys } from "../Keys/useLocationKeys";

export const useGetGovernorates = () => {
  return useQuery<SuccessResult<GovernorateDto[]>, FailResult>({
    queryKey: locationKeys.governorates(),
    queryFn: () => LocationApi.getGovernorates(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours caching for static locations
  });
};

export const useGetCitiesByGovernorate = (governorateId?: number) => {
  return useQuery<SuccessResult<CityDto[]>, FailResult>({
    queryKey: locationKeys.cities(governorateId),
    queryFn: () => LocationApi.getCitiesByGovernorate(governorateId!),
    enabled: !!governorateId && governorateId > 0,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
