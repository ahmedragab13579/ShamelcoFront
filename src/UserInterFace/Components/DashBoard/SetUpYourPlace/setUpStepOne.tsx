import React from "react";
import { Trophy, Gamepad2 } from "lucide-react"; // استخدام نفس الأيقونات المعتمدة في النظام
import type { PlaceType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";

interface SetupStepOneProps {
  businessType: PlaceType;
  setBusinessType: (type: PlaceType) => void;
  onNext: () => void;
}

const BusinessTypeCard = ({ 
  type, 
  currentType, 
  onClick, 
  icon, 
  title, 
  description 
}: { 
  type: PlaceType, 
  currentType: PlaceType, 
  onClick: () => void, 
  icon: React.ReactNode, // تغيير النوع ليقبل أيقونات Lucide
  title: string, 
  description: string 
}) => {
  const isSelected = currentType === type;
  
  return (
    <button
      onClick={onClick}
      // الكارت العادي بياخد بوردر خفيف، ولما يتحدد بياخد أغمق لون عشان يبان إنه الـ Active
      className={`relative overflow-hidden group p-8 rounded-2xl text-right transition-all duration-300 border-2 ${
        isSelected
          ? "border-shamelco-darker bg-shamelco-dark/5 shadow-md scale-[1.02]"
          : "border-shamelco-dark/10 bg-white hover:border-shamelco-accent/40 hover:bg-shamelco-dark/5"
      }`}
    >
      {/* الأيقونة بتاخد اللون الدهبي لو الكارت متحدد، وبترولي لو مش متحدد */}
      <div className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${
        isSelected ? "text-shamelco-gold" : "text-shamelco-accent"
      }`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-1 text-shamelco-darker">
        {title}
      </h3>
      <p className="text-shamelco-dark/70 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </button>
  );
};

export default function SetupStepOne({
  businessType,
  setBusinessType,
  onNext,
}: SetupStepOneProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <BusinessTypeCard 
          type="Pitch"
          currentType={businessType}
          onClick={() => setBusinessType("Pitch")}
          // تمرير أيقونة الملعب بحجم مناسب وسمك رفيع للشياكة
          icon={<Trophy className="w-12 h-12" strokeWidth={1.5} />}
          title="إدارة ملعب"
          description="ملاعب كرة قدم، خماسي، سداسي، أو أي رياضات أخرى تعتمد على الحجز بالساعة."
        />
        <BusinessTypeCard 
          type="Venue"
          currentType={businessType}
          onClick={() => setBusinessType("Venue")}
          // تمرير أيقونة الصالة
          icon={<Gamepad2 className="w-12 h-12" strokeWidth={1.5} />}
          title="إدارة صالة / كافيه"
          description="صالات بلياردو، بلايستيشن، كافيهات، أو أماكن تعتمد على الطاولات والجلسات المفتوحة."
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!businessType}
          // زرار الأكشن الأساسي: كحلي غامق مع نص دهبي، وتأثير ضغطة (active:scale-95)
          className="px-10 py-3.5 rounded-xl font-bold text-shamelco-gold bg-shamelco-darker hover:bg-shamelco-dark focus:ring-4 focus:ring-shamelco-darker/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
        >
          الخطوة التالية
        </button>
      </div>
    </div>
  );
}