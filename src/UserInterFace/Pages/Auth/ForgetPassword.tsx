import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  forgetPasswordSchema,
  type forgetPasswordFormInput,
} from "../../validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useForgotPasswordMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ForgetPassword() {
  const forgetPasswordMutation = useForgotPasswordMutation();
  const { t } = useLanguage();

  const onSubmit = (data: forgetPasswordFormInput) => {
    forgetPasswordMutation.mutate(data);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<forgetPasswordFormInput>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const Email = watch("Email");
  return (
    <div className="w-full font-sans">
      <div className="mb-8 text-center lg:text-start">
        <h3 className="text-2xl font-black text-shamelco-darker mb-2 tracking-tight">
          {t('messages.FORGOT_PASSWORD_Q')}
        </h3>
        <p className="text-shamelco-muted text-sm font-medium leading-relaxed">
          {t('messages.FORGOT_PASSWORD_DESC')}
        </p>
      </div>

      {forgetPasswordMutation.isSuccess ? (
        <div className="bg-status-success/10 border border-status-success/20 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95">
          <div className="w-12 h-12 bg-status-success/20 text-status-success rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
            📧
          </div>
          <h4 className="text-lg font-black text-shamelco-darker mb-2">
            {t('messages.CHECK_YOUR_EMAIL')}
          </h4>
          <p className="text-shamelco-muted text-sm font-medium mb-6 leading-relaxed">
            {t('messages.SENT_RECOVERY_LINK_TO')} <br />
            <span className="font-bold text-shamelco-darker" dir="ltr">
              {Email}
            </span>
          </p>
          <Link
            to="/auth/login"
            className="inline-block w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
          >
            {t('messages.BACK_TO_LOGIN')}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {forgetPasswordMutation.isError && (
            <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm font-bold text-status-danger text-center animate-in fade-in zoom-in-95">
              {t('messages.FAILED_SEND_LINK_CHECK_EMAIL')}
            </div>
          )}

          <SharedInput
            label={t('messages.EMAIL_LABEL')}
            type="Email"
            placeholder="name@example.com"
            required
            {...register("Email")}
            error={errors.Email?.message}
          />

          <button
            type="submit"
            disabled={forgetPasswordMutation.isPending}
            className="w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {forgetPasswordMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>{t('messages.SENDING')}</span>
              </>
            ) : (
              <span>{t('messages.SEND_RECOVERY_LINK')}</span>
            )}
          </button>

          <div className="text-center mt-6">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-shamelco-accent hover:text-shamelco-darker transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('messages.BACK_TO_LOGIN')}</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
