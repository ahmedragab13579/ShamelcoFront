import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; 
import type { MiniPitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import padelImage from "../../Images/tennis-court-render-3d-illustration.jpg";
import FieldImage from "../../Images/Filed.jpg";

function Image({ name, type, mainImage }: MiniPitchDto) {
  const defaultImage = mainImage ? mainImage : type === "Padel" || type === "Tennis" ? padelImage : FieldImage;
  return (
    <img
      src={defaultImage}
      alt={name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

export default function PitchCard({ id, name, type, mainImage }: MiniPitchDto) {
  return (
    <Link
      to={`/pitches/${id}`}
      // البوردر بقى أخف بـ shamelco-dark/10 ولما تعمل hover بيقلب للون البترولي الأنيق
      className="bg-white border border-shamelco-dark/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-shamelco-accent/30 transition-all duration-300 group block"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative h-48 sm:h-auto sm:w-2/5 md:w-1/3 overflow-hidden">
          <Image id={id} mainImage={mainImage} name={name} type={type} />
        </div>

        {/* تفاصيل الملعب */}
        <div className="p-4 sm:w-3/5 md:w-2/3 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {/* البادج بقى أزرق بترولي (Accent) بدل الأخضر */}
              <span className="text-[10px] font-bold px-3 py-1 bg-shamelco-accent/10 text-shamelco-accent rounded-lg">
                {type}
              </span>
            </div>
            {/* اسم الملعب باللون الغامق الأساسي */}
            <h3 className="text-lg font-bold text-shamelco-darker mb-1">{name}</h3>
          </div>

          {/* زر عرض المواعيد */}
          <div className="flex items-center justify-end mt-auto border-t border-shamelco-dark/5 pt-3">
            <div className="flex items-center gap-1 bg-shamelco-darker text-shamelco-gold text-sm font-bold py-2 px-4 rounded-xl group-hover:bg-shamelco-dark transition-colors duration-300">
              عرض المواعيد
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}