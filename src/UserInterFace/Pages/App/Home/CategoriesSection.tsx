import { Link } from "react-router-dom";
import { Trophy, Award, Target, Activity, Gamepad2 } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export function CategoriesSection() {
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
