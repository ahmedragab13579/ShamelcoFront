import React from "react";
import { Inbox } from "lucide-react"; // أيقونة للحالة اللي مفيش فيها بيانات
import Loading from "./Loading"; 

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  keyExtractor?: (row: T) => string | number; 
}

export default function DataTable<T>({
  data,
  columns,
  isLoading,
  keyExtractor,
}: DataTableProps<T>) {
  
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-sm border border-shamelco-dark/10 overflow-hidden">
        <Loading text="جاري تحميل البيانات..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      // تحسين شكل الـ Empty State بأيقونة وتوسيط العناصر
      <div className="flex flex-col items-center justify-center gap-3 w-full p-12 text-center bg-white rounded-2xl shadow-sm border border-shamelco-dark/10">
        <Inbox className="w-12 h-12 text-shamelco-dark/20" strokeWidth={1.5} />
        <span className="text-shamelco-dark/60 font-medium">
          لا توجد بيانات لعرضها.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-shamelco-dark/10">
      <table className="w-full text-sm text-right text-shamelco-darker">
        {/* هيدر الجدول أخد خلفية شفافة من اللون الغامق والنص باللون الأزرق البترولي */}
        <thead className="text-xs uppercase bg-shamelco-dark/5 text-shamelco-accent border-b border-shamelco-dark/10">
          <tr>
            {columns.map((col) => (
               <th key={(col.accessorKey as string) || col.header} scope="col" className="px-6 py-4 font-bold">  
                  {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowKey = keyExtractor ? keyExtractor(row) : rowIndex;
            
            return (
              <tr
                key={rowKey}
                className="border-b border-shamelco-dark/5 hover:bg-shamelco-dark/5 transition-colors"
              >
                {columns.map((col) => (
                   <td key={(col.accessorKey as string) || col.header} className="px-6 py-4">
                      {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                      ? String(row[col.accessorKey] ?? "-")
                      : "-"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}