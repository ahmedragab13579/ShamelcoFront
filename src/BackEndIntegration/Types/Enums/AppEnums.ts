export type BookingStatus = "Pending" | "Confirmed" | "InProgress" | "CheckedIn" | "Cancelled" | "NoShow" | "Completed";
export type ConsoleStatus = "Idle" | "Active" | "Maintenance";
export type PaymentMethod = "Cash" | "Card" | "MobileWallet";
export type PaymentStatus = "Pending" | "Completed" | "Refunded"| "Failed";
export type TransactionType = "Credit" | "Debit";
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type PayoutStatus = "Pending" | "Approved" | "Rejected";
export type PitchStatus = "Available" | "Blocked" | "Maintenance";
export type PitchType = "FiveASide" | "SixASide" | "Tennis" | "Padel";
export type PlaceSubType = VenueType  |  PitchType;

export type PlaceType = "Venue" | "Pitch"|"unknownPlaceType";
export type SessionStatus = "Active" | "Completed" | "Cancelled" | "NotStart";
export type TableStatus = "Available" | "Occupied" | "Reserved" | "Maintenance" | "Unavailable";
export type UserType = "Owner" | "Staff" | "Customer";
export type VenueType = "Billiard" | "Cafe";
export type VenueStaffRole = "Cashier" | "Manager"|"Waiter";