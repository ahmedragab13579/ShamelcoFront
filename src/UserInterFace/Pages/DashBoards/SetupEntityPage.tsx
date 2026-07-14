import { useState } from "react";
import { useAuth } from "../../../Context/Auth/AuthContext";
import StepOne from "../../Components/DashBoard/SetUpYourPlace/setUpStepOne";
import StepTwo from "../../Components/DashBoard/SetUpYourPlace/setUpStepTwo";
import SetupTitle from "../../Components/DashBoard/SetUpYourPlace/setUpTitle";
import type { PlaceType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function SetupEntityPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [businessType, setBusinessType] = useState<PlaceType>(
    "unknownPlaceType",
  );
  const { t } = useLanguage();

  const handleBack = () => {
    setStep(1);
  };

  // حالة الخطأ: تم تحويلها لكارت فخم متوافق 100% مع الـ Dark Mode
  if (!user?.userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-4 font-sans transition-colors duration-200">
        <div className="flex flex-col items-center justify-center max-w-md w-full text-center gap-4 bg-shamelco-surface p-8 rounded-lg shadow-sm border border-shamelco-border animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-status-danger/10 text-status-danger rounded-md flex items-center justify-center border border-status-danger/20 shadow-xs shrink-0">
            <AlertCircle className="w-7 h-7 shrink-0" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-black text-shamelco-darker tracking-tight">
              {t('messages.CANNOT_SETUP_ENTITY')}
            </h4>
            <p className="text-sm font-semibold text-shamelco-muted leading-relaxed">
              {t('messages.ERROR_NO_ACTIVE_USER_RELIGHT')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-8 font-sans transition-colors duration-200">
      
      {/* الحاوية الرئيسية: كارت احترافي متناسق مع الـ Tokens */}
      <div className="relative w-full max-w-2xl bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border overflow-hidden animate-in fade-in duration-500">
        
        {/* الترويسة: بتحتوي بالفعل على زرار الرجوع المظبط لما step === 2 */}
        <SetupTitle
          step={step}
          businessType={businessType}
          userName={user.name || t('messages.PARTNER')}
          onBack={handleBack}
        />

        {/* محتوى الخطوات */}
        <div className="p-6 sm:p-8">
          {step === 1 ? (
            <StepOne
              businessType={businessType}
              setBusinessType={setBusinessType}
              onNext={() => setStep(2)}
            />
          ) : (
            <StepTwo 
              businessType={businessType} 
              userId={user.userId} 
            />
          )}
        </div>
        
      </div>
    </div>
  );
}