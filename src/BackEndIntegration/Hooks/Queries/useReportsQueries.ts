import { useMutation, useQuery } from "@tanstack/react-query";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type PagedResult from "../../Types/Result/PagedResult";
import type Pagination from "../../Types/shared/Paganation";
import type { BaseReportRequest } from "../../Types/Reports/Requests";
import type { 
  BookingReportItemDto, 
  KpiSummaryDto, 
  OccupancyDto, 
  PaymentBreakdownDto 
} from "../../Types/Reports/Response";
import { ReportsApi } from "../../API Data/Reports/ReportsAPi";
import toast from "react-hot-toast";
import { reportKeys } from "../Keys/useReportsKeys";

export const useGetKpis = (params: BaseReportRequest) => {
  return useQuery<SuccessResult<KpiSummaryDto>, FailResult>({
    queryKey: reportKeys.kpis(params),
    queryFn: () => ReportsApi.getKpis(params),
    enabled: !!params.startDate && !!params.endDate, 
  });
};

export const useGetPayments = (params: BaseReportRequest) => {
  return useQuery<SuccessResult<PaymentBreakdownDto>, FailResult>({
    queryKey: reportKeys.payments(params),
    queryFn: () => ReportsApi.getPayments(params),
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useGetOccupancy = (params: BaseReportRequest) => {
  return useQuery<SuccessResult<OccupancyDto>, FailResult>({
    queryKey: reportKeys.occupancy(params),
    queryFn: () => ReportsApi.getOccupancy(params),
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useGetBookingsReport = (params: Pagination & BaseReportRequest) => {
  return useQuery<SuccessResult<PagedResult<BookingReportItemDto>>, FailResult>({
    queryKey: reportKeys.bookings(params),
    queryFn: () => ReportsApi.getBookings(params),
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useExportDataMutation = () => {
  return useMutation<Blob, FailResult, BaseReportRequest>({
    mutationKey: [...reportKeys.all, "export"], 
    mutationFn: ReportsApi.exportData,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report-data.xlsx"); 
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("تم تحميل الملف بنجاح!")
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء تصدير البيانات:"+ error.error);
    },
  });
};