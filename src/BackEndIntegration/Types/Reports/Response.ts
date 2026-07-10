import type { GUID } from "../shared/Guid";

export interface PaymentBreakdownDto {
    cashTotal: number;
    electronicTotal: number;
    deferredTotal: number;
}

export interface OccupancyDto {
    period: Date; 
    bookingCount: number;
}

export interface KpiSummaryDto {
    totalRevenue: number;
    totalCompletedBookings: number;
    totalCanceledBookings: number;
}

export interface ExportDataDto {
    data: string; 
    contentType: string;
    fileName: string;
}

export interface BookingReportItemDto {
    bookingId: GUID; 
    customerName: string;
    entityName: string;
    bookingDate: Date; 
    totalAmount: number;
    paymentMethod: string;
    status: string;
}