import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useGetOccupancy } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";

export const OccupancyChart = ({ params }: { params: BaseReportRequest }) => {
  const { data, isLoading } = useGetOccupancy(params);

  if (isLoading) return <div className="h-64 flex items-center justify-center text-shamelco-dark">جاري التحميل...</div>;
  if (!data?.data) return null;

  const rawData = Array.isArray(data.data) ? data.data : [data.data];
  
  const chartData = rawData.map(item => ({
    ...item,
    periodFormatted: format(new Date(item.period), 'MM/dd') // اختصار التاريخ عشان مياخدش مساحة
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/10">
      <h3 className="text-lg font-bold text-shamelco-darker mb-6">معدل الإشغال</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            {/* Grid بخطوط خفيفة جداً */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="periodFormatted" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            {/* Tooltip مخصص بستايل السيستم */}
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ fill: '#f1f5f9' }} 
            />
            <Bar 
              dataKey="bookingCount" 
              fill="#064663" // لون Accent الخاص بشاميلكو
              radius={[6, 6, 0, 0]} 
              name="عدد الحجوزات" 
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};