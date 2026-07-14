import type { CustomerProfileDto } from "../../../../BackEndIntegration/Types/Customer/Response";
import { usePersonalInfo } from "../../../Hooks/Customer/usePersonalInfo";
import { Link } from "react-router-dom";
import { SharedInput } from "../../Common/SharedInput";
import { Star, Lock, LogOut } from "lucide-react"; 
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export function PersonalInformationTab({ profileData, handleLogOut, image }: { profileData: CustomerProfileDto; handleLogOut: () => void, image: File | null }) {
  const { formData, handleChange, isChanged, handleUpdate } = usePersonalInfo({ profileData, image });
  const { t } = useLanguage();

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* الكارت الأساسي: بوردر خفيف بلون الثيم */}
      <div className="bg-shamelco-surface p-6 rounded-3xl border border-shamelco-dark/10 shadow-sm">
   
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-shamelco-darker text-lg">{t('messages.BASIC_INFO')}</h3>
          
          {/* بادج نقاط الولاء: أخد لون الـ Warning (الدهبي/البرتقالي) من الثيم عشان ينور ويدي طابع المكافأة */}
          <div className="bg-status-warning/10 text-status-warning px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-status-warning/20">
            <Star className="w-4 h-4 fill-status-warning text-status-warning" />
            <span>{profileData?.loyaltyPoints || 0} {t('messages.LOYALTY_POINTS')}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <SharedInput
              label={t('messages.FULL_NAME')}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SharedInput
                label={t('messages.EMAIL_LABEL')}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <SharedInput
                label={t('messages.PHONE_NUMBER_LABEL')}
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* زرار حفظ التعديلات بيظهر بس لو حصل تغيير */}
        {isChanged && (
          <div className="mt-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={handleUpdate}
              // زرار الأكشن: أخد كحلي غامق مع نص دهبي عشان يبرز جداً كأهم أكشن في الشاشة
              className="w-full bg-shamelco-darker text-shamelco-gold font-bold py-3.5 rounded-xl hover:bg-shamelco-dark transition-colors shadow-md active:scale-95"
            >
              {t('messages.SAVE_CHANGES')}
            </button>
          </div>
        )}

        {/* لينك تعديل كلمة المرور */}
        <Link 
          to={"/auth/change-password"} 
          className="mt-6 text-sm font-bold text-shamelco-accent hover:text-shamelco-gold transition-colors flex items-center gap-1.5 px-1 w-fit"
        >
          <Lock className="w-4 h-4" /> 
          {t('messages.CHANGE_PASSWORD')}
        </Link>
      </div>

      {/* زرار تسجيل الخروج */}
      <button
        onClick={handleLogOut}
        // الزرار ده خطير (Destructive Action) فأخد لون الـ Danger من الثيم مع خلفية شفافة
        className="w-full flex items-center justify-center gap-2 bg-shamelco-surface text-status-danger font-bold py-4 rounded-3xl border-2 border-status-danger/10 hover:bg-status-danger/5 hover:border-status-danger/30 transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        {t('messages.LOGOUT')}
      </button>
    </div>
  );
}