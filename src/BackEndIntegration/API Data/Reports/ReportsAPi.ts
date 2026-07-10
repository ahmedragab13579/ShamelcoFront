
import apiClient from "../SharedAPIConfig/api";
import type SuccessResult from "../../Types/Result/Success";
import type { BaseReportRequest } from "../../Types/Reports/Requests";
import type PagedResult from "../../Types/Result/PagedResult";
import type Pagination from "../../Types/shared/Paganation";
import type { BookingReportItemDto, KpiSummaryDto, OccupancyDto, PaymentBreakdownDto } from "../../Types/Reports/Response";


export const ReportsApi = {
  getKpis: async (
    params: BaseReportRequest,
  ): Promise<SuccessResult<KpiSummaryDto>> => { 
    const {Id,...paramsWithoutId} = params; // Remove 'id' from params
    const response = await apiClient.get<never, SuccessResult<KpiSummaryDto>>(
      "reports/kpis/" + Id,
      {   params: paramsWithoutId}
    );
    return response;
  },

  getPayments: async (
    params: BaseReportRequest,
  ): Promise<SuccessResult<PaymentBreakdownDto>> => { 
        const {Id,...paramsWithoutId} = params; // Remove 'id' from params
    const response = await apiClient.get<never, SuccessResult<PaymentBreakdownDto>>(
      "reports/payments/" + Id,
      { params: paramsWithoutId }
    );
    return response;
  },

  getOccupancy: async (
    params: BaseReportRequest,
  ): Promise<SuccessResult<OccupancyDto>> => { 
    const {Id,...paramsWithoutId} = params; // Remove 'id' from params
    const response = await apiClient.get<never, SuccessResult<OccupancyDto>>(
      "reports/occupancy/" + Id,
      { params: paramsWithoutId }
    );
    return response;
  },

  getBookings: async (
    params: Pagination&BaseReportRequest,
  ): Promise<SuccessResult<PagedResult<BookingReportItemDto>>> => { 
        const {Id,...paramsWithoutId} = params; // Remove 'id' from params

    const response = await apiClient.get<never, SuccessResult<PagedResult<BookingReportItemDto>>>(
      "reports/bookings/" + Id,
      { params: paramsWithoutId }
    );
    return response;
  },

  exportData: async (
    params: BaseReportRequest,
  ): Promise<Blob> => {
        const {Id,...paramsWithoutId} = params; // Remove 'id' from params
    const response = await apiClient.get<never, Blob>(
      "reports/export/" + Id,
      { 
        params: paramsWithoutId,
        responseType: "blob" 
      }
    );
    return response;
  },
};