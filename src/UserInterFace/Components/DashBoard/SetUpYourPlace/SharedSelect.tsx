import { ChevronDown } from "lucide-react";

interface SharedSelectProps {
  label: string;
  register: any;
  error?: string;
  options: Array<{ value: string; label: string }>;
  [key: string]: any;
}

export const SharedSelect = ({ label, register, error, options, ...props }: SharedSelectProps) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="block text-sm font-bold text-shamelco-darker mb-1 text-start">{label}</label>
    <div className="relative">
      <select
        {...register}
        {...props}
        className={`w-full px-4 pe-10 py-3 rounded-md border appearance-none transition-all duration-200 outline-none text-shamelco-darker bg-shamelco-surface text-start font-bold text-sm cursor-pointer shadow-sm
          ${error 
            ? "border-status-danger focus:ring-2 focus:ring-status-danger/20" 
            : "border-shamelco-border hover:border-shamelco-gold/50 focus:border-shamelco-gold focus:ring-2 focus:ring-shamelco-gold/20"}`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value} className="bg-shamelco-surface text-shamelco-darker font-semibold py-1">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-shamelco-muted pointer-events-none" />
    </div>
    {error && <span className="text-xs font-bold text-status-danger text-start mt-1">{error}</span>}
  </div>
);
