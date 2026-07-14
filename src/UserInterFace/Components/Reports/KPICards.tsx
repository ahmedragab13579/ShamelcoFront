import { TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { useGetKpis } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export const KpiCards = ({ params }: { params: BaseReportRequest }) => {
  const { data, isLoading, isError } = useGetKpis(params);
  const { t } = useLanguage();

  if (isLoading) return <div className="p-4 text-shamelco-dark">{t('messages.LOADING_KPIS')}</div>;
  if (isError || !data) return <div className="p-4 text-status-danger">{t('messages.ERROR_LOADING_KPIS')}</div>;

  const kpis = data.data; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* إجمالي الإيرادات */}
      <div className="bg-shamelco-surface p-6 rounded-2xl shadow-sm border border-shamelco-border border-e-4 border-e-shamelco-accent flex items-center justify-between">
        <div>
          <p className="text-shamelco-muted text-sm font-bold mb-1">{t('messages.TOTAL_REVENUE')}</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalRevenue} <span className="text-sm font-medium">{t('messages.CURRENCY')}</span></h3>
        </div>
        <div className="bg-shamelco-accent/10 p-3 rounded-full text-shamelco-accent">
          <TrendingUp size={24} />
        </div>
      </div>

      {/* الحجوزات المكتملة */}
      <div className="bg-shamelco-surface p-6 rounded-2xl shadow-sm border border-shamelco-border border-e-4 border-e-status-success flex items-center justify-between">
        <div>
          <p className="text-shamelco-muted text-sm font-bold mb-1">{t('messages.COMPLETED_BOOKINGS')}</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalCompletedBookings}</h3>
        </div>
        <div className="bg-status-success/10 p-3 rounded-full text-status-success">
          <CheckCircle size={24} />
        </div>
      </div>

      {/* الحجوزات الملغاة */}
      <div className="bg-shamelco-surface p-6 rounded-2xl shadow-sm border border-shamelco-border border-e-4 border-e-status-danger flex items-center justify-between">
        <div>
          <p className="text-shamelco-muted text-sm font-bold mb-1">{t('messages.CANCELLED_BOOKINGS')}</p>
          <h3 className="text-2xl font-black text-shamelco-darker">{kpis.totalCanceledBookings}</h3>
        </div>
        <div className="bg-status-danger/10 p-3 rounded-full text-status-danger">
          <XCircle size={24} />
        </div>
      </div>

    </div>
  );
};