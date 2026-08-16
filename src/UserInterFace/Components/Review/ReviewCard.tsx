import { Star, Edit3, Calendar } from "lucide-react";
import type { ReviewDto } from "../../../BackEndIntegration/Types/Reviews/Response";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface ReviewCardProps {
  review: ReviewDto;
  onEdit?: (review: ReviewDto) => void;
  showPlaceName?: boolean;
}

export default function ReviewCard({
  review,
  onEdit,
  showPlaceName = false,
}: ReviewCardProps) {
  const { currentLang } = useLanguage();

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(
        currentLang === "ar" ? "ar-EG" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "";

  return (
    <div className="bg-shamelco-surface rounded-2xl border border-shamelco-border p-5 shadow-xs hover:border-shamelco-gold/40 transition-all duration-200 flex flex-col justify-between gap-3">
      {/* Card Header: Rating + Place/User Name + Date */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Rating Stars & Value */}
          <div className="flex items-center gap-1.5 bg-shamelco-bg px-3 py-1 rounded-xl border border-shamelco-border">
            <span className="text-sm font-black text-shamelco-darker">
              {review.rating}
            </span>
            <div className="flex text-shamelco-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < review.rating ? "fill-current" : "text-shamelco-border opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Date */}
          {formattedDate && (
            <div className="flex items-center gap-1 text-xs text-shamelco-muted font-medium" dir="ltr">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        {/* Place Name if requested */}
        {showPlaceName && review.placeName && (
          <h4 className="text-base font-black text-shamelco-darker mb-1">
            {review.placeName}
          </h4>
        )}

        {/* Review Comment */}
        <p className="text-sm font-semibold text-shamelco-dark/80 whitespace-pre-line mt-2 leading-relaxed">
          {review.comment || (
            <span className="italic text-shamelco-muted text-xs">
              (لا يوجد تعليق مكتوب)
            </span>
          )}
        </p>
      </div>

      {/* Edit Action Button */}
      {onEdit && (
        <div className="pt-2 border-t border-shamelco-border/50 flex justify-end">
          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-shamelco-accent/10 text-shamelco-accent hover:bg-shamelco-accent hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>تحديث التقييم</span>
          </button>
        </div>
      )}
    </div>
  );
}
