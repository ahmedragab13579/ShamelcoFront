import { User, Trophy, Gamepad2 } from "lucide-react";
import type { TabType } from "../../../Hooks/Customer/useProfile";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function MainTabs({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (id: TabType) => void }) {
  const { t } = useLanguage();

  const tabs = [
    { id: "info", label: t('messages.MY_ACCOUNT'), icon: User },
    { id: "pitches", label: t('messages.PITCHES'), icon: Trophy },
    { id: "venues", label: t('messages.VENUES'), icon: Gamepad2 },
  ] as const;

  return (
    // البوردر الخارجي أخد درجة خفيفة من اللون الغامق بدل slate-100
    <div className="flex bg-shamelco-surface p-1.5 rounded-2xl shadow-sm border border-shamelco-dark/10 mb-6 sticky top-4 z-30">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isActive
                ? "bg-shamelco-darker text-shamelco-gold shadow-md" // التاب النشط: كحلي غامق مع نص وأيقونة باللون الدهبي
                : "text-shamelco-dark/70 hover:bg-shamelco-dark/5 hover:text-shamelco-darker" // التاب العادي: لون متوسط بيغمق مع الهوفر
            }`}
          >
            <Icon className="w-5 h-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}