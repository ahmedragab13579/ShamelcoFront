import { ChevronLeft, Sparkles } from "lucide-react";
import type { PlaceType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

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
  const { t } = useLanguage();

  return (
    <div className="p-6 sm:p-8 text-center bg-shamelco-sand/40 border-b border-shamelco-border relative transition-colors duration-200">
      {step === 2 && (
        /* تعديل زرار الرجوع ليكون في بداية الشاشة (start-6) ومجهز بالكامل للـ Dark Mode */
        <button
          onClick={onBack}
          title={t('messages.BACK') || "رجوع"}
          className="absolute start-4 sm:start-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-shamelco-surface text-shamelco-darker hover:bg-shamelco-sand hover:text-shamelco-gold transition-all duration-200 shadow-sm border border-shamelco-border active:scale-95 cursor-pointer focus-visible:outline-shamelco-gold shrink-0"
        >
          {/* انعكاس السهم أوتوماتيك مع اللغة (يبص يمين في العربي ويشمال في الإنجليزي) */}
          <ChevronLeft className="w-5 h-5 rtl:rotate-180 transition-transform duration-200 group-hover:scale-110" />
        </button>
      )}

      <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-shamelco-darker mb-2 px-10">
        <span>{t('messages.WELCOME_USER')}</span>
        <span className="text-shamelco-accent dark:text-shamelco-sky underline decoration-shamelco-gold decoration-wavy decoration-2 underline-offset-4">
          {userName || t('messages.PARTNER')}
        </span>
        {/* أيقونة ترحيب احترافية */}
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-shamelco-gold shrink-0 animate-pulse" />
      </h1>
      
      <p className="text-shamelco-muted text-base sm:text-lg font-semibold max-w-2xl mx-auto leading-relaxed">
        {step === 1
          ? t('messages.SETUP_STEP_ONE_DESC')
          : businessType === "Pitch"
            ? t('messages.SETUP_STEP_TWO_PITCH_DESC')
            : t('messages.SETUP_STEP_TWO_VENUE_DESC')}
      </p>
    </div>
  );
}