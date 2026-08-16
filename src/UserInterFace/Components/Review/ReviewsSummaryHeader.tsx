import { Star } from "lucide-react";
import type { ReviewDto } from "../../../BackEndIntegration/Types/Reviews/Response";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface ReviewsSummaryHeaderProps {
  reviews: ReviewDto[];
  totalCount?: number;
  title?: string;
  subtitle?: string;
}

export default function ReviewsSummaryHeader({
  reviews,
  totalCount,
  title,
  subtitle,
}: ReviewsSummaryHeaderProps) {
  const { t } = useLanguage();

  const count = totalCount ?? reviews.length;
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  // Calculate rating breakdown distribution
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[star] = (distribution[star] || 0) + 1;
  });

  return (
    <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 md:p-8 shadow-xs mb-6">
      {title && (
        <div className="mb-6 border-b border-shamelco-border/60 pb-3">
          <h2 className="text-xl md:text-2xl font-black text-shamelco-darker">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs md:text-sm text-shamelco-muted font-semibold mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Rating KPI Card */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-shamelco-bg rounded-2xl border border-shamelco-border text-center">
          <span className="text-4xl md:text-5xl font-black text-shamelco-darker mb-2">
            {averageRating}
          </span>

          <div className="flex text-shamelco-gold mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-current"
                    : "text-shamelco-border opacity-40"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-shamelco-muted">
            {t("messages.TOTAL_REVIEWS") || "إجمالي التقييمات"}: {count}
          </span>
        </div>

        {/* Rating Breakdown Progress Bars */}
        <div className="md:col-span-7 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const starCount = distribution[star] || 0;
            const percentage = reviews.length > 0 ? (starCount / reviews.length) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3 text-xs font-bold">
                <div className="flex items-center gap-1 w-12 text-shamelco-darker shrink-0">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 text-shamelco-gold fill-current" />
                </div>

                <div className="flex-1 h-2.5 bg-shamelco-bg rounded-full overflow-hidden border border-shamelco-border/60">
                  <div
                    className="h-full bg-shamelco-gold rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-8 text-end text-shamelco-muted shrink-0">
                  {starCount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
