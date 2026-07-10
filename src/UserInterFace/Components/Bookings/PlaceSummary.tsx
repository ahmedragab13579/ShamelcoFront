import { Gamepad2, Trophy, Banknote } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response";
import { Image } from "../Common/Image";

export const PlaceSummary = ({ place, placeCategory }: { place: PlaceSearchDto, placeCategory: string }) => (
  // ضفنا كلاس "group" هنا عشان أي hover على الكارت يشغل زووم الصورة
  <div className="bg-white p-3 rounded-2xl border border-shamelco-dark/10 shadow-sm flex items-center gap-4 mb-6 transition-shadow hover:shadow-md group cursor-default">
    
    {/* هنا السر: عملنا حاوية ثابتة للصورة بمقاسات محددة عشان متبوظش التصميم */}
    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-shamelco-bg">
      <Image item={place}/>
    </div>

    {/* حاوية النصوص خدت flex-1 عشان تاخد باقي المساحة بشكل مرتب */}
    <div className="flex flex-col flex-1">
      <span className="flex items-center gap-1.5 text-[10px] font-bold text-shamelco-accent bg-shamelco-accent/10 px-2 py-1 rounded-md mb-1.5 w-fit">
        {placeCategory === "Pitch" ? (
          <>
            <Trophy className="w-3.5 h-3.5" />
            ملعب رياضي
          </>
        ) : (
          <>
            <Gamepad2 className="w-3.5 h-3.5" />
            صالة / كافيه
          </>
        )}
      </span>
      
      {/* اسم المكان */}
      <h2 className="font-bold text-shamelco-darker text-base sm:text-lg line-clamp-1">
        {place?.name}
      </h2>
      
      {/* السعر */}
      <div className="flex items-center gap-1.5 text-sm font-black text-shamelco-dark mt-1">
        <Banknote className="w-4 h-4 text-shamelco-gold" />
        {place?.startingPrice} ج.م / الساعة
      </div>
    </div>
  </div>
);