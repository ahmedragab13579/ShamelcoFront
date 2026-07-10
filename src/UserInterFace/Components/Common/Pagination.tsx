import { ChevronRight, ChevronLeft } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        // زرار "السابق": سهم لليمين عشان الـ RTL، وألوان هادية بتقرأ من الثيم
        className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-shamelco-darker bg-white border border-shamelco-dark/10 rounded-lg hover:bg-shamelco-dark/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
        السابق
      </button>

      {/* رقم الصفحة باللون الأساسي الغامق */}
      <span className="text-sm font-bold text-shamelco-darker">
        الصفحة {currentPage} من {totalPages > 0 ? totalPages : 1}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        // زرار "التالي": سهم لليسار، ونفس الستايل عشان يبقوا متوازنين
        className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-shamelco-darker bg-white border border-shamelco-dark/10 rounded-lg hover:bg-shamelco-dark/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        التالي
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
}