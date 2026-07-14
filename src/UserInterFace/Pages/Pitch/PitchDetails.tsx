import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetPitch } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Error from "../../Components/Common/Error";
import type { SubmitReviewCommand } from "../../../BackEndIntegration/Types/Reviews/Request";
import soccerField from "../../Images/premium_synthetic_turf_football_field_at_nig.jpg";
import padelCourt from "../../Images/modern_panoramic_padel_tennis_court_at_eveni.jpg";
import tennisCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.jpg";
import { useSubmitReviewMutation } from "../../../BackEndIntegration/Hooks/Mutations/useReviewMutations";
import { Loader2, Star, MapPin, Users, Clock, ShieldCheck, ChevronDown, ChevronLeft } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const result = useGetPitch(asGUID(id!));
  const { mutate, isPending } = useSubmitReviewMutation();

  const [ratingHover, setRatingHover] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewDescription, setReviewDescription] = useState<string>("");
  
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { t } = useLanguage();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewDescription(e.target.value);
  };

  function HandleReviewSubmit() {
    const review: SubmitReviewCommand = {
      placeId: asGUID(id||"00000000-0000-0000-0000-000000000000"),
      placeType: "Pitch",
      rating: ratingValue,
      comment: reviewDescription,
    };
    mutate(review, {
      onSuccess: () => {
        setRatingValue(0);
        setReviewDescription("");
      }
    });
  }

  if (result.isLoading) {
    return <PlaceDetailsSkeleton />;
  }

  if (result.isError || !result.data) {
    return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  }

  const place = result.data.data;
  
  const getFallback = (type: string) => {
    if (type === "Padel") return padelCourt;
    if (type === "Tennis") return tennisCourt;
    return soccerField;
  };

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8 font-sans animate-fade-in">
      {/* صورة الغلاف وزر الرجوع */}
      <div className="relative w-full h-64 md:h-80 bg-shamelco-darker">
        <img
          src={place.mainImage || getFallback(place.type)}
          alt={place.name}
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            e.currentTarget.src = getFallback(place.type);
          }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 start-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/40 active:scale-90 transition-all cursor-pointer shadow-sm flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-shamelco-surface rounded-3xl shadow-sm border border-shamelco-border p-5 md:p-8">
          {/* رأس البطاقة */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-block px-3 py-1 bg-shamelco-accent/10 text-shamelco-accent text-xs font-bold rounded-lg border border-shamelco-accent/20">
                  {place.type}
                </span>
                {/* شارة حالة الفتح/الإغلاق الحالية */}
                <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg shadow-3xs ${place.isOpen ? 'bg-status-success text-white' : 'bg-status-danger/15 text-status-danger'}`}>
                  {place.isOpen ? t('messages.OPEN_NOW') : t('messages.CLOSED_NOW')}
                </span>
              </div>
              <h1 className="text-2xl font-black text-shamelco-darker leading-tight">
                {place.name}
              </h1>
            </div>

            <div className="flex flex-col items-center bg-shamelco-bg px-4 py-2.5 rounded-2xl border border-shamelco-border">
              <span className="text-lg font-black text-shamelco-darker">
                {place.rating}
              </span>
              <div className="flex text-shamelco-gold">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-shamelco-dark/70 text-sm mt-4">
            <MapPin className="w-5 h-5 text-status-success shrink-0" />
            <span className="font-medium">{place.address}</span>
          </div>

          {/* التفاصيل القابلة للطي (Accordion) */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showDetails ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-3 border-t border-shamelco-border pt-4">
              
              {/* بطاقة السعة */}
              <div className="bg-shamelco-bg rounded-2xl p-3.5 flex items-start gap-3 border border-shamelco-border">
                <div className="bg-status-success/15 text-status-success p-2 rounded-xl shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-shamelco-muted mb-0.5 font-bold">{t('messages.PITCH_CAPACITY')}</div>
                  <div className="text-sm font-black text-shamelco-darker">{place.capacity} {t('messages.PLAYERS')}</div>
                </div>
              </div>

              {/* بطاقة مواعيد العمل */}
              <div className="bg-shamelco-bg rounded-2xl p-3.5 flex items-start gap-3 border border-shamelco-border">
                <div className="bg-status-success/15 text-status-success p-2 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-shamelco-muted mb-0.5 font-bold">{t('messages.WORKING_HOURS')}</div>
                  <div className="text-sm font-black text-shamelco-darker text-start">{place.openIn} - {place.closeIn}</div>
                </div>
              </div>

              {/* بطاقة حالة الملعب الكلية */}
              <div className="bg-shamelco-bg rounded-2xl p-3.5 flex items-start gap-3 col-span-2 border border-shamelco-border">
                <div className="bg-status-success/15 text-status-success p-2 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-shamelco-muted mb-0.5 font-bold">{t('messages.PITCH_STATUS_TOTAL')}</div>
                  <div className="text-sm font-black text-shamelco-darker">{place.status}</div>
                </div>
              </div>

            </div>
          </div>

          {/* زر تبديل العرض */}
          <div className="mt-4 border-t border-shamelco-border pt-4 flex justify-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-shamelco-accent font-black text-sm hover:text-shamelco-dark focus:outline-none flex items-center gap-1 transition-all cursor-pointer active:scale-95"
            >
              <span>{showDetails ? t('messages.HIDE_DETAILS') : t('messages.VIEW_DETAILS_AND_FACILITIES')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </div>
        </div>

        {/* قسم التقييمات */}
        <div className="bg-shamelco-surface rounded-3xl shadow-xs border border-shamelco-border p-6 md:p-8 mt-6 animate-fade-in">
          <h3 className="text-lg font-black text-shamelco-darker mb-4">
            {t('messages.ADD_YOUR_RATING_STAR')}
          </h3>

          <div className="flex items-center gap-1.5 mb-4 flex-row-reverse justify-end">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none cursor-pointer active:scale-90 transition-transform"
                onMouseEnter={() => setRatingHover(star)}
                onMouseLeave={() => setRatingHover(0)}
                onClick={() => setRatingValue(star)}
                aria-label={`${star} ${t('messages.STARS')}`}
              >
                <Star
                  className={`w-8 h-8 transition-colors duration-200 ${
                    star <= (ratingHover || ratingValue)
                      ? "text-shamelco-gold fill-current"
                      : "text-shamelco-border"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            placeholder={t('messages.WRITE_YOUR_EXPERIENCE_OPTIONAL')}
            value={reviewDescription}
            onChange={handleDescriptionChange}
            className="w-full bg-shamelco-bg border border-shamelco-border rounded-2xl p-4 text-sm focus:ring-4 focus:ring-shamelco-accent/10 focus:border-shamelco-accent focus:bg-shamelco-surface outline-none transition-all resize-none mb-4 font-semibold text-shamelco-darker"
          ></textarea>

          <button
            disabled={ratingValue === 0 || isPending}
            onClick={HandleReviewSubmit}
            className="w-full py-3.5 bg-shamelco-accent hover:bg-shamelco-dark text-white font-black rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>{t('messages.SENDING')}</span>
              </>
            ) : (
              <span>{t('messages.SUBMIT_RATING')}</span>
            )}
          </button>
        </div>
      </div>

      {/* شريط السعر والحجز الثابت بالأسفل */}
      <div className="fixed bottom-0 start-0 end-0 bg-shamelco-surface border-t border-shamelco-border p-4 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.08)] z-50 md:sticky md:bottom-4 md:mt-8 md:max-w-3xl md:mx-auto md:rounded-3xl md:border md:mb-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto px-2">
          <div>
            <div className="text-xs text-shamelco-muted mb-0.5 font-bold">{t('messages.HOURLY_RATE_STARTS_FROM')}</div>
            <div className="font-black text-shamelco-accent text-xl">
              {place.hourlyRate} <span className="text-sm font-normal text-shamelco-muted">{t('messages.CURRENCY')}</span>
            </div>
          </div>
          <Link to={"booking?type=pitch"} relative="path">
            <button className="bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker font-black text-base px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer">
              {t('messages.BOOK_NOW')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlaceDetailsSkeleton() {
  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8 font-sans animate-pulse">
      {/* هيرو الغلاف */}
      <div className="w-full h-64 md:h-80 bg-shamelco-sand relative" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 space-y-6">
        {/* تفاصيل الهيكل */}
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-shamelco-border/50 rounded-md" />
                <div className="h-5 w-20 bg-shamelco-border/40 rounded-md" />
              </div>
              <div className="h-7 w-48 bg-shamelco-border rounded-md" />
            </div>
            <div className="h-12 w-12 bg-shamelco-sand rounded-xl" />
          </div>

          <div className="h-4 w-60 bg-shamelco-border/60 rounded-md" />
          
          <div className="h-10 w-full bg-shamelco-sand rounded-xl" />
        </div>

        {/* تقييمات الهيكل */}
        <div className="bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="h-5 w-32 bg-shamelco-border rounded-md" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-7 h-7 rounded-full bg-shamelco-sand" />
            ))}
          </div>
          <div className="h-20 bg-shamelco-sand rounded-2xl w-full" />
          <div className="h-12 bg-shamelco-border/55 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}