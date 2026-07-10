import { useState } from "react";
import { useAuth } from "../../../Context/Auth/AuthContext";
import StepOne from "../../Components/DashBoard/SetUpYourPlace/setUpStepOne";
import StepTwo from "../../Components/DashBoard/SetUpYourPlace/setUpStepTwo";
import SetupTitle from "../../Components/DashBoard/SetUpYourPlace/setUpTitle";
import type { PlaceType } from "../../../BackEndIntegration/Types/Enums/AppEnums";

export default function SetupEntityPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [businessType, setBusinessType] = useState<PlaceType>(
    "unknownPlaceType",
  );
  const handleBack = () => {
    setStep(1);
  };
  if (!user?.userId) {
    return (
      <div className="text-center p-8 text-red-500">
        حدث خطأ: لا يوجد معرف مستخدم.
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh]"
      dir="rtl"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-shamelco-accent/20 overflow-hidden">
        <SetupTitle
          step={step}
          businessType={businessType}
          userName={user.name||"المستخدم"}
          onBack={handleBack}
        />
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-shamelco-dark hover:text-shamelco-darker hover:bg-shamelco-bg transition-colors shadow-sm border border-shamelco-dark/5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <div className="p-8">
          {step === 1 ? (
            <StepOne
              businessType={businessType}
              setBusinessType={setBusinessType}
              onNext={() => setStep(2)}
            />
          ) : (
            <StepTwo businessType={businessType} userId={user.userId} />
          )}
        </div>
      </div>
    </div>
  );
}
