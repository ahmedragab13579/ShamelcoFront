import type { TableStatus, VenueType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";
import type { VenueStaffRole } from "../../Types/Enums/AppEnums";

export interface AddVenueCommand {
  name: string;
  hourRate:number;
  type: VenueType;
}
export interface GetVenueTableCommand {
 Id:GUID;
 VenueId:GUID;
}


export interface DeleteVenueTableCommand extends GetVenueTableCommand{}
export interface AddVenueTableConsoleCommand extends GetVenueTableCommand {
  ConsoleId: GUID;

}
export interface AddStaffRequest {
  VenueId: GUID;
  FullName:string;
  Password:string;
  Email: string;
  Role: VenueStaffRole;
}

export interface RevokeStaffRequest {
  Email:string;
  Password:string;
  VenueId: GUID;
  StaffId: GUID;
}
export interface RemoveVenueTableConsoleCommand extends GetVenueTableCommand {
}
export interface UpdateVenueCommand {
  Id:GUID;
  name: string;
  hourRate:number;
  Address: string;
  MainImage?: File;
  OpenIn: string;
  CloseIn: string;
}
export interface UpdateVenueTableCommand {
  Id:GUID;
  VenueId: GUID;
  Capacity: number;
  TableNumber: number;
  Status:TableStatus;
}

export interface AddVenueTableCommand{
  VenueId:GUID,
  Capacity:number,
  HasConsole:boolean,


}

export interface AddConsoleCommand{
  VenueId:GUID;
  Name:string;
  HourlyRate:number;
  SerialNumber:string;
}

export interface DeleteConsoleCommand{
  Id:GUID;
  VenueId:GUID;
}

