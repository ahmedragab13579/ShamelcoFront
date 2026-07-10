import { TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { useGetKpis } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";

export const KpiCards = ({ params }: { params: BaseReportRequest }) => {
  const { data, isLoading, isError } = useGetKpis(params);

  if (isLoading) return <div className="p-4 text-shamelco-dark">جاري تحميل المؤشرات...</div>;
  if (isError || !data) return <div className="p-4 text-status-danger">حدث خطأ أثناء تحميل المؤشرات</div>;

  const kpis = data.data; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* إجمالي الإيرادات - لون النجاح (بترولي/أخضر هادي) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/10 border-r-4 border-r-shamelco-accent flex items-center justify-between">
        <div>
          <p className="text-shamelco-dark/70 text-sm font-bold mb-1">إجمالي الإيرادات</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalRevenue} <span className="text-sm font-medium">ر.س</span></h3>
        </div>
        <div className="bg-shamelco-accent/10 p-3 rounded-full text-shamelco-accent">
          <TrendingUp size={24} />
        </div>
      </div>

      {/* الحجوزات المكتملة - لون التمام (أخضر هادي من الثيم) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/10 border-r-4 border-r-status-success flex items-center justify-between">
        <div>
          <p className="text-shamelco-dark/70 text-sm font-bold mb-1">الحجوزات المكتملة</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalCompletedBookings}</h3>
        </div>
        <div className="bg-status-success/10 p-3 rounded-full text-status-success">
          <CheckCircle size={24} />
        </div>
      </div>

      {/* الحجوزات الملغاة - لون الخطر (أحمر هادي) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/10 border-r-4 border-r-status-danger flex items-center justify-between">
        <div>
          <p className="text-shamelco-dark/70 text-sm font-bold mb-1">الحجوزات الملغاة</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalCanceledBookings}</h3>
        </div>
        <div className="bg-status-danger/10 p-3 rounded-full text-status-danger">
          <XCircle size={24} />
        </div>
      </div>

    </div>
  );
};