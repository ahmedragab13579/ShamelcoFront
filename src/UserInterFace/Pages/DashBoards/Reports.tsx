import  { useState } from "react";
import { Download, Filter } from "lucide-react";
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
export default function ReportsPage() {
  const {id} = useParams();
  const {type} = useParams();
  const [params, setParams] = useState<BaseReportRequest & Pagination>({
    Id : asGUID(id||"00000000-0000-0000-0000-000000000000"),
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
    <div className="min-h-screen bg-shamelco-light p-6 md:p-10 font-sans" dir="rtl">
      {/* الترويسة وأدوات التحكم */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-shamelco-darker">لوحة التقارير الشاملة</h1>
          <p className="text-shamelco-dark mt-1">نظرة عامة على أداء نظام Shamelco</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-shamelco-dark/20">
          <div className="flex items-center gap-2 px-2 text-shamelco-dark">
            <Filter size={20} />
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-sm"
              value={params.startDate?.toISOString().split('T')[0]}
              onChange={(e) => setParams({...params, startDate: new Date(e.target.value)})}
            />
            <span>-</span>
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-sm"
              value={params.endDate?.toISOString().split('T')[0]}
              onChange={(e) => setParams({...params, endDate: new Date(e.target.value)})}
            />
          </div>
          <button 
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="flex items-center gap-2 bg-shamelco-accent hover:bg-shamelco-dark transition-colors text-white px-4 py-2 rounded-md font-medium text-sm disabled:opacity-50"
          >
            <Download size={18} />
            {exportMutation.isPending ? 'جاري التصدير...' : 'تصدير التقرير'}
          </button>
        </div>
      </div>

      <KpiCards params={params} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyChart params={params} />
        <PaymentChart params={params} />
      </div>

      <BookingsTable params={params} />
    </div>
  );
}