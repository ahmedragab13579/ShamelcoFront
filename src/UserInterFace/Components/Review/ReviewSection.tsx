import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Loader2, Edit3 } from "lucide-react";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import type { PlaceType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import type { ReviewDto } from "../../../BackEndIntegration/Types/Reviews/Response";
import {
  useSubmitReviewMutation,
  useUpdateReviewMutation,
} from "../../../BackEndIntegration/Hooks/Mutations/useReviewMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewSectionProps {
  placeId: GUID;
  placeType: PlaceType;
  existingReview?: ReviewDto | null;
}

export default function ReviewSection({
  placeId,
  placeType,
  existingReview,
}: ReviewSectionProps) {
  const { t } = useLanguage();
  const [ratingHover, setRatingHover] = useState<number>(0);

  const submitMutation = useSubmitReviewMutation();
  const updateMutation = useUpdateReviewMutation();

  const isPending = submitMutation.isPending || updateMutation.isPending;
  const isEditing = Boolean(existingReview && existingReview.id);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: existingReview?.rating || 0,
      comment: existingReview?.comment || "",
    },
  });

  const ratingValue = watch("rating");

  useEffect(() => {
    if (existingReview) {
      reset({
        rating: existingReview.rating || 0,
        comment: existingReview.comment || "",
      });
    }
  }, [existingReview, reset]);

  const onSubmit = (data: ReviewFormData) => {
    if (isEditing && existingReview?.id) {
      updateMutation.mutate({
        reviewId: asGUID(existingReview.id),
        rating: data.rating,
        comment: data.comment,
        placeId,
        placeType: placeType === "Pitch" ? "Pitch" : "Venue",
      });
    } else {
      submitMutation.mutate({
        placeId: asGUID(placeId),
        placeType,
        rating: data.rating,
        comment: data.comment,
      });
    }
  };

  return (
    <div className="bg-shamelco-surface rounded-3xl shadow-xs border border-shamelco-border p-6 md:p-8 mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-shamelco-darker flex items-center gap-2">
          {isEditing ? (
            <>
              <Edit3 className="w-5 h-5 text-shamelco-accent" />
              <span>{t("messages.EDIT_YOUR_RATING")}</span>
            </>
          ) : (
            <span>{t("messages.ADD_YOUR_RATING_STAR")}</span>
          )}
        </h3>

        {isEditing && (
          <span className="text-xs font-bold px-3 py-1 bg-shamelco-accent/10 text-shamelco-accent rounded-full border border-shamelco-accent/20">
            {t("messages.YOUR_RATING")}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Rating Stars Controller */}
        <Controller
          name="rating"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="mb-4">
              <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none cursor-pointer active:scale-90 transition-transform p-0.5"
                    onMouseEnter={() => setRatingHover(star)}
                    onMouseLeave={() => setRatingHover(0)}
                    onClick={() => onChange(star)}
                    aria-label={`${star} ${t("messages.STARS")}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= (ratingHover || value)
                          ? "text-shamelco-gold fill-current"
                          : "text-shamelco-border"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-xs text-status-danger mt-1 font-semibold">
                  {errors.rating.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Comment Textarea Controller */}
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              placeholder={t("messages.WRITE_YOUR_EXPERIENCE_OPTIONAL")}
              className="w-full bg-shamelco-bg border border-shamelco-border rounded-2xl p-4 text-sm focus:ring-4 focus:ring-shamelco-accent/10 focus:border-shamelco-accent focus:bg-shamelco-surface outline-none transition-all resize-none mb-4 font-semibold text-shamelco-darker"
            />
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={ratingValue === 0 || isPending}
          className="w-full py-3.5 bg-shamelco-accent hover:bg-shamelco-dark text-white font-black rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{t("messages.SENDING")}</span>
            </>
          ) : isEditing ? (
            <span>{t("messages.UPDATE_RATING")}</span>
          ) : (
            <span>{t("messages.SUBMIT_RATING")}</span>
          )}
        </button>
      </form>
    </div>
  );
}
