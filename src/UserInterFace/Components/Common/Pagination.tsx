import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

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
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-shamelco-darker bg-shamelco-surface border border-shamelco-border rounded-xl hover:bg-shamelco-bg hover:text-shamelco-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-3xs"
      >
        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
        {t('messages.PREVIOUS')}
      </button>

      {/* رقم الصفحة باللون الأساسي الغامق */}
      <span className="text-sm font-black text-shamelco-darker">
        {t('messages.PAGE')} {currentPage} {t('messages.OF')} {totalPages > 0 ? totalPages : 1}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-shamelco-darker bg-shamelco-surface border border-shamelco-border rounded-xl hover:bg-shamelco-bg hover:text-shamelco-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-3xs"
      >
        {t('messages.NEXT')}
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
      </button>
    </div>
  );
}