import type { ConsoleStatus, TableStatus, VenueType } from "../Enums/AppEnums";
import type { TimeSlotDto } from "../Pitch/Response";
import type { GUID } from "../shared/Guid";

export interface LiveFloorPlanDto {
  venueId: GUID;
  venueName: string;
  tables: TableStateDto[];
}

export interface VenueTableAvailabilityDto {
  tableId: GUID;
  tableNumber: number;
  hasConsole: boolean;
  timeSlots: TimeSlotDto[];
}
export interface TableStateDto {
  tableId: GUID;
  tableNumber: number;
  consoleId:GUID;
  capacity: number;
  status?: TableStatus;           
  activeSessionId?: string;       
  currentInvoiceTotal?: number;   
  hasConsole: boolean;
  consoleStatus?: ConsoleStatus;  
}
 export interface VenueStaffDto
    {
          staffId :GUID
          userId :GUID
          fullName :string
          email :string
          role :string
          createdAt :Date
          isActive :boolean
    }

export interface GamingConsoleDto {
  id:GUID
  name:string
  serialNumber:string
  hourlyRate:number
  status:ConsoleStatus
}
export interface MiniVenueDto {
  id: GUID;
  name: string;
  type: VenueType;
  mainImage: string;
  tablesNumber: number;
}
export interface VenueDto {
    id: GUID;
    name: string;
    activeTablesNumber: number;
    type: VenueType; 
    address: string;
    mainImage: string;
    rating: number;

    hourRate:number;
    isActive: boolean;
    isOpen: boolean;
    openIn: string; 
    closeIn: string;
    ownerId: string;
}