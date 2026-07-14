import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response"; 
import { Image } from "../Common/Image";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface PlaceCardProps {
  item: PlaceSearchDto;
  className?: string; 
}

export default function PlaceCard({ item, className = "" }: PlaceCardProps) {
  const type: string = item.placeType === "Pitch" ? "pitches" : "venues";
  const { t } = useLanguage();
  
  return (
    <Link
      to={`/${type}/${item.id}`}
      // استخدام الكارت الأبيض مع حدود ناعمة تتغير للذهبي مع الهوفر
      className={`bg-shamelco-surface rounded-2xl overflow-hidden border border-shamelco-border shadow-2xs group cursor-pointer hover:shadow-md hover:border-shamelco-gold transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="relative h-40 overflow-hidden bg-shamelco-sand">
        {/* تأثير زووم ناعم للصورة عند الهوفر */}
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
          <Image item={item} />
        </div>
        
        {/* بادج التقييم: تم تعديله ليأخذ اللون الذهبي الفاتح كخلفية لتمييز الـ 10% */}
        <div className="absolute top-2.5 end-2.5 bg-shamelco-gold-soft/95 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs border border-shamelco-gold/30">
          <span className="text-xs font-black text-shamelco-darker">
            {item.rating}
          </span>
          <Star className="w-3.5 h-3.5 text-shamelco-gold fill-shamelco-gold animate-pulse" />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* نوع المكان باللون البترولي الفخم */}
          <div className="text-xs font-bold text-shamelco-accent mb-1 tracking-wide">
            {item.placeType === "Pitch" ? t('messages.PITCHES') : t('messages.VENUES_AND_STORES')}
          </div>
          
          <h3 className="font-bold text-shamelco-darker text-base mb-3 truncate group-hover:text-shamelco-accent transition-colors">
            {item.name}
          </h3>
        </div>
        
        {/* السعر في أسفل الكارت */}
        <div className="flex items-center justify-between pt-2 border-t border-shamelco-border/60">
          <div className="text-shamelco-muted text-xs font-medium">{t('messages.STARTING_PRICE_FROM')}</div>
          <div className="font-black text-shamelco-darker text-lg group-hover:text-shamelco-accent transition-colors">
            {item.startingPrice}{" "}
            <span className="text-[10px] text-shamelco-muted font-bold">
              {t('messages.CURRENCY')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}