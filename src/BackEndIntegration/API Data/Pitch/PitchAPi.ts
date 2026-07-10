import type { AddPitchCommand, BlockPitchCommand, UpdatePitchCommand } from "../../Types/Pitch/Request";
import type { PitchAvailabilityDto, PitchDto } from "../../Types/Pitch/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import apiClient from "../SharedAPIConfig/api";

export const PitchApi = {
  AddPitch: async (data: AddPitchCommand): Promise<SuccessResult<GUID>> => {
    return await apiClient.post<never,SuccessResult<GUID>>(
      "pitches/add",
      data,
    );
    
  },

 UpdatePitch: async (data: UpdatePitchCommand): Promise<SuccessResult<boolean>> => {
  const { id, ...remData } = data;
  
  const formData = new FormData();

  formData.append('name', remData.name);
  formData.append('type', String(remData.type));
  formData.append('capacity', String(remData.capacity));
  formData.append('open', remData.open);
  formData.append('close', remData.close);
  formData.append('newRate', String(remData.newRate));
  formData.append('address', remData.address);

  if (remData.image) {
    formData.append('image', remData.image);
  }

  return await apiClient.put<never, SuccessResult<boolean>>(
    `pitches/${id}`,
    formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
},
  GetPitch: async (data: GUID): Promise<SuccessResult<PitchDto>> => {
    return await apiClient.get<never,SuccessResult<PitchDto>>(`pitches/${data}`);
    
  },
  BlockPitch: async (data: BlockPitchCommand): Promise<SuccessResult<boolean>> => {
    return await apiClient.post<never,SuccessResult<boolean>>(`pitches/${data.pitchId}/block`,data,);
    
  },
  GetPitches: async (data: Pagination): Promise<SuccessResult<PagedResult<PitchDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<PitchDto>>>("pitches", {
      params: data,
    });
    
  },
  GetPitchAvailableSlots: async (data: GUID,date:string): Promise<SuccessResult<PitchAvailabilityDto>> => {
    return await apiClient.get<never,SuccessResult<PitchAvailabilityDto>>(`pitches/${data}/availability`,{
      params: { date }
    });
  },
};
