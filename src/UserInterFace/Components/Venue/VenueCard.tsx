import { Link } from "react-router-dom";
import { Info } from "lucide-react"; 
import type { MiniVenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import sportsCafe from "../../Images/premium_synthetic_turf_cozy_cafe_interior_mo.jpg";
import billiardLounge from "../../Images/billiard_table_in_a_modern_lounge_clo.jpg";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

function Image({ name, type, mainImage }: MiniVenueDto) {
  const hasValidApiImage = mainImage && mainImage !== "N/A" && mainImage.trim() !== "";
  
  let fallbackImage = billiardLounge;
  if (type) {
    const typeStr = String(type).toLowerCase();
    if (typeStr.includes("cafe") || typeStr.includes("كافيه")) {
      fallbackImage = sportsCafe;
    }
  }

  const imageSrc = hasValidApiImage ? mainImage : fallbackImage;

  return (
    <img
      src={imageSrc}
      alt={name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      onError={(e) => {
        e.currentTarget.src = fallbackImage;
      }}
    />
  );
}

export default function VenueCard({ id, name, type, mainImage, tablesNumber }: MiniVenueDto) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/venues/${id}`}
      className="bg-shamelco-surface border border-shamelco-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-shamelco-accent transition-all duration-300 group block active:scale-[0.99]"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative h-48 sm:h-auto sm:w-2/5 md:w-1/3 overflow-hidden">
          <Image tablesNumber={tablesNumber} id={id} mainImage={mainImage} type={type} name={name} />
          <div className="absolute bottom-2 end-2 bg-shamelco-accent text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-shamelco-accent/20">
            {type}
          </div>
        </div>

        <div className="p-4 sm:w-3/5 md:w-2/3 flex flex-col justify-between min-h-[160px]">
          <div>
            <h3 className="text-lg font-black text-shamelco-darker mb-1 leading-snug">{name}</h3>
          </div>

          <div className="flex items-center justify-end mt-auto border-t border-shamelco-border pt-3">
            <div className="flex items-center gap-1.5 bg-shamelco-gold text-shamelco-darker text-xs font-black py-2.5 px-4 rounded-xl hover:bg-shamelco-gold-hover transition-all duration-300 shadow-3xs">
              <span>{t('messages.VIEW_DETAILS')}</span>
              <Info className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}