import { Check } from "lucide-react";

export interface FilterOption {
  text: string;
  value: string;
}

interface QuickFiltersProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterValue: string) => void;
  className?: string; 
}

export default function QuickFilters({ 
  filters, 
  activeFilter, 
  onFilterChange,
  className = "" 
}: QuickFiltersProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto hide-scrollbar snap-x ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        
        return (
          <button
            key={filter.value} 
            onClick={() => onFilterChange(filter.value)}
            // ضفنا flex و gap عشان لو الفلتر نشط الأيقونة تظهر جنب النص بشكل متناسق
            className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 snap-start ${
              isActive
                ? "bg-shamelco-darker text-shamelco-gold shadow-md border border-shamelco-darker" // الفلتر النشط: كحلي غامق مع نص دهبي
                : "bg-white text-shamelco-dark/70 border border-shamelco-dark/10 hover:border-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" // الفلتر العادي: فاتح وبيغمق مع الهوفر
            }`}
          >
            {/* الأيقونة دي هتظهر بس لو الفلتر هو اللي متحدد حالياً */}
            {isActive && <Check className="w-4 h-4" strokeWidth={3} />}
            {filter.text}
          </button>
        );
      })}
    </div>
  );
}