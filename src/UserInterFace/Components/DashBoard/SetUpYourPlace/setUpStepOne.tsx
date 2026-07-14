import React from "react";
import { Trophy, Gamepad2 } from "lucide-react"; 
import type { PlaceType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import setupPitchIllust from "../../../Images/futuristic_illustration_representing_sports_manag.jpg";
import setupVenueIllust from "../../../Images/futuristic_illustration_representing_entertainmen.jpg";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

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
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  const isSelected = currentType === type;
  const illustImage = type === "Pitch" ? setupPitchIllust : setupVenueIllust;
  
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group rounded-lg text-start transition-all duration-300 border-2 flex flex-col justify-between h-full active:scale-[0.99] cursor-pointer focus-visible:outline-shamelco-gold ${
        isSelected
          ? "border-shamelco-gold bg-shamelco-gold-soft shadow-md rtl:-translate-y-1 ltr:-translate-y-1"
          : "border-shamelco-border bg-shamelco-surface hover:border-shamelco-gold/50 hover:shadow-sm"
      }`}
    >
      {/* صورة كرت توضيحية فخمة */}
      <div className="relative w-full h-36 overflow-hidden bg-shamelco-sand border-b border-shamelco-border shrink-0">
        <img 
          src={illustImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* أيقونة lucide كبادج عائم - متوافقة 100% مع الفاتح والغامق */}
        <div className={`absolute bottom-3 end-3 p-2.5 rounded-md backdrop-blur-md shadow-sm transition-all duration-300 border ${
          isSelected 
            ? "bg-shamelco-gold text-shamelco-darker border-shamelco-gold shadow-gold scale-110" 
            : "bg-shamelco-surface/90 text-shamelco-accent border-shamelco-border group-hover:text-shamelco-gold group-hover:border-shamelco-gold/50"
        }`}>
          {icon}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={`text-xl font-black mb-2 transition-colors duration-200 ${
            isSelected ? "text-shamelco-darker" : "text-shamelco-darker group-hover:text-shamelco-gold"
          }`}>
            {title}
          </h3>
          <p className="text-shamelco-muted text-sm leading-relaxed font-semibold">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default function SetupStepOne({
  businessType,
  setBusinessType,
  onNext,
}: SetupStepOneProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <BusinessTypeCard 
          type="Pitch"
          currentType={businessType}
          onClick={() => setBusinessType("Pitch")}
          icon={<Trophy className="w-6 h-6" strokeWidth={2} />}
          title={t('messages.MANAGE_PITCH')}
          description={t('messages.MANAGE_PITCH_DESC')}
        />
        <BusinessTypeCard 
          type="Venue"
          currentType={businessType}
          onClick={() => setBusinessType("Venue")}
          icon={<Gamepad2 className="w-6 h-6" strokeWidth={2} />}
          title={t('messages.MANAGE_LOUNGE')}
          description={t('messages.MANAGE_LOUNGE_DESC')}
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-shamelco-border">
        {/* تعديل زرار الأكشن ليكون هو العنصر الذهبي المميز في الشاشة (Primary CTA) */}
        <button
          onClick={onNext}
          disabled={!businessType}
          className="px-10 py-3.5 rounded-md font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover focus-visible:outline-shamelco-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-shamelco-gold shadow-gold active:scale-[0.98] cursor-pointer shrink-0"
        >
          {t('messages.NEXT_STEP')}
        </button>
      </div>
    </div>
  );
}