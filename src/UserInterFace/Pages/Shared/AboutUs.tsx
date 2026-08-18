import { ShieldCheck, Flame, Tv, Coffee, Trophy } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-shamelco-bg py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-shamelco-darker via-shamelco-dark to-slate-900 text-white p-8 md:p-14 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-shamelco-gold/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("messages.ABOUT_US_TITLE") || "About Shamelco"}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("messages.ABOUT_HERO_SUBTITLE") || "The ultimate Platform-as-a-Service (PaaS) powering sports facilities and entertainment venues across Egypt."}
          </p>
        </div>

        {/* Professional Description Blocks */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-shamelco-gold" />
            {t("messages.ABOUT_MISSION_TITLE") || "Empowering Sports & Entertainment Hubs"}
          </h2>
          <p className="text-lg">
            {t("messages.ABOUT_PARA_1") || "Shamelco (شاملكو) is a state-of-the-art Platform-as-a-Service solution engineered to revolutionize how sports facilities and entertainment venues operate. From high-energy football pitches to vibrant gaming lounges equipped with PlayStation consoles, board game tables, and integrated cafe ordering, Shamelco connects players with their favorite activities effortlessly."}
          </p>
          <p className="text-lg">
            {t("messages.ABOUT_PARA_2") || "Our platform offers facility owners real-time floor plan management, automated duration-based billing, slot-based booking engines, and secure transaction ledgers. For customers, Shamelco guarantees instant reservations, transparent pricing in EGP, and a seamless digital booking experience backed by trusted payment gateway integrations."}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("messages.FEATURE_PITCHES") || "Sports Pitches"}
            </h3>
            <p className="text-sm text-slate-600">
              {t("messages.FEATURE_PITCHES_DESC") || "Seamless slot reservation for football, padel, and multi-sport grounds with live availability calendars."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl mb-4">
              <Tv className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("messages.FEATURE_GAMING") || "Gaming & PlayStations"}
            </h3>
            <p className="text-sm text-slate-600">
              {t("messages.FEATURE_GAMING_DESC") || "Console hardware management, live floor plans, and session billing for gaming lounges."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl mb-4">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("messages.FEATURE_CAFE") || "Cafes & Lounges"}
            </h3>
            <p className="text-sm text-slate-600">
              {t("messages.FEATURE_CAFE_DESC") || "Integrated table management and Point-of-Sale (POS) order systems for venue hospitality."}
            </p>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-shamelco-gold/20 text-shamelco-gold rounded-2xl shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                {t("messages.COMMITMENT_TITLE") || "Paymob Compliant & Secure"}
              </h4>
              <p className="text-sm text-slate-300">
                {t("messages.COMMITMENT_DESC") || "All financial transactions and card processing are handled directly via Paymob's 3D-Secure PCI-DSS compliant payment gateway."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
