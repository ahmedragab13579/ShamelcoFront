import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sparkles, Trophy, Award, Target, Activity, Gamepad2 } from "lucide-react";
import { useAuth } from "../../../Context/Auth/AuthContext";
import TopRating from "../../Components/App/TopRatings";
import heroBanner from "../../Images/premium_synthetic_turf_football_field_at_nig.jpg";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-shamelco-bg space-y-10 pt-4 pb-24 font-sans">
      {/* قسم الترحيب والهيرو */}
      <HeroSection />

      {/* قسم التصنيفات السريعة */}
      <CategoriesSection />

      {/* الأعلى تقييماً مع هيكل skeleton مدمج */}
      <TopRating withPagination={false} showViewAll={true} useSkeleton={true} />

      {/* ميزات شاميلكو */}
      <FeaturesSection />
    </div>
  );
}

function HeroSection() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/explore`);
    }
  };

  return (
    <section className="px-4 md:px-6">
      <div className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[400px] flex items-center justify-center p-6 md:p-12 shadow-lg border border-shamelco-border/30 bg-shamelco-darker">
        {/* صورة الخلفية */}
        <img 
          src={heroBanner} 
          alt="ملعب شاميلكو" 
          className="absolute inset-0 w-full h-full object-cover  opacity-50 pointer-events-none select-none"
        />

        {/* تراكيب الألوان المتدرجة */}
        <div className="absolute inset-0 bg-gradient-to-t from-shamelco-darker via-shamelco-darker/60 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -end-24 w-80 h-80 bg-shamelco-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -start-24 w-80 h-80 bg-shamelco-accent/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* محتوى الهيرو */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shamelco-gold/10 border border-shamelco-gold/30 text-shamelco-gold text-xs font-black shadow-xs animate-pulse">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('messages.WELCOME')}  {user?.name || t('messages.PARTNER')}</span>
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
    className="w-full bg-transparent text-shamelco-darker ps-11 pe-28 py-3.5 md:py-4 text-sm font-bold placeholder-shamelco-muted/60 focus:outline-none text-start"
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

function CategoriesSection() {
  const { t } = useLanguage();

  const categories = [
    {
      name: t('messages.FIVE_A_SIDE'),
      subtitle: t('messages.FIVE_A_SIDE_SUB'),
      path: "/explore?placeType=Pitch&category=FiveASide",
      icon: <Trophy className="w-5 h-5" aria-hidden="true" />,
      bg: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white"
    },
    {
      name: t('messages.SIX_A_SIDE'),
      subtitle: t('messages.SIX_A_SIDE_SUB'),
      path: "/explore?placeType=Pitch&category=SixASide",
      icon: <Award className="w-5 h-5" aria-hidden="true" />,
      bg: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
    },
    {
      name: t('messages.PADEL'),
      subtitle: t('messages.PADEL_SUB'),
      path: "/explore?placeType=Pitch&category=Padel",
      icon: <Target className="w-5 h-5" aria-hidden="true" />,
      bg: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
    },
    {
      name: t('messages.TENNIS'),
      subtitle: t('messages.TENNIS_SUB'),
      path: "/explore?placeType=Pitch&category=Tennis",
      icon: <Activity className="w-5 h-5" aria-hidden="true" />,
      bg: "bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white"
    },
    {
      name: t('messages.VENUES'),
      subtitle: t('messages.VENUES_SUB'),
      path: "/explore?placeType=Venue&category=Cafe",
      icon: <Gamepad2 className="w-5 h-5" aria-hidden="true" />,
      bg: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
    }
  ];

  return (
    <section className="px-4 md:px-6">
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-black text-shamelco-darker tracking-tight">
          {t('messages.BROWSE_BY_SPORT')}
        </h2>
        <p className="text-xs text-shamelco-muted mt-0.5 font-medium">
          {t('messages.CHOOSE_SPORT_OR_LOUNGE')}
        </p>
      </div>

      <div className="flex gap-3.5 overflow-x-auto md:grid md:grid-cols-5 snap-x snap-mandatory pb-3 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="group min-w-[130px] flex-1 snap-start bg-shamelco-surface hover:bg-shamelco-darker border border-shamelco-border hover:border-shamelco-gold p-4 rounded-2xl flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md cursor-pointer"
          >
            <div className={`p-3 rounded-xl transition-colors duration-300 ${cat.bg}`}>
              {cat.icon}
            </div>
            <div className="space-y-0.5">
              <span className="block font-black text-shamelco-darker group-hover:text-white text-sm md:text-base transition-colors duration-300">
                {cat.name}
              </span>
              <span className="block text-[10px] text-shamelco-muted group-hover:text-shamelco-border/60 transition-colors duration-300">
                {cat.subtitle}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('messages.FEAT_CONFIRM_TITLE'),
      desc: t('messages.FEAT_CONFIRM_DESC'),
      emoji: "⚡"
    },
    {
      title: t('messages.FEAT_PRICES_TITLE'),
      desc: t('messages.FEAT_PRICES_DESC'),
      emoji: "🏷️"
    },
    {
      title: t('messages.FEAT_SUPPORT_TITLE'),
      desc: t('messages.FEAT_SUPPORT_DESC'),
      emoji: "🤝"
    }
  ];

  return (
    <section className="px-4 md:px-6">
      <div className="bg-shamelco-surface border border-shamelco-border/60 p-6 rounded-3xl shadow-2xs">
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-black text-shamelco-darker tracking-tight">
            {t('messages.WHY_CHOOSE_SHAMELCO')}
          </h2>
          <p className="text-xs text-shamelco-muted mt-0.5 font-medium">
            {t('messages.EASIEST_BOOKING_EXPERIENCE')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="flex gap-4 items-start p-2 hover:bg-shamelco-bg/50 rounded-xl transition-colors duration-200">
              <div className="text-3xl bg-shamelco-bg p-3 rounded-2xl shadow-3xs border border-shamelco-border/40 select-none">
                {feat.emoji}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-shamelco-darker text-sm md:text-base">
                  {feat.title}
                </h3>
                <p className="text-xs text-shamelco-muted leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}