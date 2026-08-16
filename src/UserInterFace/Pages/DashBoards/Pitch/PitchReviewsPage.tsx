import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import { useGetReviewsByPlace } from "../../../../BackEndIntegration/Hooks/Queries/useReviewQueries";
import ReviewCard from "../../../Components/Review/ReviewCard";
import ReviewsSummaryHeader from "../../../Components/Review/ReviewsSummaryHeader";
import Error from "../../../Components/Common/Error";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function PitchReviewsPage() {
  const { id } = useParams<{ id: string }>();
  const pitchId = asGUID(id || "00000000-0000-0000-0000-000000000000");
  const { t } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const { data, isLoading, isError } = useGetReviewsByPlace(pitchId, {
    page,
    pageSize,
  });

  if (isLoading) {
    return <ReviewsPageSkeleton />;
  }

  if (isError || !data?.data) {
    return <Error text={t("messages.ERROR_FETCHING_DATA") || "تعذر تحميل تقييمات الملعب"} />;
  }

  const pagedResult = data.data;
  const reviews = pagedResult.items || [];
  const totalPages = pagedResult.totalPages || 1;

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-start bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-1 pb-2 border-b border-shamelco-border/60">
        <h2 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight flex items-center gap-2">
          <Star className="w-7 h-7 text-shamelco-gold fill-current" />
          <span>{t("messages.PITCH_REVIEWS") || "تقييمات الملعب"}</span>
        </h2>
        <p className="text-shamelco-muted text-sm sm:text-base font-semibold">
          {t("messages.PITCH_REVIEWS_DESC") || "استعراض وتقييمات العملاء وآرائهم حول الملعب"}
        </p>
      </div>

      {/* Summary KPI Header */}
      {reviews.length > 0 && (
        <ReviewsSummaryHeader
          reviews={reviews}
          totalCount={pagedResult.totalCount}
        />
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-12 text-center shadow-xs">
          <Star className="w-12 h-12 text-shamelco-gold/40 mx-auto mb-3" />
          <h3 className="text-lg font-black text-shamelco-darker mb-1">
            {t("messages.NO_REVIEWS_YET") || "لا توجد تقييمات لهذا الملعب حتى الآن"}
          </h3>
          <p className="text-sm text-shamelco-muted font-medium">
            سيتم عرض آراء وتقييمات اللاعبين هنا فور إضافتها.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2.5 rounded-xl border border-shamelco-border bg-shamelco-surface text-shamelco-darker disabled:opacity-40 disabled:cursor-not-allowed hover:bg-shamelco-bg transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>

          <span className="text-sm font-bold text-shamelco-darker px-4">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2.5 rounded-xl border border-shamelco-border bg-shamelco-surface text-shamelco-darker disabled:opacity-40 disabled:cursor-not-allowed hover:bg-shamelco-bg transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewsPageSkeleton() {
  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="h-10 w-64 bg-shamelco-border/50 rounded-lg" />
      <div className="h-44 bg-shamelco-surface rounded-3xl border border-shamelco-border" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-shamelco-surface rounded-2xl border border-shamelco-border"
          />
        ))}
      </div>
    </div>
  );
}
