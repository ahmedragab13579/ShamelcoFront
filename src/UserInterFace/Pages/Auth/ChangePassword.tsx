import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type changePasswordFormInput,
} from "../../validations/authSchema";
import { SharedInput } from "../../Components/Common/SharedInput";
import { useChangePasswordMutation } from "../../../BackEndIntegration/Hooks/Mutations/useAuthMutations";

export default function ChangePassword() {
  const changePasswordMutation  = useChangePasswordMutation();

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
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-shamelco-dark/10">
      <div className="mb-8 text-right">
        <h3 className="text-xl font-bold text-shamelco-darker mb-2">
          تغيير كلمة المرور
        </h3>
        <p className="text-shamelco-dark/60 text-sm">
          تأكد من استخدام كلمة مرور قوية لم تقم باستخدامها من قبل.
        </p>
      </div>

      {changePasswordMutation.isSuccess && (
        <div className="mb-6 p-4 bg-status-success/10 border border-status-success/20 rounded-xl text-sm text-status-success text-right flex items-center justify-start gap-2">
          <span className="text-lg">✅</span>
          تم تحديث كلمة المرور بنجاح.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {changePasswordMutation.isError && (
          <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm text-status-danger text-right">
            حدث خطأ، تأكد من صحة كلمة المرور الحالية.
          </div>
        )}
        <SharedInput
          label="كلمة المرور الحالية"
          type="password"
          placeholder="••••••••"
          required
          {...register("CurrentPassword")}
          error={errors.CurrentPassword?.message}
        />
        <div className="h-px w-full bg-shamelco-dark/10 my-4"></div> {/* فاصل بسيط */}
        <SharedInput
          label="كلمة المرور الجديدة"
          type="password"
          placeholder="••••••••"
          required
          {...register("NewPassword")}
          error={errors.NewPassword?.message}
        />
        <SharedInput
          label="تأكيد كلمة المرور الجديدة"
          type="password"
          placeholder="••••••••"
          required
          {...register("ConfirmPassword")}
          error={errors.ConfirmPassword?.message}
        />
        <button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark transition-all duration-200 disabled:opacity-50 mt-2"
        >
          {changePasswordMutation.isPending
            ? "جاري التحديث..."
            : "حفظ كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
