import { Copyright } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <div className="z-10 flex items-center gap-1.5 text-xs text-shamelco-border/60 font-medium tracking-wide">
      <Copyright className="w-3.5 h-3.5" />
      <span>2026 Shamelco. {t('messages.ALL_RIGHTS_RESERVED')}</span>
    </div>
  );
}