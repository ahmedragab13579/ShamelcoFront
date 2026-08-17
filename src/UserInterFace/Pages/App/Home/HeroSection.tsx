import { Search, Sparkles } from "lucide-react";
import heroBanner from "../../../Images/premium_synthetic_turf_football_field_at_nig.webp";
import { useHeroSection } from "../../../Hooks/App/useHeroSection";

export function HeroSection() {
  const { user, searchQuery, setSearchQuery, handleSearch, t } = useHeroSection();

  return (
    <section className="px-4 md:px-6">
      <div className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[400px] flex items-center justify-center p-6 md:p-12 shadow-lg border border-shamelco-border/30 bg-shamelco-darker">
        {/* صورة الخلفية */}
        <img 
          src={heroBanner} 
          alt="ملعب شاميلكو" 
          width={1200}
          height={600}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none select-none"
        />

        {/* تراكيب الألوان المتدرجة */}
        <div className="absolute inset-0 bg-gradient-to-t from-shamelco-darker via-shamelco-darker/60 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -end-24 w-80 h-80 bg-shamelco-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -start-24 w-80 h-80 bg-shamelco-accent/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* محتوى الهيرو */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shamelco-gold/10 border border-shamelco-gold/30 text-shamelco-gold text-xs font-black shadow-xs animate-pulse">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('messages.WELCOME')} {user?.name || t('messages.PARTNER')}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
              {t('messages.BOOK_FAVORITE_PITCH_SECONDS')}
            </h1>
            <p className="text-xs md:text-base text-shamelco-border/80 max-w-md mx-auto font-medium">
              {t('messages.EXPLORE_BEST_PITCHES_DESC')}
            </p>
          </div>

          <form 
            onSubmit={handleSearch} 
            className="relative w-full max-w-md flex items-center bg-white rounded-2xl overflow-hidden shadow-gold/20 shadow-lg border border-white/10 group focus-within:ring-2 focus-within:ring-shamelco-gold transition-all duration-300"
          >
            <div className="absolute start-4 text-shamelco-muted pointer-events-none">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>

            <input 
              type="text"
              placeholder={t('messages.SEARCH_PITCH_OR_AREA')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-shamelco-darker ps-11 pe-28 py-3.5 md:py-4 text-sm font-bold placeholder-gray-500 focus:outline-none text-start"
            />

            <button 
              type="submit"
              className="absolute end-1.5 bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker font-black text-xs md:text-sm px-4 py-2 md:py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
            >
              {t('messages.SEARCH_NOW')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
