import { useParams } from "react-router-dom";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import Loading from "../../../Components/Common/Loading";
import Error from "../../../Components/Common/Error";
import { usePitchDashboardQuery } from "../../../../BackEndIntegration/Hooks/Queries/useDashboardQueries";
import type { Column } from "../../../Components/Common/DataTable";
import DataTable from "../../../Components/Common/DataTable";
import type { BookingDto } from "../../../../BackEndIntegration/Types/Bookings/Response";
import type { ActiveSessionDto } from "../../../../BackEndIntegration/Types/Sessions/Response";




const activeSessionsColumns: Column<ActiveSessionDto>[] = [
  {
    header: "اسم اللاعب/العميل",
    accessorKey: "customerName",
  },
  {
    header: "وقت البداية",
    accessorKey: "startTime",
    cell: (row) => <span className="text-shamelco-accent font-semibold">{row.startTime}</span>,
  },
  {
    header: "المدة (بالدقائق)",
    accessorKey: "durationInMinutes",
  },
  {
    header: "المبلغ المدفوع",
    accessorKey: "paidAmount",
    cell: (row) => <span>{row.paidAmount} ج.م</span>,
  },
  {
    header: "الحالة",
    cell: () => (
      <span className="bg-status-success/15 text-status-success px-3 py-1 rounded-full text-xs font-bold">
        نشط الآن
      </span>
    ),
  },
];

 const upcomingBookingsColumns: Column<BookingDto>[] = [
  {
    header: "اسم العميل",
    accessorKey: "customerName",
    cell: (row) => <span className="font-semibold text-shamelco-darker">{row.customerName}</span>,
  },
  {
    header: "تاريخ الحجز",
    accessorKey: "bookingDate",
    cell: (row) => (
      <span className="text-shamelco-dark">
        {new Date(row.bookingDate).toLocaleDateString('ar-EG')}
      </span>
    ),
  },
  {
    header: "الوقت",
    cell: (row) => (
      <span className="text-shamelco-accent font-bold block" dir="ltr">
        {row.startTime} - {row.endTime}
      </span>
    ),
  },
  {
    header: "حالة الدفع",
    accessorKey: "paymentStatus",
    cell: (row) => {
      const status = row.paymentStatus || "";
      const isPaid = status.toLowerCase().includes("paid") || status === "Completed";
      
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            isPaid ? "bg-status-success/15 text-status-success" : "bg-status-danger/10 text-status-danger"
          }`}
        >
          {row.paymentStatus || "لم يتم الدفع  "} 
        </span>
      );
    },
  },
  {
    header: "إجراءات",
    cell: (row) => (
      <div className="flex gap-3">
        <button
          onClick={() => console.log("عرض التفاصيل:", row.bookingId)}
          className="text-shamelco-dark hover:text-shamelco-darker text-xs font-semibold underline"
        >
          تفاصيل
        </button>
        
        {row.canCancel ? (
          <button
            onClick={() => console.log("إلغاء الحجز:", row.bookingId)}
            className="text-status-danger hover:text-status-danger/90 text-xs font-semibold underline"
          >
            إلغاء
          </button>
        ) : (
          <span className="text-shamelco-dark/40 text-xs">غير قابل للإلغاء</span>
        )}
      </div>
    ),
  },
];

export default function PitchDashboard() {
  const { id } = useParams<{ id: string }>();

  const pitchQuery = usePitchDashboardQuery(id as GUID);

  if (pitchQuery.isLoading) {
    return <Loading text="جار تحميل البيانات " />;
  }

  if (pitchQuery.isError || !pitchQuery.data) {
    return <Error text=" عذراً، لم نتمكن من جلب بيانات هذا الملعب." />;
  }

  return (
    <div
      className="space-y-8 p-6 text-right bg-shamelco-light/10 min-h-screen"
      dir="rtl"
    >
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-2xl font-black text-shamelco-darker">
          نظرة عامة على الملعب
        </h2>
        <p className="text-shamelco-dark text-sm">
          متابعة الإيرادات اليومية، الجلسات النشطة، والحجوزات القادمة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-dark block mb-2">
            الإيرادات اليومية (إجمالي)
          </span>
          <span className="text-3xl font-black text-shamelco-darker">
            {pitchQuery.data.data.totalDailyRevenue}{" "}
            <span className="text-lg font-bold text-shamelco-accent">ج.م</span>
          </span>
        </div>

        <div className="bg-shamelco-darker p-6 rounded-2xl border border-shamelco-dark shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-shamelco-light block mb-2">
            الجلسات النشطة حالياً
          </span>
          <span className="text-3xl font-black text-shamelco-light">
            {pitchQuery.data.data.activeSessions.length}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-dark block mb-2">
            الحجوزات القادمة
          </span>
          <span className="text-3xl font-black text-shamelco-accent">
            {pitchQuery.data.data.upcomingBookings.length}
          </span>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-shamelco-accent/20">
        <h3 className="text-xl font-bold text-shamelco-darker">الجلسات النشطة ⏱️</h3>
        <DataTable
          data={pitchQuery.data.data.activeSessions}
          columns={activeSessionsColumns}
          keyExtractor={(row) => row.id} 
        />
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-shamelco-darker">
          الحجوزات القادمة 📅
        </h3>
        <DataTable
          data={pitchQuery.data.data.upcomingBookings}
          columns={upcomingBookingsColumns}
          keyExtractor={(row) => row.bookingId} 
        />
      </div>
    </div>
  );
}