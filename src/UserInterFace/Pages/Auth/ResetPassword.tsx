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

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const  resetPasswordMutation = useResetPasswordMutation();

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
    <div className="w-full">
      <div className="mb-8 text-center lg:text-right">
        <h3 className="text-2xl font-bold text-shamelco-darker mb-2">
          تعيين كلمة مرور جديدة
        </h3>
        <p className="text-shamelco-dark/60 text-sm">
          أدخل كلمة المرور الجديدة القوية لحماية حسابك في شاميلكو.
        </p>
      </div>

      {resetPasswordMutation.isSuccess ? (
        <div className="bg-status-success/10 border border-status-success/20 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-lg font-bold text-shamelco-darker mb-2">
            تم تغيير كلمة المرور بنجاح
          </h4>
          <p className="text-shamelco-dark/70 text-sm mb-4">
            يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
          </p>
          <p className="text-xs text-shamelco-dark/40">
            سيتم توجيهك لصفحة الدخول تلقائياً...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {resetPasswordMutation.isError && (
            <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm text-status-danger text-center">
              حدث خطأ، ربما انتهت صلاحية الرابط.
            </div>
          )}

          <SharedInput
            label="كلمة المرور الجديدة"
            type="password"
            placeholder="••••••••"
            required
            {...register("Password")}
            error={errors.Password?.message}
          />

          <SharedInput
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="••••••••"
            required
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark transition-all duration-200 disabled:opacity-50 mt-4"
          >
            {resetPasswordMutation.isPending
              ? "جاري التحديث..."
              : "تحديث كلمة المرور"}
          </button>
        </form>
      )}
    </div>
  );
}
