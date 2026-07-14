import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetPayments } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

// ألوان متناسقة مع هوية شاميلكو (بترولي، كحلي، وذهبي)
const COLORS = ['#064663', '#112B3C', '#D4AF37']; 

export const PaymentChart = ({ params }: { params: BaseReportRequest }) => {
  const { data, isLoading } = useGetPayments(params);
  const { t } = useLanguage();

  if (isLoading) return <div className="h-64 flex items-center justify-center text-shamelco-dark">{t('messages.LOADING_DATA_DOTS')}</div>;
  if (!data?.data) return null;

  const chartData = [
    { name: t('messages.CASH'), value: data.data.cashTotal },
    { name: t('messages.ELECTRONIC'), value: data.data.electronicTotal },
    { name: t('messages.DEFERRED'), value: data.data.deferredTotal },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-shamelco-dark/10">
      <h3 className="text-lg font-bold text-shamelco-darker mb-4">{t('messages.PAYMENT_BREAKDOWN')}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={8}
              cornerRadius={8}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};