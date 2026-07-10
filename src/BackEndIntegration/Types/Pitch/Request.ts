import type { PitchType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";

export interface AddPitchCommand {
  name: string;
  type: PitchType;
  hourlyRate: number;
  capacity: number;
}

export interface BlockPitchCommand {
  pitchId: GUID;
  startTime: Date;
  endTime: Date;
  reason: string;
}

export interface UpdatePitchCommand {
  id: GUID;          
  name: string;
  type: PitchType;     
  capacity: number;
  open: string;        
  close: string;       
  newRate: number;     
  address: string;
  image?: File;
}