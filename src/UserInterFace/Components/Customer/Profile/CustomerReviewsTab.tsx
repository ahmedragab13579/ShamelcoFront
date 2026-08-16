import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import type { ReviewDto } from "../../../../BackEndIntegration/Types/Reviews/Response";
import { useGetReviewsByCustomer } from "../../../../BackEndIntegration/Hooks/Queries/useReviewQueries";
import ReviewCard from "../../Review/ReviewCard";
import ReviewSection from "../../Review/ReviewSection";
import ReviewsSummaryHeader from "../../Review/ReviewsSummaryHeader";
import Error from "../../Common/Error";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface CustomerReviewsTabProps {
  userId: GUID;
}

export default function CustomerReviewsTab({ userId }: CustomerReviewsTabProps) {
  const { t } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const [selectedReview, setSelectedReview] = useState<ReviewDto | null>(null);

  const { data, isLoading, isError } = useGetReviewsByCustomer(userId, {
    page,
    pageSize,
  });

  if (isLoading) {
    return <CustomerReviewsSkeleton />;
  }

  if (isError || !data?.data) {
    return <Error text={t("messages.ERROR_FETCHING_DATA") || "تعذر تحميل التقييمات"} />;
  }

  const pagedResult = data.data;
  const reviews = pagedResult.items || [];
  const totalPages = pagedResult.totalPages || 1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reviews Summary Header */}
      {reviews.length > 0 && (
        <ReviewsSummaryHeader
          reviews={reviews}
          totalCount={pagedResult.totalCount}
          title={t("messages.MY_REVIEWS") || "تقييماتي"}
          subtitle="سجل جميع التقييمات والآراء التي قمت بتقديمها للملاعب والأماكن"
        />
      )}

      {/* Edit Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border max-w-lg w-full p-6 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 start-4 bg-shamelco-bg p-2 rounded-full text-shamelco-muted hover:text-shamelco-darker transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <ReviewSection
              placeId={asGUID("00000000-0000-0000-0000-000000000000")}
              placeType="Pitch"
              existingReview={selectedReview}
            />
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-12 text-center shadow-xs">
          <Star className="w-12 h-12 text-shamelco-gold/40 mx-auto mb-3" />
          <h3 className="text-lg font-black text-shamelco-darker mb-1">
            {t("messages.NO_REVIEWS_YET") || "لا توجد تقييمات حتى الآن"}
          </h3>
          <p className="text-sm text-shamelco-muted font-medium">
            لم تقم بتقديم أي تقييم للملاعب أو أماكن الترفيه حتى الآن.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showPlaceName={true}
              onEdit={(r) => setSelectedReview(r)}
            />
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

function CustomerReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
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
