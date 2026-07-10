import type { PitchStatus, PitchType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";


export interface TimeSlotDto {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export interface PitchAvailabilityDto {
  pitchId: GUID;
  targetDate: Date;
  timeSlots: TimeSlotDto[];
}

export interface MiniPitchDto {
  id: GUID;
  name: string;
  type: PitchType;
  mainImage: string;
}
export interface PitchDto extends MiniPitchDto {
  hourlyRate: number;
  capacity: number;
  address: string;
  rating: number;
  status: PitchStatus;
  isActive: boolean;
  isOpen: boolean;
  openIn: string;  
  closeIn: string; 
  ownerId: string;
}

export interface TimeSlotDto {
    startTime: Date; 
    endTime: Date;
    isAvailable: boolean;
}

export interface PitchAvailabilityDto {
    pitchId: GUID;
    targetDate: Date;
    timeSlots: TimeSlotDto[];
}

