import { Link } from "react-router-dom";
import { loginSchema, type loginFormInput } from "../../validations/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRedirect } from "../../Hooks/Auth/useAuthRedirect";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useLoginMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";

export default function Login() {
     useAuthRedirect();

  const loginMutation  = useLoginMutation();


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

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-right">
        <h3 className="text-2xl font-bold text-shamelco-darker mb-2">تسجيل الدخول</h3>
        <p className="text-shamelco-dark/60 text-sm">
          مرحباً بك مجدداً في عائلة شاميلكو
        </p>
      </div>

      {loginMutation.isError && (
        <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm text-status-danger text-center">
          البريد الإلكتروني أو كلمة المرور غير صحيحة.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <SharedInput
          label="البريد الإلكتروني"
          type="Email"
          placeholder="name@example.com"
          required
          {...register("Email")}
          error={errors.Email?.message}
        />

        <div>
          <SharedInput
            label="كلمة المرور"
            type="Password"
            placeholder="••••••••"
            required
            {...register("Password")}
            error={errors.Password?.message}
          />
          <div className="text-left mt-1.5">
            <Link
              to="/auth/forget-password"
              className="text-xs text-shamelco-dark/60 hover:text-shamelco-accent transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark focus:ring-4 focus:ring-shamelco-darker/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loginMutation.isPending ? "جاري التحميل..." : "تسجيل الدخول"}
        </button>
      </form>

      <p className="text-center text-sm text-shamelco-dark/70 mt-8">
        ليس لديك حساب؟{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-shamelco-accent hover:text-shamelco-dark underline underline-offset-4 transition-colors"
        >
          أنشئ حسابك الآن
        </Link>
      </p>
    </div>
  );
}
