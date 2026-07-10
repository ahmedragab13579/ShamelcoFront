import { useQuery } from "@tanstack/react-query";
import { DashBoardApi } from "../../API Data/DashBoard/DashBoardApi";
import type { GUID } from "../../Types/shared/Guid";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { PitchDashboardDto, VenueDashboardDto } from "../../Types/DashBoard/Response";
import { dashboardKeys } from "../Keys/useDashboardKeys";



export const useVenueDashboardQuery = (id: GUID) => {
  return useQuery<SuccessResult<VenueDashboardDto>, FailResult>({
    queryKey: dashboardKeys.venueDetails(id),
    queryFn: () => DashBoardApi.GetVenueDashBoard(id),
    staleTime: 5 * 60 * 1000, // 5 Minutes
    enabled: !!id,
  });
};

export const usePitchDashboardQuery = (id: GUID) => {
  return useQuery<SuccessResult<PitchDashboardDto>, FailResult>({
    queryKey: dashboardKeys.pitchDetails(id),
    queryFn: () => DashBoardApi.GetPitchDashBoard(id),
    staleTime: 5 * 60 * 1000, // 5 Minutes
    enabled: !!id,
  });
};