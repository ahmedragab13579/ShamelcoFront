import type { BookingDto } from "../Bookings/Response";
import type { PlaceSubType, PlaceType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";

export interface PlaceSearchDto {
  id: GUID;
  name: string;
  placeType: PlaceType;
  placeSubType : PlaceSubType
  address: string;
  mainImage: string;
  rating: number;
  startingPrice: number;
}


export interface CustomerProfileDto {
  userId: GUID;
  fullName: string;
  email: string;
  phoneNumber: string;
  loyaltyPoints: number;
  imagePath:string;
  pitchPreviousBookings: BookingDto[];
  pitchFutureBookings: BookingDto[];
  venuePreviousBookings: BookingDto[];
  venueFutureBookings: BookingDto[];
}