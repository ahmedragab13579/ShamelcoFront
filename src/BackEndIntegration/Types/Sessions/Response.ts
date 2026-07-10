import type { GUID } from "../shared/Guid";

export interface ActiveSessionDto {
  id: GUID;
  customerName: string;
  startTime: string;
  durationInMinutes: number;
  paidAmount: number;
}

export interface PitchSessionDto {
  sessionId: GUID;
  pitchId: GUID;
  pitchName: string;
  customerId?: GUID ; 
  customerName: string;
  startTime: string; 
  endTime?: string; 
  status: string;
  totalAmount: number; 
}