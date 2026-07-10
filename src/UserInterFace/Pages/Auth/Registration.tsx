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

export default function Registration() {
    useAuthRedirect();
  const  registerMutation  = useRegisterMutation();
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
    <div className="w-full">
      <div className="mb-8 text-center lg:text-right">
        <h3 className="text-2xl font-bold text-shamelco-darker mb-2">
          إنشاء حساب جديد
        </h3>
        <p className="text-shamelco-dark/60 text-sm">
          انضم إلى مجتمع شاميلكو وابدأ بإدارة مشروعك بذكاء
        </p>
      </div>

      {registerMutation.isError && (
        <div className="mb-4 p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-sm text-status-danger text-center">
          حدث خطأ أثناء التسجيل، تأكد من البيانات أو حاول مرة أخرى.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SharedInput
          label="الاسم بالكامل"
          type="text"
          placeholder="أدخل اسمك أو اسم الشركة"
          required
          {...register("Name")}
          error={errors.Name?.message}
        />

        <SharedInput
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@mail.com"
          {...register("Email")}
          error={errors.Email?.message}
        />

        <div className="flex flex-col space-y-1.5 w-full">
          <label className="text-sm font-semibold text-shamelco-dark block text-right">
            نوع الحساب
          </label>
          <select
            {...register("UserType")}
            className="w-full px-4 py-3 rounded-xl border border-shamelco-dark/10 text-right transition-all duration-200 outline-none text-shamelco-darker bg-shamelco-bg focus:border-shamelco-accent focus:bg-white focus:ring-4 focus:ring-shamelco-accent/10 appearance-none"
          >
            <option value="Owner">صاحب مشروع (ملعب/كافيه/بلايستيشن)</option>
            <option value="Customer">عميل / لاعب</option>
          </select>
        </div>

        <SharedInput
          label="كلمة المرور"
          type="password"
          placeholder="••••••••"
          {...register("Password")}
          error={errors.Password?.message}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-shamelco-darker hover:bg-shamelco-dark focus:ring-4 focus:ring-shamelco-darker/20 transition-all duration-200 disabled:opacity-50 mt-4"
        >
          {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </button>
      </form>

      <p className="text-center text-sm text-shamelco-dark/70 mt-6">
        لديك حساب بالفعل؟{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-shamelco-accent hover:text-shamelco-dark underline underline-offset-4 transition-colors"
        >
          سجل دخولك هنا
        </Link>
      </p>
    </div>
  );
}
