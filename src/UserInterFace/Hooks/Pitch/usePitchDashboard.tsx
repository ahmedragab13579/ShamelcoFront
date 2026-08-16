import { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { usePitchDashboardQuery } from "../../../BackEndIntegration/Hooks/Queries/useDashboardQueries";
import type { Column } from "../../Components/Common/DataTable";
import type { BookingDto } from "../../../BackEndIntegration/Types/Bookings/Response";
import type { ActiveSessionDto } from "../../../BackEndIntegration/Types/Sessions/Response";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function usePitchDashboard() {
  const { id } = useParams<{ id: string }>();
  const pitchQuery = usePitchDashboardQuery(id as GUID);
  const { t, currentLang } = useLanguage();

  const activeSessionsColumns = useMemo<Column<ActiveSessionDto>[]>(() => [
    {
      header: t('messages.PLAYER_OR_CUSTOMER_NAME'),
      accessorKey: "customerName",
      cell: (row) => <span className="font-bold text-shamelco-darker">{row.customerName}</span>,
    },
    {
      header: t('messages.START_TIME'),
      accessorKey: "startTime",
      cell: (row) => (
        <span className="text-shamelco-accent dark:text-shamelco-sky font-bold" dir="ltr">
          {row.startTime}
        </span>
      ),
    },
    {
      header: t('messages.DURATION_MINUTES'),
      accessorKey: "durationInMinutes",
      cell: (row) => <span className="font-semibold text-shamelco-muted">{row.durationInMinutes} دقيقة</span>,
    },
    {
      header: t('messages.PAID_AMOUNT'),
      accessorKey: "paidAmount",
      cell: (row) => (
        <span className="font-bold text-shamelco-darker">
          {row.paidAmount} <span className="text-xs text-shamelco-muted font-normal">{t('messages.CURRENCY')}</span>
        </span>
      ),
    },
    {
      header: t('messages.STATUS'),
      cell: () => (
        <span className="bg-status-success/15 text-status-success border border-status-success/20 px-3 py-1 rounded-full text-xs font-bold inline-block shadow-2xs">
          {t('messages.ACTIVE_NOW')}
        </span>
      ),
    },
  ], [t]);

  const upcomingBookingsColumns = useMemo<Column<BookingDto>[]>(() => [
    {
      header: t('messages.CUSTOMER_NAME'),
      accessorKey: "customerName",
      cell: (row) => <span className="font-bold text-shamelco-darker">{row.customerName}</span>,
    },
    {
      header: t('messages.BOOKING_DATE'),
      accessorKey: "bookingDate",
      cell: (row) => (
        <span className="text-shamelco-muted font-semibold">
          {new Date(row.bookingDate).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US')}
        </span>
      ),
    },
    {
      header: t('messages.TIME'),
      cell: (row) => (
        <span className="text-shamelco-accent dark:text-shamelco-sky font-bold block" dir="ltr">
          {row.startTime} - {row.endTime}
        </span>
      ),
    },
    {
      header: t('messages.PAYMENT_STATUS'),
      accessorKey: "paymentStatus",
      cell: (row) => {
        const status = row.paymentStatus || "";
        const isPaid = status.toLowerCase().includes("paid") || status === "Completed";
        
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold inline-block border ${
              isPaid 
                ? "bg-status-success/15 text-status-success border-status-success/20" 
                : "bg-status-danger/10 text-status-danger border-status-danger/20"
            }`}
          >
            {row.paymentStatus || t('messages.UNPAID')} 
          </span>
        );
      },
    },
    {
      header: t('messages.ACTIONS'),
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log("عرض التفاصيل:", row.bookingId)}
            className="text-shamelco-accent dark:text-shamelco-sky hover:text-shamelco-gold text-xs font-bold underline transition-colors cursor-pointer focus-visible:outline-shamelco-gold rounded"
          >
            {t('messages.DETAILS')}
          </button>
          
          {row.canCancel ? (
            <button
              onClick={() => console.log("إلغاء الحجز:", row.bookingId)}
              className="text-status-danger hover:text-status-danger/80 text-xs font-bold underline transition-colors cursor-pointer focus-visible:outline-status-danger rounded"
            >
              {t('messages.CANCEL')}
            </button>
          ) : (
            <span className="text-shamelco-muted/70 text-xs font-semibold">{t('messages.NON_CANCELLABLE')}</span>
          )}
        </div>
      ),
    },
  ], [t, currentLang]);

  return {
    pitchQuery,
    activeSessionsColumns,
    upcomingBookingsColumns,
    t,
  };
}
