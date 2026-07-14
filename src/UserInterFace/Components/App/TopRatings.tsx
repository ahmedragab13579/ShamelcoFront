import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, ChevronLeft } from "lucide-react"; 
import { useTopRatedPlacesQuery } from "../../../BackEndIntegration/Hooks/Queries/useCustomerQueries.ts";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import PlaceCard from "./PlaceCard.tsx"; 
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response.ts";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface TopRatingProps {
  showViewAll?: boolean;
  withPagination?: boolean;
  initialPageSize?: number;
  useSkeleton?: boolean;
}

export default function TopRating({ 
  showViewAll = false, 
  withPagination = true, 
  initialPageSize = 20,
  useSkeleton = false
}: TopRatingProps) {
  
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(initialPageSize);
  const { t } = useLanguage();

  const { data, isLoading, isError, isFetching } = useTopRatedPlacesQuery({ page, pageSize });

  if (isLoading) {
    if (useSkeleton) {
      return (
        <section className="pb-8">
          <div className="flex items-center justify-between px-4 md:px-6 mb-4">
            <div className="h-6 w-32 bg-shamelco-border rounded-md animate-pulse" />
            {showViewAll && <div className="h-6 w-16 bg-shamelco-border rounded-md animate-pulse" />}
          </div>
          <div 
            className={`px-4 md:px-6 pb-4 ${
              withPagination 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" 
                : "flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2"
            }`}
          >
            {[1, 2, 3, 4].map((n) => (
              <div 
                key={n} 
                className={`bg-shamelco-surface border border-shamelco-border rounded-2xl p-4 space-y-3 shadow-2xs animate-pulse ${
                  !withPagination ? "min-w-[280px] sm:min-w-[320px] snap-start" : ""
                }`}
              >
                <div className="bg-shamelco-sand rounded-xl h-40 w-full" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 bg-shamelco-border/60 rounded-md w-1/4" />
                  <div className="h-5 bg-shamelco-border rounded-md w-3/4" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-shamelco-border/40">
                  <div className="h-3 bg-shamelco-border/60 rounded-md w-1/3" />
                  <div className="h-5 bg-shamelco-border rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }
    return <Loading text={t('messages.LOADING_DATA')} />;
  }

  if (isError) {
    return <Error text={t('messages.ERROR_LOADING_PITCHES')} />;
  }

  const items = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const hasNextPage = data?.data?.hasNextPage ?? page < totalPages;

  return (
    <section className="pb-8">
      {/* الهيدر */}
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-black text-shamelco-darker tracking-tight">
          {t('messages.TOP_RATED')} 
          <Flame className="w-5 h-5 text-shamelco-gold fill-shamelco-gold animate-pulse" />
        </h2>
        
        {showViewAll && (
          <Link
            to="/top-ratings"
            className="px-3 py-1.5 rounded-xl text-sm font-bold text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-gold-soft transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
          >
            {t('messages.VIEW_ALL')}
          </Link>
        )}
      </div>

      {/* قائمة الكروت مع تأثير خفيف أثناء تحميل الصفحة التالية (Pagination Fetching) */}
      <div 
        className={`px-4 md:px-6 pb-4 transition-opacity duration-200 ${isFetching ? "opacity-60 pointer-events-none" : "opacity-100"} ${
          withPagination 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" 
            : "flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-2"
        }`}
      >
        {items.map((item: PlaceSearchDto) => (
          <div key={item.id} className={!withPagination ? "min-w-[280px] sm:min-w-[320px] snap-start" : ""}>
            <PlaceCard item={item} />
          </div>
        ))}
      </div>

      {/* أزرار التنقل (Pagination) */}
      {withPagination && (
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 px-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || isFetching}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-shamelco-surface border border-shamelco-border text-shamelco-darker rounded-xl hover:bg-shamelco-sand hover:border-shamelco-muted disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-shamelco-surface disabled:hover:border-shamelco-border transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t('messages.PREVIOUS')}</span>
          </button>
          
          <div className="flex items-center gap-1.5 bg-shamelco-gold-soft px-3.5 py-2 rounded-xl border border-shamelco-gold/30 shadow-2xs">
            <span className="text-xs text-shamelco-muted font-bold">{t('messages.PAGE')}</span>
            <span className="text-sm font-black text-shamelco-darker">{page}</span>
            {totalPages > 1 && (
              <>
                <span className="text-xs text-shamelco-muted font-bold">{t('messages.OF')}</span>
                <span className="text-sm font-black text-shamelco-darker">{totalPages}</span>
              </>
            )}
          </div>
          
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage || isFetching}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-black bg-shamelco-darker text-shamelco-surface rounded-xl hover:bg-shamelco-accent disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-shamelco-darker transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <span>{t('messages.NEXT')}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}
    </section>
  );
}