import { Link } from "react-router-dom";
import {
  registerSchema,
  type AuthFormInput,
} from "../../validations/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRedirect } from "../../Hooks/Auth/useAuthRedirect";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useRegisterMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import { Loader2, ChevronDown } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Registration() {
  useAuthRedirect();
  const registerMutation = useRegisterMutation();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      UserType: "Customer",
    },
  });

  const onSubmit = (data: AuthFormInput) => {
    registerMutation.mutate({name: data.Name, email: data.Email, password: data.Password, userType: data.UserType});
  };

  return (
    <div className="w-full font-sans">
      <div className="mb-8 text-center lg:text-start">
        <h3 className="text-2xl font-black text-shamelco-darker mb-2 tracking-tight">
          {t('messages.CREATE_NEW_ACCOUNT')}
        </h3>
        <p className="text-shamelco-muted text-sm font-medium">
          {t('messages.JOIN_SHAMELCO_DESC')}
        </p>
      </div>

      {registerMutation.isError && (
        <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm font-bold text-status-danger text-center animate-in fade-in zoom-in-95">
          {t('messages.REGISTRATION_FAILED_MSG')}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SharedInput
          label={t('messages.FULL_NAME')}
          type="text"
          placeholder={t('messages.ENTER_FULL_NAME_OR_COMPANY')}
          required
          {...register("Name")}
          error={errors.Name?.message}
        />

        <SharedInput
          label={t('messages.EMAIL_LABEL')}
          type="email"
          placeholder="example@mail.com"
          {...register("Email")}
          error={errors.Email?.message}
        />

        <div className="flex flex-col space-y-1.5 w-full">
          <label className="text-sm font-semibold text-shamelco-darker block text-start">
            {t('messages.ACCOUNT_TYPE')}
          </label>
          <div className="relative w-full">
            <select
              {...register("UserType")}
              className="w-full px-4 py-3 rounded-xl border border-shamelco-border text-start transition-all duration-200 outline-none text-shamelco-darker bg-shamelco-bg focus:border-shamelco-accent focus:bg-shamelco-surface focus:ring-4 focus:ring-shamelco-accent/10 appearance-none font-bold text-sm cursor-pointer"
            >
              <option value="Owner">{t('messages.OWNER_ACCOUNT_TYPE')}</option>
              <option value="Customer">{t('messages.CUSTOMER_ACCOUNT_TYPE')}</option>
            </select>
            <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none text-shamelco-muted">
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        <SharedInput
          label={t('messages.PASSWORD_LABEL')}
          type="password"
          placeholder="••••••••"
          {...register("Password")}
          error={errors.Password?.message}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-3.5 px-4 rounded-xl font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] mt-4"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{t('messages.CREATING_ACCOUNT')}</span>
            </>
          ) : (
            <span>{t('messages.CREATE_ACCOUNT')}</span>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-shamelco-muted mt-6 font-medium">
        {t('messages.ALREADY_HAVE_ACCOUNT')}{" "}
        <Link
          to="/auth/login"
          className="font-bold text-shamelco-accent hover:text-shamelco-darker underline underline-offset-4 transition-colors"
        >
          {t('messages.LOGIN_HERE')}
        </Link>
      </p>
    </div>
  );
}
