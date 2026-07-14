import { Gamepad2, Trophy, Banknote } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response";
import { Image } from "../Common/Image";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export const PlaceSummary = ({ place, placeCategory }: { place: PlaceSearchDto, placeCategory: string }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-shamelco-surface p-4 rounded-lg border border-shamelco-border shadow-sm flex items-center gap-4 mb-6 transition-all duration-200">
      
      {/* حاوية الصورة ثابتة ومقصوصة بشكل احترافي */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-md overflow-hidden bg-shamelco-bg border border-shamelco-border/50">
        <Image item={place} />
      </div>

      {/* تفاصيل المكان */}
      <div className="flex flex-col flex-1 gap-1">
        <span className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-sm w-fit ${
          placeCategory === "Pitch" 
            ? "bg-shamelco-gold/20 text-shamelco-gold" 
            : "bg-shamelco-border text-shamelco-darker"
        }`}>
          {placeCategory === "Pitch" ? (
            <>
              <Trophy className="w-3 h-3" />
              {t('messages.SPORTS_PITCH')}
            </>
          ) : (
            <>
              <Gamepad2 className="w-3 h-3" />
              {t('messages.LOUNGE_CAFE')}
            </>
          )}
        </span>
        
        <h2 className="font-black text-shamelco-darker text-base sm:text-lg leading-tight line-clamp-1">
          {place?.name}
        </h2>
        
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-shamelco-muted">
          <Banknote className="w-4 h-4 text-shamelco-gold" />
          <span>
            {place?.startingPrice} {t('messages.CURRENCY')} <span className="font-normal text-shamelco-muted/70">/ {t('messages.HOUR')}</span>
          </span>
        </div>
      </div>
    </div>
  );
};