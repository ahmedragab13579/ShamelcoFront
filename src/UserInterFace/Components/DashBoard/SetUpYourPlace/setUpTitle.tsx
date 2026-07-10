import { ChevronRight, Sparkles } from "lucide-react";
import type { PlaceType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";

interface SetupTitleProps {
  step: 1 | 2;
  businessType: PlaceType;
  userName: string;
  onBack: () => void;
}

export default function SetupTitle({
  step,
  businessType,
  userName,
  onBack,
}: SetupTitleProps) {
  return (
    <div className="p-8 text-center bg-shamelco-dark/5 border-b border-shamelco-dark/10 relative">
      {step === 2 && (
        <button
          onClick={onBack}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-shamelco-darker hover:bg-shamelco-dark/5 transition-all shadow-sm border border-shamelco-dark/10 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <h1 className="flex items-center justify-center gap-2 text-3xl font-black text-shamelco-darker mb-2">
        مرحباً بك يا {userName || "شريكنا"}
        {/* أيقونة ترحيب احترافية */}
        <Sparkles className="w-7 h-7 text-shamelco-gold" />
      </h1>
      
      <p className="text-shamelco-dark/70 text-lg font-medium">
        {step === 1
          ? "لم يتبق سوى خطوة واحدة لإعداد لوحة التحكم الخاصة بك."
          : `أدخل التفاصيل الأساسية لل${businessType === "Pitch" ? "ملعب" : "صالة"} الخاص بك.`}
      </p>
    </div>
  );
}