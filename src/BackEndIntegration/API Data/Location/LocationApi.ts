import apiClient from "../SharedAPIConfig/api";
import type SuccessResult from "../../Types/Result/Success";
import type { GovernorateDto, CityDto } from "../../Types/Locations/Response";

export const LocationApi = {
  getGovernorates: async (): Promise<SuccessResult<GovernorateDto[]>> => {
    return await apiClient.get<never, SuccessResult<GovernorateDto[]>>(
      "locations/governorates"
    );
  },

  getCitiesByGovernorate: async (
    governorateId: number
  ): Promise<SuccessResult<CityDto[]>> => {
    return await apiClient.get<never, SuccessResult<CityDto[]>>(
      `locations/governorates/${governorateId}/cities`
    );
  },
};
