import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response"; 
import { Image } from "../Common/Image";
interface PlaceCardProps {
  item: PlaceSearchDto;
  className?: string; 
}

export default function PlaceCard({ item, className = "" }: PlaceCardProps) {
  const type: string = item.placeType === "Pitch" ? "pitches" : "venues";
  
  return (
    <Link
      to={`/${type}/${item.id}`}
      className={`bg-white rounded-2xl overflow-hidden border border-shamelco-dark/10 shadow-sm group cursor-pointer hover:shadow-md hover:border-shamelco-gold/50 transition-all duration-300 ${className}`}
    >
      <div className="relative h-36 overflow-hidden">
        <Image item={item}  />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <span className="text-xs font-bold text-shamelco-darker">
            {item.rating}
          </span>
          <Star className="w-3 h-3 text-shamelco-gold fill-shamelco-gold" />
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs font-medium text-shamelco-accent mb-1">
          {item.placeType}
        </div>
        
        <h3 className="font-bold text-shamelco-darker mb-2 truncate">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="text-shamelco-dark/70 text-xs">سعر الساعة يبدأ من</div>
          <div className="font-black text-shamelco-darker">
            {item.startingPrice}{" "}
            <span className="text-[10px] text-shamelco-dark/70 font-normal">
              ج.م
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}