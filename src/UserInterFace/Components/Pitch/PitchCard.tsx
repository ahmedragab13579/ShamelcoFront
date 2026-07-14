import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; 
import type { MiniPitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import padelCourt from "../../Images/modern_panoramic_padel_tennis_court_at_eveni.jpg";
import soccerField from "../../Images/premium_synthetic_turf_football_field_at_nig.jpg";
import tennisCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.jpg";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

function Image({ name, type, mainImage }: MiniPitchDto) {
  const defaultImage = mainImage 
    ? mainImage 
    : type === "Padel" 
      ? padelCourt 
      : type === "Tennis" 
        ? tennisCourt 
        : soccerField;
  return (
    <img
      src={defaultImage}
      alt={name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

export default function PitchCard({ id, name, type, mainImage }: MiniPitchDto) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/pitches/${id}`}
      className="bg-shamelco-surface border border-shamelco-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-shamelco-accent transition-all duration-300 group block active:scale-[0.99]"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative h-48 sm:h-auto sm:w-2/5 md:w-1/3 overflow-hidden">
          <Image id={id} mainImage={mainImage} name={name} type={type} />
        </div>

        {/* تفاصيل الملعب */}
        <div className="p-4 sm:w-3/5 md:w-2/3 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black px-3 py-1 bg-shamelco-accent/10 text-shamelco-accent rounded-lg border border-shamelco-accent/25">
                {type}
              </span>
            </div>
            <h3 className="text-lg font-black text-shamelco-darker mb-1 leading-snug">{name}</h3>
          </div>

          {/* زر عرض المواعيد */}
          <div className="flex items-center justify-end mt-auto border-t border-shamelco-border pt-3">
            <div className="flex items-center gap-1.5 bg-shamelco-gold text-shamelco-darker text-xs font-black py-2.5 px-4 rounded-xl hover:bg-shamelco-gold-hover transition-all duration-300 shadow-3xs">
              <span>{t('messages.VIEW_SLOTS')}</span>
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}