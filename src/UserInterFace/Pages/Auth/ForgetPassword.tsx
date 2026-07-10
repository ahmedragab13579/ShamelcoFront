import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  forgetPasswordSchema,
  type forgetPasswordFormInput,
} from "../../validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useForgotPasswordMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";

export default function ForgetPassword() {
  const  forgetPasswordMutation = useForgotPasswordMutation();

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
    <div className="w-full">
      <div className="mb-8 text-center lg:text-right">
        <h3 className="text-2xl font-bold text-shamelco-darker mb-2">
          هل نسيت كلمة المرور؟
        </h3>
        <p className="text-shamelco-dark/60 text-sm leading-relaxed">
          لا تقلق، أدخل بريدك الإلكتروني المسجل لدينا وسنرسل لك رابطاً لإعادة
          تعيين كلمة المرور الخاصة بك.
        </p>
      </div>

      {forgetPasswordMutation.isSuccess ? (
        <div className="bg-status-success/10 border border-status-success/20 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-status-success/20 text-status-success rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📧
          </div>
          <h4 className="text-lg font-bold text-shamelco-darker mb-2">
            تحقق من بريدك الإلكتروني
          </h4>
          <p className="text-shamelco-dark/70 text-sm mb-6">
            لقد أرسلنا رابط استعادة كلمة المرور إلى <br />
            <span className="font-semibold text-shamelco-darker" dir="ltr">
              {Email}
            </span>
          </p>
          <Link
            to="/auth/login"
            className="inline-block w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark transition-all duration-200"
          >
            العودة لتسجيل الدخول
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {forgetPasswordMutation.isError && (
            <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm text-status-danger text-center">
              تعذر إرسال الرابط. تأكد من صحة البريد الإلكتروني.
            </div>
          )}

          <SharedInput
            label="البريد الإلكتروني"
            type="Email"
            placeholder="name@example.com"
            required
            {...register("Email")}
            error={errors.Email?.message}
          />

          <button
            type="submit"
            disabled={forgetPasswordMutation.isPending}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark focus:ring-4 focus:ring-shamelco-darker/20 transition-all duration-200 disabled:opacity-50"
          >
            {forgetPasswordMutation.isPending
              ? "جاري الإرسال..."
              : "إرسال رابط الاستعادة"}
          </button>

          <div className="text-center mt-6">
            <Link
              to="/auth/login"
              className="text-sm font-semibold text-shamelco-accent hover:text-shamelco-dark transition-colors"
            >
              &rarr; العودة لتسجيل الدخول
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
