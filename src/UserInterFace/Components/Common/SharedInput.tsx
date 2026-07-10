// src/Components/Common/AuthInput.tsx
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SharedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const SharedInput = forwardRef<HTMLInputElement, SharedInputProps>(
  ({ label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "Password" && showPassword ? "text" : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {/* الليبل أخد اللون الغامق عشان يكون واضح ومقري */}
        <label className="text-sm font-bold text-shamelco-darker block text-right">
          {label}
        </label>

        <div className="relative">
          <input
            {...props}
            ref={ref}
            type={inputType}
            // الـ Input العادي: خلفية شفافة من اللون الغامق، ولما يركز عليه (focus) بياخد تأثير الأزرق البترولي
            className={`w-full px-4 py-3 pl-12 rounded-xl border text-right transition-all duration-300 outline-none text-shamelco-darker bg-shamelco-dark/5
              ${
                error
                  ? "border-status-danger focus:border-status-danger focus:ring-2 focus:ring-status-danger/20"
                  : "border-shamelco-dark/10 focus:border-shamelco-accent focus:bg-white focus:ring-4 focus:ring-shamelco-accent/10"
              }`}
          />

          {type === "Password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              // أيقونة العين واخدة لون باهت، ولما اليوزر يقف عليها بتاخد اللون الثانوي للموقع
              className="absolute top-1/2 -translate-y-1/2 left-3 text-shamelco-dark/40 hover:text-shamelco-accent transition-colors p-1"
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {/* رسالة الخطأ أخدت اللون الخاص بالـ Danger من الـ Theme */}
        {error && (
          <span className="text-xs font-bold text-status-danger text-right mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);