import {  useQuery } from "@tanstack/react-query";
import { VenueApi } from "../../API Data/Venue/VenueAPi";
import type { GamingConsoleDto, LiveFloorPlanDto, MiniVenueDto, TableStateDto, VenueDto, VenueStaffDto, VenueTableAvailabilityDto } from "../../Types/Venues/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";
import { venueKeys } from "../Keys/useVenueKeys";
import type { GetVenueTableCommand } from "../../Types/Venues/Request";


export const useGetVenues = (params: Pagination) => {
  return useQuery<SuccessResult<PagedResult<MiniVenueDto>>, FailResult>({
    queryKey: venueKeys.list(params),
    queryFn: () => VenueApi.GetVenues(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetVenuesConsoles = ({Id, params}: { Id: GUID, params: Pagination }) => {
  return useQuery<SuccessResult<PagedResult<GamingConsoleDto>>, FailResult>({
    queryKey: venueKeys.consolesListOfVenuePaged(Id, params),
    queryFn: () => VenueApi.GetVenuesAvailableConsoles({data: Id, pagination: params}),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetVenue = (id: GUID) => {
  return useQuery<SuccessResult<VenueDto>, FailResult>({
    queryKey: venueKeys.detail(id),
    queryFn: () => VenueApi.GetVenue(id),
    staleTime: 60 * 1000,
    enabled: !!id,
  });
};

export const useGetVenueFloor = (id: GUID) => {
  return useQuery<SuccessResult<LiveFloorPlanDto>, FailResult>({
    queryKey: venueKeys.floorPlan(id),
    queryFn: () => VenueApi.GetVenueFloor(id),
    staleTime: 60 * 1000, 
    enabled: !!id,
  });
};

export const useGetVenueAvailableSlots = (data: GetVenueTableCommand,date:string) => {
  return useQuery<SuccessResult<VenueTableAvailabilityDto>, FailResult>({
    queryKey: venueKeys.availability(data.Id,date),
    queryFn: () => VenueApi.GetVenueAvailableSlots(data,date),
    enabled: !!data.Id,
  });
};

export const useGetVenueTable = (data: GetVenueTableCommand) => {
  return useQuery<SuccessResult<TableStateDto>, FailResult>({
    queryKey: venueKeys.tableDetail(data.Id),
    queryFn: () => VenueApi.GetVenueTable(data),
    enabled: !!data.Id,
  });
};

export const useGetVenuesStaff = ({Id, params}: { Id: GUID, params: Pagination }) => {
  return useQuery<SuccessResult<PagedResult<VenueStaffDto>>, FailResult>({
    queryKey: venueKeys.staffListOfVenuePaged(Id, params), 
    queryFn: () => VenueApi.GetVenuesAvailableStaff({data: Id, pagination: params}),
    staleTime: 5 * 60 * 1000,
  });
};


