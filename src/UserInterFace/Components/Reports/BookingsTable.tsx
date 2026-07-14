import { format } from "date-fns";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";
import type Pagination from "../../../BackEndIntegration/Types/shared/Paganation";
import { useGetBookingsReport } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import DataTable,  { type  Column } from "../Common/DataTable"; 
import { useLanguage } from "../../Hooks/Shared/useLanguage";

type Props = { params: BaseReportRequest & Pagination };

export const BookingsTable = ({ params }: Props) => {
  const { data, isLoading } = useGetBookingsReport(params);
  const { t } = useLanguage();

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'مكتمل': return t('messages.STATUS_COMPLETED');
      case 'Confirmed':
      case 'مؤكد': return t('messages.STATUS_CONFIRMED');
      case 'Cancelled':
      case 'Canceled':
      case 'ملغي': return t('messages.STATUS_CANCELLED');
      case 'Pending':
      case 'معلق': return t('messages.STATUS_PENDING');
      case 'InProgress':
      case 'جاري الآن': return t('messages.STATUS_IN_PROGRESS');
      case 'CheckedIn':
      case 'تم الحضور': return t('messages.STATUS_CHECKED_IN');
      case 'NoShow':
      case 'لم يحضر': return t('messages.STATUS_NO_SHOW');
      default: return status;
    }
  };

  const columns: Column<any>[] = [
    { header: t('messages.CUSTOMER_NAME'), accessorKey: "customerName" },
    { header: t('messages.ENTITY'), accessorKey: "entityName" },
    { 
      header: t('messages.BOOKING_DATE'), 
      cell: (row) => format(new Date(row.bookingDate), 'yyyy/MM/dd') 
    },
    { 
      header: t('messages.AMOUNT'), 
      cell: (row) => <span className="font-bold text-shamelco-accent">{row.totalAmount} {t('messages.CURRENCY')}</span> 
    },
    { header: t('messages.PAYMENT_METHOD'), accessorKey: "paymentMethod" },
    { 
      header: t('messages.STATUS'), 
      cell: (row) => {
        const status = row.status;
        let statusClass = "bg-shamelco-bg text-shamelco-muted border-shamelco-border";
        if (status === "مكتمل" || status === "Completed" || status === "مؤكد" || status === "Confirmed") {
          statusClass = "bg-status-success/10 text-status-success border-status-success/20";
        } else if (status === "ملغي" || status === "Canceled" || status === "Cancelled") {
          statusClass = "bg-status-danger/10 text-status-danger border-status-danger/20";
        } else if (status === "معلق" || status === "Pending") {
          statusClass = "bg-status-warning/10 text-status-warning border-status-warning/20";
        }
        return (
          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${statusClass}`}>
            {getStatusTranslation(status)}
          </span>
        );
      }
    },
  ];

  if (isLoading) return <div className="p-8 text-center text-shamelco-dark/60">{t('messages.LOADING_DATA_DOTS')}</div>;
  
  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-shamelco-darker">{t('messages.DETAILED_BOOKING_HISTORY')}</h3>
      </div>
      <DataTable 
        data={data?.data?.items || []} 
        columns={columns} 
        isLoading={isLoading}
        keyExtractor={(item) => item.bookingId.toString()}
      />
    </div>
  );
};