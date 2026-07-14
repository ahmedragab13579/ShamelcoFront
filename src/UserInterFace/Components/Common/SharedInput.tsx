// src/Components/Common/AuthInput.tsx
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface SharedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const SharedInput = forwardRef<HTMLInputElement, SharedInputProps>(
  ({ label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();

    const isPasswordType = type === "Password" || type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const normalizedType = type?.toLowerCase();
    const isLtrInput = normalizedType && ["email", "password", "url", "tel"].includes(normalizedType);

    return (
      <div className="relative flex flex-col space-y-1.5 w-full">
        {/* الليبل أخد اللون الغامق عشان يكون واضح ومقري */}
        <label className="text-sm font-bold text-shamelco-darker block text-start">
          {label}
        </label>

        <div className="relative w-full" dir={isLtrInput ? "ltr" : undefined}> 
          <input
            {...props}
            ref={ref}
            type={inputType}
            dir={isLtrInput ? "ltr" : props.dir}
            // التعديل هنا: استخدمنا ps-4 للبداية، والـ pe بقت ديناميكية حسب وجود أيقونة العين من عدمه
            className={`w-full ps-4 ${isPasswordType ? 'pe-12' : 'pe-4'} py-3 rounded-xl border text-start transition-all duration-300 outline-none text-shamelco-darker bg-shamelco-dark/5 ${
              error
                ? "border-status-danger focus:border-status-danger focus:ring-2 focus:ring-status-danger/20"
                : "border-shamelco-border focus:border-shamelco-accent focus:bg-shamelco-surface focus:ring-4 focus:ring-shamelco-accent/10"
            }`}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              // أيقونة العين واخدة لون باهت، ولما اليوزر يقف عليها بتاخد اللون الثانوي للموقع
              className="absolute top-1/2 -translate-y-1/2 end-3 text-shamelco-muted hover:text-shamelco-accent transition-colors p-1"
              aria-label={
                showPassword ? t("messages.HIDE_PASSWORD") : t("messages.SHOW_PASSWORD")
              }
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* رسالة الخطأ أخدت اللون الخاص بالـ Danger من الـ Theme */}
        {error && (
          <span className="text-xs font-bold text-status-danger text-start mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

// التعديل هنا: عشان React DevTools ومتصفح الأخطاء يقدر يتعرف على اسم الكومبوننت بسهولة
SharedInput.displayName = "SharedInput";