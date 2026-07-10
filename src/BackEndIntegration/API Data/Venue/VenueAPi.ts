import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import type { 
  AddConsoleCommand,
  AddStaffRequest,
  AddVenueCommand, 
  AddVenueTableCommand, 
  AddVenueTableConsoleCommand, 
  DeleteConsoleCommand, 
  DeleteVenueTableCommand, 
  GetVenueTableCommand, 
  RemoveVenueTableConsoleCommand, 
  RevokeStaffRequest, 
  UpdateVenueCommand, 
  UpdateVenueTableCommand 
} from "../../Types/Venues/Request";
import type { 
  GamingConsoleDto, 
  LiveFloorPlanDto, 
  MiniVenueDto, 
  TableStateDto, 
  VenueDto, 
  VenueStaffDto, 
  VenueTableAvailabilityDto
} from "../../Types/Venues/Response";
import apiClient from "../SharedAPIConfig/api";



export const VenueApi = {
  AddVenue: async (data: AddVenueCommand): Promise<SuccessResult<GUID>> => {
    return await apiClient.post<never,SuccessResult<GUID>>(
      "venues/add",
      data,
    );
  },
  
  UpdateVenue: async (data: UpdateVenueCommand): Promise<SuccessResult<boolean>> => {
  const { Id, ...rest } = data;
  
  const formData = new FormData();

  formData.append('name', rest.name);
  formData.append('Address', rest.Address);
  formData.append('OpenIn', rest.OpenIn);
  formData.append('CloseIn', rest.CloseIn);

  if (rest.MainImage) {
    formData.append('MainImage', rest.MainImage);
  }

  return await apiClient.put<never, SuccessResult<boolean>>(
    `venues/${Id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
},
  
  UpdateVenueTable: async (data: UpdateVenueTableCommand): Promise<SuccessResult<boolean>> => {
    const{Id, VenueId,...rest}=data;
    return await apiClient.put<never,SuccessResult<boolean>>(
      `venues/${VenueId}/tables/${Id}`,
      rest,
    );
  },
  
  DeleteVenueTableConsole: async (data: RemoveVenueTableConsoleCommand): Promise<SuccessResult<boolean>> => {
    return await apiClient.delete<never,SuccessResult<boolean>>(
      `venues/${data.VenueId}/tables/${data.Id}/remove-console`
    );
  },

  AddVenueTableConsole: async (data: AddVenueTableConsoleCommand): Promise<SuccessResult<boolean>> => {
    return await apiClient.post<never,SuccessResult<boolean>>(
      `venues/${data.VenueId}/tables/${data.Id}/console/${data.ConsoleId}`
    );
  },

  AddVenueTable: async (data: AddVenueTableCommand): Promise<SuccessResult<GUID>> => {
    const {VenueId,...remData} = data;
    return await apiClient.post<never,SuccessResult<GUID>>(
      `venues/${VenueId}/tables`,
      remData
    );
  },
  DeleteVenueTable: async (data: DeleteVenueTableCommand): Promise<SuccessResult<boolean>> => {
    return await apiClient.delete<never,SuccessResult<boolean>>(
      `venues/${data.VenueId}/tables/${data.Id}`
    );
  },
  AddVenueConsole: async (data: AddConsoleCommand): Promise<SuccessResult<GUID>> => {
    const {VenueId,...remData} = data;
    return await apiClient.post<never,SuccessResult<GUID>>(
      `venues/${VenueId}/consoles`,
      remData
    );
  },
  DeleteVenueConsole: async (data: DeleteConsoleCommand): Promise<SuccessResult<boolean>> => {
    return await apiClient.delete<never,SuccessResult<boolean>>(
      `venues/${data.VenueId}/consoles/${data.Id}`
    );
  },


  AddStaff: async (data: AddStaffRequest): Promise<SuccessResult<boolean>> => {
    const { VenueId, ...body } = data;
    return await apiClient.post<never, SuccessResult<boolean>>(
      `venues/${VenueId}/staff`,
      body
    );
  },

  RevokeStaff: async (data: RevokeStaffRequest): Promise<SuccessResult<boolean>> => {
    return await apiClient.delete<never, SuccessResult<boolean>>(
      `venues/${data.VenueId}/staff/${data.StaffId}`
    );
  },


  GetVenues: async (data: Pagination): Promise<SuccessResult<PagedResult<MiniVenueDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<MiniVenueDto>>>("venues", {
      params: data,
    });
  },
  
  GetVenuesAvailableConsoles: async ({data,pagination}: {data:GUID,pagination:Pagination}): Promise<SuccessResult<PagedResult<GamingConsoleDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<GamingConsoleDto>>>(`venues/${data}/consoles/unassigned`, {
      params: pagination,
    });
  },
  
  GetVenuesAvailableStaff: async ({data,pagination}: {data:GUID,pagination:Pagination}): Promise<SuccessResult<PagedResult<VenueStaffDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<VenueStaffDto>>>(`venues/${data}/staff`, {
      params: pagination,
    });
  },
  
  GetVenue: async (data: GUID): Promise<SuccessResult<VenueDto>> => {
    return await apiClient.get<never,SuccessResult<VenueDto>>(`venues/${data}`);
  },
  
  GetVenueTable: async (data: GetVenueTableCommand): Promise<SuccessResult<TableStateDto>> => {
    return await apiClient.get<never,SuccessResult<TableStateDto>>(`venues/${data.VenueId}/tables/${data.Id}`);
  },
  
  GetVenueAvailableSlots: async (data: GetVenueTableCommand,date:string): Promise<SuccessResult<VenueTableAvailabilityDto>> => {
    return await apiClient.get<never,SuccessResult<VenueTableAvailabilityDto>>(`venues/${data.VenueId}/tables/${data.Id}/availability`,{
      params: { date }
    });
  },
  
  GetVenueFloor: async (data: GUID): Promise<SuccessResult<LiveFloorPlanDto>> => {
    return await apiClient.get<never,SuccessResult<LiveFloorPlanDto>>(`venues/${data}/floor-plan`);
  },
};