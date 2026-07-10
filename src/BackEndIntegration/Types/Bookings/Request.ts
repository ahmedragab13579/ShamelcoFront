import type { GUID } from "../shared/Guid"

export interface RescheduleBookingRequest {
  BookingId:GUID;
  newStartTime: Date;
  newEndTime: Date;
}

export interface CreatePitchBookingRequest {
  targetId: GUID;
  startTime: Date;
  endTime: Date;

  totalAmount:number;
}

export interface CreateVenueBookingRequest {
  targetId: GUID;
  targetTableId: GUID;
  startTime: Date;
    totalAmount:number;

  endTime: Date;
}