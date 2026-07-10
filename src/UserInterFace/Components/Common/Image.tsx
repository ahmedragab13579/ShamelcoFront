import pitchImage from "../../Images/Filed.jpg"; 
import cafe from "../../Images/Cafe.jpg";
import Billiard from "../../Images/Billiard.jpg";
import tennis from "../../Images/tennis-court-render-3d-illustration.jpg";
import type { PlaceSubType } from "../../../BackEndIntegration/Types/Enums/AppEnums";


const imageFallbackMap: Record<PlaceSubType, string> = {
  Cafe: cafe,
  Billiard: Billiard,
  Tennis: tennis,
  FiveASide: pitchImage, 
  SixASide: pitchImage,
  Padel: pitchImage,      
};

interface PlaceSearchDto {
  mainImage?: string;
  placeSubType: PlaceSubType;
  name: string;
}

export function Image({ item }: { item: PlaceSearchDto }) {
  const hasValidApiImage = item.mainImage && item.mainImage !== "N/A" && item.mainImage.trim() !== "";
  
  const fallbackImage = imageFallbackMap[item.placeSubType] || pitchImage;
  
  const imageSrc = hasValidApiImage ? item.mainImage! : fallbackImage;
    
  return (
    <img
      src={imageSrc}
      alt={item.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={(e) => {
        if (e.currentTarget.src !== fallbackImage) {
          e.currentTarget.src = fallbackImage;
        }
      }}
    />
  );
}