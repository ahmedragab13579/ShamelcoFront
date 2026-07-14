import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; 
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export const BookingHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-4 mb-6">
      <Link 
        to={-1 as any} 
        className="flex items-center justify-center w-10 h-10 bg-shamelco-surface border border-shamelco-border rounded-md text-shamelco-accent hover:bg-shamelco-sand hover:text-shamelco-gold transition-all duration-200 shadow-sm focus-visible:outline-shamelco-gold cursor-pointer"
        aria-label={t('messages.BACK') || "رجوع"}
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </Link>
      
      <h1 className="text-xl sm:text-2xl font-black text-shamelco-darker tracking-tight">
        {t('messages.COMPLETE_BOOKING')}
      </h1>
    </div>
  );
};