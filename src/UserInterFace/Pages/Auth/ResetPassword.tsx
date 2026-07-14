import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type resetPasswordFormInput,
} from "../../validations/authSchema";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useResetPasswordMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPasswordMutation = useResetPasswordMutation();
  const { t } = useLanguage();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      navigate("/auth/login");
    }
  }, [token, email, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      Email: email || "",
    },
  });

  const onSubmit = (data: resetPasswordFormInput) => {
    if(!token || !email) return;
    resetPasswordMutation.mutate(
      {
        Email: email,
        Token: token,
        NewPassword: data.Password,
      },
      {
        onSuccess: () => {
          setTimeout(() => navigate("/auth/login"), 3000);
        },
      },
    );
  };

  return (
    <div className="w-full font-sans">
      <div className="mb-8 text-center lg:text-start">
        <h3 className="text-2xl font-black text-shamelco-darker mb-2 tracking-tight">
          {t('messages.SET_NEW_PASSWORD')}
        </h3>
        <p className="text-shamelco-muted text-sm font-medium">
          {t('messages.SET_NEW_PASSWORD_DESC')}
        </p>
      </div>

      {resetPasswordMutation.isSuccess ? (
        <div className="bg-status-success/10 border border-status-success/20 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95">
          <div className="text-4xl mb-4 animate-bounce">✅</div>
          <h4 className="text-lg font-black text-shamelco-darker mb-2">
            {t('messages.PASSWORD_CHANGED_SUCCESS')}
          </h4>
          <p className="text-shamelco-muted text-sm font-medium mb-4">
            {t('messages.PASSWORD_CHANGED_SUCCESS_DESC')}
          </p>
          <p className="text-xs text-shamelco-muted font-bold">
            {t('messages.REDIRECTING_LOGIN_AUTO')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {resetPasswordMutation.isError && (
            <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm font-bold text-status-danger text-center animate-in fade-in zoom-in-95">
              {t('messages.ERROR_LINK_EXPIRED')}
            </div>
          )}

          <SharedInput
            label={t('messages.NEW_PASSWORD_LABEL')}
            type="password"
            placeholder="••••••••"
            required
            {...register("Password")}
            error={errors.Password?.message}
          />

          <SharedInput
            label={t('messages.CONFIRM_PASSWORD_LABEL')}
            type="password"
            placeholder="••••••••"
            required
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] mt-4"
          >
            {resetPasswordMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>{t('messages.UPDATING')}</span>
              </>
            ) : (
              <span>{t('messages.UPDATE_PASSWORD')}</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
