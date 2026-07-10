import type { BookingDto } from "../Bookings/Response";
import type { ActiveSessionDto } from "../Sessions/Response";
import type { TableStateDto } from "../Venues/Response";

export interface PitchDashboardDto {
  totalDailyRevenue: number;
  activeSessionsCount: number;
  upcomingBookingsCount: number;
  activeSessions: ActiveSessionDto[];
  upcomingBookings: BookingDto[];
}



export interface VenueDashboardDto {
  totalDailyRevenue: number;
  availableTablesCount: number;
  occupiedTablesCount: number;
  pendingOrdersCount: number;
  tables: TableStateDto[];
}