import type { BaseReportRequest } from "../../Types/Reports/Requests";
import type Pagination from "../../Types/shared/Paganation";

export const reportKeys = {
  all: ["reports"] as const,
  kpis: (params: BaseReportRequest) => [...reportKeys.all, "kpis", params] as const,
  payments: (params: BaseReportRequest) => [...reportKeys.all, "payments", params] as const,
  occupancy: (params: BaseReportRequest) => [...reportKeys.all, "occupancy", params] as const,
  bookings: (params: Pagination & BaseReportRequest) => [...reportKeys.all, "bookings", params] as const,
};