import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export function FeaturesSection() {
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
