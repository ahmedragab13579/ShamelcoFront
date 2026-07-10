import { Link } from "react-router-dom";
import { Info } from "lucide-react"; // أيقونة للتنقل
import type { MiniVenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import CafeImage from "../../Images/Cafe.jpg";
import Billiard from "../../Images/Billiard.jpg";

function Image({ name, type, mainImage }: MiniVenueDto) {
  const hasValidApiImage = mainImage && mainImage !== "N/A" && mainImage.trim() !== "";
  
  let fallbackImage = Billiard;
  if (type) {
    const typeStr = String(type).toLowerCase();
    if (typeStr.includes("cafe") || typeStr.includes("كافيه")) {
      fallbackImage = CafeImage;
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
  return (
    <Link
      to={`/venues/${id}`}
      className="bg-white border border-shamelco-dark/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-shamelco-accent/30 transition-all duration-300 group block"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative h-48 sm:h-auto sm:w-2/5 md:w-1/3 overflow-hidden">
          <Image tablesNumber={tablesNumber} id={id} mainImage={mainImage} type={type} name={name} />
          <div className="absolute bottom-2 right-2 bg-shamelco-accent text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
            {type}
          </div>
        </div>

        <div className="p-4 sm:w-3/5 md:w-2/3 flex flex-col justify-between min-h-[160px]">
          <div>
            <h3 className="text-lg font-bold text-shamelco-darker mb-1">{name}</h3>
          </div>

          <div className="flex items-center justify-end mt-auto border-t border-shamelco-dark/5 pt-3">
            <div className="flex items-center gap-1 bg-shamelco-darker text-shamelco-gold text-sm font-bold py-2 px-4 rounded-xl group-hover:bg-shamelco-dark transition-colors duration-300">
              عرض التفاصيل
              <Info className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}