import { Link } from "react-router-dom";
import { loginSchema, type loginFormInput } from "../../validations/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRedirect } from "../../Hooks/Auth/useAuthRedirect";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useLoginMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";
import type FailResult from "../../../BackEndIntegration/Types/Result/Fail";
// 1. استدعاء الدالة المساعدة لترجمة أكواد الباك إند

export default function Login() {
  useAuthRedirect();
  const loginMutation = useLoginMutation();
  const { t } = useLanguage();

  const onSubmit = (data: loginFormInput) => {
    loginMutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  // 2. استخلاص رسالة الخطأ الحقيقية من الباك إند وترجمتها
  const errorMessage = loginMutation.isError 
    ? getLocalizedMessage(
        (loginMutation.error as FailResult)?.code || "INVALID_CREDENTIALS_LOGIN"
      )
    : null;

  return (
    <div className="w-full font-sans">
      {/* تم إضافة dir="auto" لحماية نصوص الترحيب */}
      <div dir="auto" className="mb-8 text-center lg:text-start">
        <h3 className="text-2xl font-black text-shamelco-darker mb-2 tracking-tight">
          {t('messages.LOGIN')}
        </h3>
        <p className="text-shamelco-muted text-sm font-medium">
          {t('messages.WELCOME_BACK_FAMILY')}
        </p>
      </div>

      {/* 3. عرض رسالة الخطأ المترجمة بناءً على الرد الفعلي من الباك إند */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm font-bold text-status-danger text-center animate-in fade-in zoom-in-95">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <SharedInput
          label={t('messages.EMAIL_LABEL')}
          type="Email"
          placeholder="name@example.com"
          required
          {...register("Email")}
          error={errors.Email?.message}
        />

        <div>
          <SharedInput
            label={t('messages.PASSWORD_LABEL')}
            type="Password"
            placeholder="••••••••"
            required
            {...register("Password")}
            error={errors.Password?.message}
          />
          <div className="text-end mt-1.5">
            <Link
              to="/auth/forget-password"
              className="text-xs text-shamelco-muted hover:text-shamelco-accent transition-colors font-semibold"
            >
              {t('messages.FORGOT_PASSWORD_Q')}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] mt-4"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{t('messages.LOADING_DOTS')}</span>
            </>
          ) : (
            <span>{t('messages.LOGIN')}</span>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-shamelco-muted mt-8 font-medium">
        {t('messages.DONT_HAVE_ACCOUNT')}{" "}
        <Link
          to="/auth/register"
          className="font-bold text-shamelco-accent hover:text-shamelco-darker underline underline-offset-4 transition-colors"
        >
          {t('messages.CREATE_ACCOUNT_NOW')}
        </Link>
      </p>
    </div>
  );
}