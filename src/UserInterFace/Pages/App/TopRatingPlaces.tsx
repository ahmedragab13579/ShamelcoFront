import { Link } from "react-router-dom";
import { ChevronLeft, Flame } from "lucide-react";
import TopRating from "../../Components/App/TopRatings";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function TopRatings() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-shamelco-bg pt-4 pb-24 font-sans selection:bg-shamelco-gold selection:text-shamelco-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رابط الرجوع ورأس الصفحة المطور */}
        <div className="flex flex-col gap-4 mb-6">
          <Link 
            to="/home" 
            className="flex items-center gap-1 text-sm font-bold text-shamelco-accent hover:text-shamelco-gold transition-colors w-fit group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180" />
            <span>{t('messages.BACK_TO_HOME')}</span>
          </Link>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker flex items-center gap-2.5 tracking-tight">
              <span>{t('messages.TOP_RATING_PLACES')}</span>
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-shamelco-gold fill-shamelco-gold animate-pulse" aria-hidden="true" />
            </h1>
            <p className="text-xs sm:text-sm text-shamelco-muted font-medium">
              {t('messages.TOP_RATING_PLACES_DESC')}
            </p>
          </div>
        </div>

        {/* عرض القائمة بالتقسيم المناسب (Grid) ومؤشرات التحميل المتكاملة */}
        <div className="bg-shamelco-surface border border-shamelco-border/50 rounded-3xl p-4 sm:p-6 shadow-2xs">
          <TopRating withPagination={true} useSkeleton={true} showViewAll={false} />
        </div>

      </div>
    </div>
  );
}
