import { LayoutDashboard } from "lucide-react";
import Logo from "../../../Images/Logo.svg";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function Header() {
  const { t } = useLanguage();

  return (
    <>
      {/* الخلفيات المضيئة (Glow Effects) 
        استبدلنا الأخضر والأزرق القديم بلون الأكشن (الدهبي) واللون الثانوي (الأزرق البترولي)
      */}
      <div className="absolute -top-20 -start-20 w-96 h-96 bg-shamelco-gold/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -end-20 w-96 h-96 bg-shamelco-accent/20 rounded-full blur-3xl"></div>
      
      <div className="z-10 flex items-center gap-4 mb-6">
        <img src={Logo} alt={t('messages.SHAMELCO')} className="h-12 w-auto" />
        <div className="flex items-center gap-2 text-3xl font-black text-shamelco-gold tracking-wide">
          {t('messages.SHAMELCO')} 
          <span className="flex items-center gap-1 text-shamelco-bg font-normal text-xl">
            Hub 
            <LayoutDashboard className="w-5 h-5 text-shamelco-accent" strokeWidth={2.5} />
          </span>
        </div>
      </div>
      
      {/* ضفت margin-top بسيط عشان يفصل اللوجو عن العنوان الرئيسي ويدي مساحة تتنفس */}
      <div className="z-10 max-w-md my-auto mt-12">
        {/* العنوان الرئيسي باللون الفاتح الأساسي للموقع عشان ينور على الخلفية الغامقة */}
        <h2 className="text-4xl font-bold leading-tight mb-4 text-shamelco-bg">
          {t('messages.AUTH_HEADER_TITLE')}
        </h2>
        {/* النص الفرعي أخد نفس اللون الفاتح بس بشفافية 70% عشان يعمل تباين مع العنوان */}
        <p className="text-shamelco-bg/70 text-lg leading-relaxed">
          {t('messages.AUTH_HEADER_SUBTITLE')}
        </p>
      </div>
    </>
  );
}