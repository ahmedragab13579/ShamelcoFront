import type { BookingStatus, PaymentStatus } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";

interface BaseBookingDto {
  targetId: GUID;
  customerId: GUID;
  startTime: string;
  endTime: string;
}

export interface MutateBookingResponse{
  userId: GUID;
  bookingId?: GUID;
  targetId: GUID;
  targetTableId?: GUID;
}


export interface BookingDto extends BaseBookingDto {
  bookingId: GUID;
  bookingDate: string;
  status: BookingStatus; 
  canCancel: boolean;
  customerName: string;
  entityName: string;
  bookingType: string;
  paymentStatus: PaymentStatus;
}