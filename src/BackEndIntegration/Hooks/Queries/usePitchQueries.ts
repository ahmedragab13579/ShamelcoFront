import {  useQuery } from "@tanstack/react-query";
import { PitchApi } from "../../API Data/Pitch/PitchAPi";
import type { PitchAvailabilityDto, PitchDto } from "../../Types/Pitch/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import { pitchKeys } from "../Keys/usePitchKeys";

export const useGetPitches = (data: Pagination) => {
  return useQuery<SuccessResult<PagedResult<PitchDto>>, FailResult>({
    queryKey: pitchKeys.list(data),
    queryFn: () => PitchApi.GetPitches(data),
    staleTime: 5 * 60 * 1000, 
  });
};

export const useGetPitch = (id: GUID) => {
  return useQuery<SuccessResult<PitchDto>, FailResult>({
    queryKey: pitchKeys.detail(id),
    queryFn: () => PitchApi.GetPitch(id),
    staleTime: 5 * 60 * 1000, 
    enabled: !!id,
  });
};

export const useGetPitchAvailableSlots = (id: GUID,date:string) => {
  return useQuery<SuccessResult<PitchAvailabilityDto>, FailResult>({
    queryKey: pitchKeys.availability(id,date),
    queryFn: () => PitchApi.GetPitchAvailableSlots(id,date),
    enabled: !!id,
  });
};
