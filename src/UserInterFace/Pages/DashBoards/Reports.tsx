import { useState } from "react";
import { Download, Filter, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";
import { useExportDataMutation } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import { KpiCards } from "../../Components/Reports/KPICards";
import { PaymentChart } from "../../Components/Reports/PaymentBreakdown Chart";
import { OccupancyChart } from "../../Components/Reports/OccupancyChart";
import { BookingsTable } from "../../Components/Reports/BookingsTable";
import type Pagination from "../../../BackEndIntegration/Types/shared/Paganation";
import type { PlaceType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ReportsPage() {
  const { t } = useLanguage();
  const { id, type } = useParams();
  
  const [params, setParams] = useState<BaseReportRequest & Pagination>({
    Id: asGUID(id || "00000000-0000-0000-0000-000000000000"),
    type: type as PlaceType, 
    startDate: new Date(new Date().setDate(1)), 
    endDate: new Date(), 
    page: 1,
    pageSize: 10,
  });

  const exportMutation = useExportDataMutation();

  const handleExport = () => {
    exportMutation.mutate(params, {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Report_${new Date().getTime()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-shamelco-bg p-4 sm:p-6 md:p-8 font-sans space-y-6 sm:space-y-8 transition-colors duration-200 animate-in fade-in duration-500">
      
      {/* الترويسة وأدوات التحكم - متوافقة مع الموبايل والديسكتوب */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-shamelco-border">
        <div className="text-start">
          <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight">
            {t('messages.COMPREHENSIVE_REPORTS_DASH')}
          </h1>
          <p className="text-shamelco-muted text-sm sm:text-base font-semibold mt-1">
            {t('messages.SHAMELCO_PERFORMANCE_OVERVIEW')}
          </p>
        </div>

        {/* شريط الفلتر والتصدير - مجهز بالكامل للـ Dark Mode والموبايل */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-shamelco-surface p-2 rounded-lg shadow-sm border border-shamelco-border shrink-0">
          
          <div className="flex items-center gap-2 px-3 py-1 text-shamelco-muted w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 shrink-0">
              <Filter size={18} className="text-shamelco-gold shrink-0" />
              <span className="text-xs font-bold hidden md:inline">{t('messages.FILTER') || "الفترة:"}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                aria-label="Start Date"
                className="bg-shamelco-bg sm:bg-transparent border border-shamelco-border sm:border-none rounded px-2 py-1 outline-none text-shamelco-darker font-bold text-xs sm:text-sm cursor-pointer focus:ring-2 focus:ring-shamelco-gold/30"
                value={params.startDate?.toISOString().split('T')[0]}
                onChange={(e) => setParams({...params, startDate: new Date(e.target.value), page: 1})}
              />
              <span className="text-shamelco-muted font-bold">-</span>
              <input 
                type="date" 
                aria-label="End Date"
                className="bg-shamelco-bg sm:bg-transparent border border-shamelco-border sm:border-none rounded px-2 py-1 outline-none text-shamelco-darker font-bold text-xs sm:text-sm cursor-pointer focus:ring-2 focus:ring-shamelco-gold/30"
                value={params.endDate?.toISOString().split('T')[0]}
                onChange={(e) => setParams({...params, endDate: new Date(e.target.value), page: 1})}
              />
            </div>
          </div>

          <div className="w-full sm:w-px h-px sm:h-8 bg-shamelco-border hidden sm:block"></div>

          {/* زرار التصدير - اللون الذهبي المميز للأكشن */}
          <button 
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker px-5 py-2.5 rounded-md font-black text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-gold active:scale-[0.98] cursor-pointer focus-visible:outline-shamelco-gold shrink-0"
          >
            {exportMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin text-current shrink-0" />
                <span>{t('messages.EXPORTING')}</span>
              </>
            ) : (
              <>
                <Download size={16} className="shrink-0" />
                <span>{t('messages.EXPORT_REPORT')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* بطاقات المؤشرات الرئيسية */}
      <section aria-label="KPI Metrics">
        <KpiCards params={params} />
      </section>

      {/* الرسوم البيانية */}
      <section aria-label="Analytics Charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-shamelco-surface p-4 sm:p-6 rounded-lg border border-shamelco-border shadow-sm">
          <OccupancyChart params={params} />
        </div>
        <div className="bg-shamelco-surface p-4 sm:p-6 rounded-lg border border-shamelco-border shadow-sm">
          <PaymentChart params={params} />
        </div>
      </section>

      {/* جدول الحجوزات */}
      <section aria-label="Bookings List" className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-sm overflow-hidden">
        <BookingsTable params={params} />
      </section>
    </div>
  );
}