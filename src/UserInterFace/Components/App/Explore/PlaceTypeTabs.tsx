import { MdSportsSoccer, MdSportsEsports } from "react-icons/md";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface PlaceTypeTabsProps {
  activePlaceType: string;
  onPlaceTypeChange: (type: string) => void;
}

export default function PlaceTypeTabs({ activePlaceType, onPlaceTypeChange }: PlaceTypeTabsProps) {
  const { t } = useLanguage();

  return (
    <div className="flex bg-shamelco-dark/5 p-1 rounded-xl mb-4">
      <button
        onClick={() => onPlaceTypeChange("Pitch")}
        className={`flex flex-1 items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
          activePlaceType === "Pitch"
            ? "bg-shamelco-darker text-shamelco-gold shadow-md" // التاب النشط: كحلي غامق مع نص دهبي
            : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" // التاب غير النشط: أزرق بترولي
        }`}
      >
        <MdSportsSoccer size={20} />
        {t('messages.PITCHES')}
      </button>

      <button
        onClick={() => onPlaceTypeChange("Venue")}
        className={`flex flex-1 items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
          activePlaceType === "Venue"
            ? "bg-shamelco-darker text-shamelco-gold shadow-md" 
            : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" 
        }`}
      >
        <MdSportsEsports size={20} />
        {t('messages.VENUES_AND_STORES')}
      </button>
    </div>
  );
}