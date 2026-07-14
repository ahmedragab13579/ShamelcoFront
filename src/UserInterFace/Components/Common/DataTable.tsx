import React from "react";
import { Inbox } from "lucide-react"; // أيقونة للحالة اللي مفيش فيها بيانات
import Loading from "./Loading"; 
import { useLanguage } from "../../Hooks/Shared/useLanguage";

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
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="w-full bg-shamelco-surface rounded-2xl shadow-sm border border-shamelco-border overflow-hidden">
        <Loading text={t('messages.LOADING_DATA_DOTS')} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      // تحسين شكل الـ Empty State بأيقونة وتوسيط العناصر
      <div className="flex flex-col items-center justify-center gap-3 w-full p-12 text-center bg-shamelco-surface rounded-2xl shadow-sm border border-shamelco-border">
        <Inbox className="w-12 h-12 text-shamelco-muted/30" strokeWidth={1.5} />
        <span className="text-shamelco-muted font-medium">
          {t('messages.NO_DATA_TO_DISPLAY')}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-shamelco-surface rounded-2xl shadow-sm border border-shamelco-border">
      <table className="w-full text-sm text-start text-shamelco-darker">
        {/* هيدر الجدول أخد خلفية شفافة من اللون الغامق والنص باللون الأزرق البترولي */}
        <thead className="text-xs uppercase bg-shamelco-bg text-shamelco-accent border-b border-shamelco-border">
          <tr>
            {columns.map((col) => (
               <th key={(col.accessorKey as string) || col.header} scope="col" className="px-6 py-4 font-bold text-start">  
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
                className="border-b border-shamelco-border hover:bg-shamelco-bg transition-colors"
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