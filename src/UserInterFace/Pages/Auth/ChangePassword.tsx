import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import {
  changePasswordSchema,
  type changePasswordFormInput,
} from "../../validations/authSchema";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useChangePasswordMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ChangePassword() {
  const changePasswordMutation = useChangePasswordMutation();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm<changePasswordFormInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: changePasswordFormInput) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-shamelco-surface p-6 sm:p-8 rounded-3xl shadow-2xs border border-shamelco-border animate-fade-in font-sans">
      
      {/* الهيدر الوصفي للنموذج */}
      <div className="mb-8 text-start flex items-start gap-3.5">
        <div className="bg-shamelco-gold-soft p-3 rounded-2xl text-shamelco-gold border border-shamelco-gold/30 shrink-0 shadow-2xs">
          <Lock className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h3 className="text-xl font-black text-shamelco-darker mb-1 tracking-tight">
            {t('messages.CHANGE_PASSWORD')}
          </h3>
          <p className="text-shamelco-muted text-xs sm:text-sm font-medium leading-relaxed">
            {t('messages.CHANGE_PASSWORD_DESC')}
          </p>
        </div>
      </div>

      {/* تنبيه النجاح */}
      {changePasswordMutation.isSuccess && (
        <div className="mb-6 p-4 bg-status-success/10 border border-status-success/20 rounded-2xl text-xs sm:text-sm font-bold text-status-success text-start flex items-center justify-start gap-2.5 animate-in fade-in zoom-in-95">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>{t('messages.PASSWORD_UPDATED_SUCCESS')}</span>
        </div>
      )}

      {/* نموذج التغيير */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* تنبيه الخطأ */}
        {changePasswordMutation.isError && (
          <div className="p-3.5 bg-status-danger/10 border border-status-danger/20 rounded-2xl text-xs sm:text-sm font-bold text-status-danger text-start flex items-center justify-start gap-2 animate-in fade-in zoom-in-95 mb-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{t('messages.PASSWORD_UPDATE_FAILED')}</span>
          </div>
        )}

        <SharedInput
          label={t('messages.CURRENT_PASSWORD_LABEL')}
          type="password"
          placeholder="••••••••"
          required
          {...register("CurrentPassword")}
          error={errors.CurrentPassword?.message}
        />
        
        {/* فاصل ناعم ومريح للعين */}
        <div className="py-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-shamelco-border to-transparent" />
        </div> 

        <SharedInput
          label={t('messages.NEW_PASSWORD_LABEL')}
          type="password"
          placeholder="••••••••"
          required
          {...register("NewPassword")}
          error={errors.NewPassword?.message}
        />
        
        <SharedInput
          label={t('messages.CONFIRM_NEW_PASSWORD_LABEL')}
          type="password"
          placeholder="••••••••"
          required
          {...register("ConfirmPassword")}
          error={errors.ConfirmPassword?.message}
        />
        
        {/* زر الأكشن الرئيسي (10% الذهبي المغناطيسي) */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('messages.UPDATING')}</span>
              </>
            ) : (
              <span>{t('messages.SAVE_NEW_PASSWORD')}</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}