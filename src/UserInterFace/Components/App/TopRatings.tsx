import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, ChevronLeft } from "lucide-react"; // استدعاء الأيقونات الجديدة
import { useTopRatedPlacesQuery } from "../../../BackEndIntegration/Hooks/Queries/useCustomerQueries.ts";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import PlaceCard from "./PlaceCard.tsx"; 
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response.ts";

interface TopRatingProps {
  showViewAll?: boolean ;
  withPagination?: boolean ;
  initialPageSize?: number ;
}

export default function TopRating({ 
  showViewAll = false, 
  withPagination = true, 
  initialPageSize = 20 
}: TopRatingProps) {
  
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(initialPageSize);

  const { data, isLoading, isError } = useTopRatedPlacesQuery({ page, pageSize });

  if (isLoading) {
    return <Loading text="جار تحميل البيانات" />;
  }

  if (isError) {
    return <Error text="حدث خطأ أثناء جلب بيانات الملاعب." />;
  }

  const items = data?.data?.items || [];

  return (
    <section className="pb-6">
      {/* الهيدر: بيظهر فيه "عرض الكل" لو بعتنا true */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-shamelco-darker">
          الأعلى تقييماً 
          {/* أيقونة النار بلون التحذير (البرتقالي) لتلفت الانتباه */}
          <Flame className="w-5 h-5 text-status-warning fill-status-warning/20" />
        </h2>
        {showViewAll && (
          <Link
            to="/top-ratings"
            // اللون الأزرق البترولي وبيقلب لدهبي مع الهوفر
            className="text-sm font-bold text-shamelco-accent hover:text-shamelco-gold transition-colors"
          >
            عرض الكل
          </Link>
        )}
      </div>

      <div 
        className={`px-4 pb-4 ${
          withPagination 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "flex gap-4 overflow-x-auto hide-scrollbar snap-x"
        }`}
      >
        {items.map((item: PlaceSearchDto) => (
          <PlaceCard key={item.id} item={item} />
        ))}
      </div>

      {withPagination && (
        <div className="flex items-center justify-center gap-4 mt-6 px-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            // زرار "السابق" بياخد خلفية فاتحة جداً ونص غامق
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold bg-shamelco-dark/5 text-shamelco-darker rounded-lg hover:bg-shamelco-dark/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            السابق
          </button>
          
          <span className="text-sm font-bold text-shamelco-darker">
            صفحة {page}
          </span>
          
          <button
            onClick={() => setPage((prev) => prev + 1)}
            // زرار "التالي" بياخد أغمق لون عشان يبان إنه الأكشن الأساسي
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold bg-shamelco-darker text-white rounded-lg hover:bg-shamelco-dark transition-colors"          
          >
            التالي
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}