import { format } from "date-fns";
import type { BaseReportRequest } from "../../../BackEndIntegration/Types/Reports/Requests";
import type Pagination from "../../../BackEndIntegration/Types/shared/Paganation";
import { useGetBookingsReport } from "../../../BackEndIntegration/Hooks/Queries/useReportsQueries";
import DataTable,  { type  Column } from "../Common/DataTable"; // استخدام الـ DataTable الموحد

type Props = { params: BaseReportRequest & Pagination };

export const BookingsTable = ({ params }: Props) => {
  const { data, isLoading } = useGetBookingsReport(params);

  const columns: Column<any>[] = [
    { header: "اسم العميل", accessorKey: "customerName" },
    { header: "الكيان", accessorKey: "entityName" },
    { 
      header: "تاريخ الحجز", 
      cell: (row) => format(new Date(row.bookingDate), 'yyyy/MM/dd') 
    },
    { 
      header: "المبلغ", 
      cell: (row) => <span className="font-bold text-shamelco-accent">{row.totalAmount} ر.س</span> 
    },
    { header: "طريقة الدفع", accessorKey: "paymentMethod" },
    { 
      header: "الحالة", 
      cell: (row) => (
        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-shamelco-dark/5 text-shamelco-darker border border-shamelco-dark/10">
          {row.status}
        </span>
      )
    },
  ];

  if (isLoading) return <div className="p-8 text-center text-shamelco-dark/60">جاري تحميل البيانات...</div>;
  
  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-shamelco-darker">سجل الحجوزات المفصل</h3>
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