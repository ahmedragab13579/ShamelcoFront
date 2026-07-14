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
            className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 snap-start active:scale-[0.97] cursor-pointer ${
              isActive
                ? "bg-shamelco-darker text-shamelco-gold shadow-sm border border-shamelco-darker"
                : "bg-white text-shamelco-dark/70 border border-shamelco-border hover:border-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-bg/50"
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