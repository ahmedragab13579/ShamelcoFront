import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetPitch } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import type { SubmitReviewCommand } from "../../../BackEndIntegration/Types/Reviews/Request";
import FieldImage from "../../Images/Filed.jpg";
import { useSubmitReviewMutation } from "../../../BackEndIntegration/Hooks/Mutations/useReviewMutations";


export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const result = useGetPitch(asGUID(id!));
  const { mutate } = useSubmitReviewMutation();

  const [ratingHover, setRatingHover] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewDescription, setReviewDescription] = useState<string>("");
  
  const [showDetails, setShowDetails] = useState<boolean>(false);

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
    mutate(review);
  }

  if (result.isLoading) {
    return <Loading text="جارى جلب البيانات" />;
  }

  if (result.isError || !result.data) {
    return <Error text="حدث خطأ فى جلب البيانات" />;
  }

  const place = result.data.data;

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-24 md:pb-8">
      {/* صورة الغلاف وزر الرجوع */}
      <div className="relative w-full h-64 md:h-80 bg-shamelco-darker">
        <img
          src={place.mainImage||FieldImage}
          alt={place.name}
          className="w-full h-full object-cover opacity-90"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-md border border-shamelco-dark/5 p-5 md:p-6">
          {/* رأس البطاقة */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-status-success/10 text-status-success text-xs font-bold rounded-lg">
                  {place.type}
                </span>
                {/* شارة حالة الفتح/الإغلاق الحالية */}
                <span className={`inline-block px-2 py-1 text-[10px] font-bold rounded-md ${place.isOpen ? 'bg-status-success text-white' : 'bg-status-danger/10 text-status-danger'}`}>
                  {place.isOpen ? "مفتوح الآن" : "مغلق الآن"}
                </span>
              </div>
              <h1 className="text-2xl font-black text-shamelco-darker leading-tight">
                {place.name}
              </h1>
            </div>

            <div className="flex flex-col items-center bg-shamelco-bg px-3 py-2 rounded-xl border border-shamelco-dark/5">
              <span className="text-lg font-black text-shamelco-darker">
                {place.rating}
              </span>
              <div className="flex text-shamelco-gold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-shamelco-dark/60 text-sm mt-3">
            <svg className="w-5 h-5 text-status-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{place.address}</span>
          </div>

          {/* التفاصيل القابلة للطي (Accordion) */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showDetails ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-3 border-t border-shamelco-dark/5 pt-4">
              
              {/* بطاقة السعة */}
              <div className="bg-shamelco-bg rounded-xl p-3 flex items-start gap-3">
                <div className="bg-status-success/20 text-status-success p-2 rounded-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-shamelco-dark/40 mb-0.5">سعة الملعب</div>
                  <div className="text-sm font-bold text-shamelco-dark">{place.capacity} لاعبين</div>
                </div>
              </div>

              {/* بطاقة مواعيد العمل */}
              <div className="bg-shamelco-bg rounded-xl p-3 flex items-start gap-3">
                <div className="bg-status-success/20 text-status-success p-2 rounded-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-shamelco-dark/40 mb-0.5">مواعيد العمل</div>
                  <div className="text-sm font-bold text-shamelco-dark dir-ltr text-right">{place.openIn} - {place.closeIn}</div>
                </div>
              </div>

              {/* بطاقة حالة الملعب الكلية */}
              <div className="bg-shamelco-bg rounded-xl p-3 flex items-start gap-3 col-span-2">
                <div className="bg-status-success/20 text-status-success p-2 rounded-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-shamelco-dark/40 mb-0.5">حالة الملعب</div>
                  <div className="text-sm font-bold text-shamelco-dark">{place.status}</div>
                </div>
              </div>

            </div>
          </div>

          {/* زر تبديل العرض */}
          <div className="mt-4 border-t border-shamelco-dark/5 pt-4 flex justify-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-shamelco-accent font-bold text-sm hover:text-shamelco-darker underline underline-offset-4 flex items-center gap-1 transition-all"
            >
              {showDetails ? 'إخفاء التفاصيل' : 'عرض كل التفاصيل والمرافق'}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* قسم التقييمات */}
        <div className="bg-white rounded-2xl shadow-sm border border-shamelco-dark/5 p-5 md:p-6 mt-6">
          <h3 className="text-lg font-bold text-shamelco-darker mb-4">
            أضف تقييمك للمكان ⭐
          </h3>

          <div className="flex items-center gap-1 mb-4 flex-row-reverse justify-end">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setRatingHover(star)}
                onMouseLeave={() => setRatingHover(0)}
                onClick={() => setRatingValue(star)}
              >
                <svg
                  className={`w-8 h-8 transition-colors duration-200 ${
                    star <= (ratingHover || ratingValue)
                      ? "text-shamelco-gold"
                      : "text-shamelco-dark/20"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            placeholder="اكتب تجربتك هنا... (اختياري)"
            value={reviewDescription}
            onChange={handleDescriptionChange}
            className="w-full bg-shamelco-bg border border-shamelco-dark/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-shamelco-accent/20 focus:border-shamelco-accent outline-none transition-all resize-none mb-3"
          ></textarea>

          <button
            disabled={ratingValue === 0}
            onClick={HandleReviewSubmit}
            className="w-full py-2.5 bg-shamelco-dark/5 text-shamelco-dark hover:bg-shamelco-dark/10 hover:text-shamelco-darker font-bold rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إرسال التقييم
          </button>
        </div>
      </div>

      {/* شريط السعر والحجز الثابت بالأسفل */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-shamelco-dark/10 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50 md:sticky md:bottom-0 md:mt-8 md:max-w-3xl md:mx-auto md:rounded-t-2xl md:border-l md:border-r">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div>
            <div className="text-xs text-shamelco-dark/60 mb-0.5">سعر الساعة يبدأ من</div>
            <div className="font-black text-shamelco-darker text-xl">
              {place.hourlyRate} <span className="text-sm font-normal text-shamelco-dark/60">ج.م</span>
            </div>
          </div>
          <Link to={"booking?type=pitch"} relative="path">
            <button className="bg-status-success hover:bg-status-success/90 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-md transition-all active:scale-95">
              احجز الآن
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}