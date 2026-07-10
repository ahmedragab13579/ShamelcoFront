import type { GUID } from "../../Types/shared/Guid";
import type SuccessResult from "../../Types/Result/Success";
import apiClient from "../SharedAPIConfig/api";
import type { PitchDashboardDto, VenueDashboardDto } from "../../Types/DashBoard/Response";

export const DashBoardApi = {
  GetPitchDashBoard: async (
    data: GUID,
  ): Promise<SuccessResult<PitchDashboardDto>> => {
    return await apiClient.get<never,SuccessResult<PitchDashboardDto>>(
      `dashboard/pitches/${data}`,
    );
  },

  GetVenueDashBoard: async (
    data: GUID,
  ): Promise<SuccessResult<VenueDashboardDto>> => {
    return await apiClient.get<never,SuccessResult<VenueDashboardDto>>(
      `dashboard/venues/${data}`,
    );
  },
};
