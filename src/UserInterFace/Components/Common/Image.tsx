import soccerField from "../../Images/premium_synthetic_turf_football_field_at_nig.webp"; 
import sportsCafe from "../../Images/VIP_esports_gaming_lounge_and_console_statio.webp";
import billiardLounge from "../../Images/billiard_table_in_a_modern_lounge_clo.webp";
import tennisCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.webp";
import padelCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.webp";
import type { PlaceSubType } from "../../../BackEndIntegration/Types/Enums/AppEnums";


const imageFallbackMap: Record<PlaceSubType, string> = {
  Cafe: sportsCafe,
  Billiard: billiardLounge,
  Tennis: tennisCourt,
  FiveASide: soccerField, 
  SixASide: soccerField,
  Padel: padelCourt,      
};

interface PlaceSearchDto {
  mainImage?: string;
  placeSubType: PlaceSubType;
  name: string;
}

export function Image({ item }: { item: PlaceSearchDto }) {
  const hasValidApiImage = item.mainImage && item.mainImage !== "N/A" && item.mainImage.trim() !== "";
  
  const fallbackImage = imageFallbackMap[item.placeSubType] || soccerField;
  
  const imageSrc = hasValidApiImage ? item.mainImage! : fallbackImage;
    
  return (
    <img
      src={imageSrc}
      alt={item.name}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={(e) => {
        if (e.currentTarget.src !== fallbackImage) {
          e.currentTarget.src = fallbackImage;
        }
      }}
    />
  );
}