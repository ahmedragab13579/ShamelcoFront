import { Outlet } from "react-router-dom";
import Header from "../Components/Auth/Shared/Header";
import Footer from "../Components/Auth/Shared/Footer";
import authHeroBanner from "../Images/composite_banner_for_a_sports.jpg";
import Language from "../Components/Common/Language";
import { useLanguage } from "../Hooks/Shared/useLanguage";

export default function AuthLayOut() {
  const { t, isRtl } = useLanguage();

  return (
    /* 1. تم إزالة dir="rtl" الثابت من هنا ليعتمد على لغة المتصفح */
    <div className="flex min-h-screen w-full bg-shamelco-bg font-sans selection:bg-shamelco-gold selection:text-shamelco-darker" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* الجانب الأيمن (لأجهزة الديسك توب): ستايل غامق وفخم يعبر عن الهوية */}
      <div className="hidden lg:flex lg:w-1/2 bg-shamelco-darker text-shamelco-surface flex-col justify-between p-12 relative overflow-hidden shadow-2xl z-10">
        
        {/* صورة هيرو خلفية ناعمة */}
        <img 
          src={authHeroBanner} 
          alt={t('messages.AUTH_LAYOUT_HERO_ALT')} 
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none select-none" 
        />

        {/* 2. تعديل الاتجاهات الثابتة في الخلفية لخصائص منطقية */}
        <div className="absolute top-0 end-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] rtl:bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-shamelco-accent/30 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-shamelco-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <Header />
        
        {/* 3. إضافة dir="auto" وحماية النصوص من الانعكاس */}
        <div className="z-10 max-w-lg">
          <h1 dir="auto" className="text-4xl font-black mb-4 leading-tight text-start">
            {t('messages.AUTH_LAYOUT_WELCOME')} <span className="text-shamelco-gold inline-flex animate-pulse">{t('messages.SHAMELCO')}</span>
          </h1>
          <p dir="auto" className="text-shamelco-border/80 text-start leading-relaxed font-medium">
            {t('messages.AUTH_LAYOUT_SUBTITLE')}
          </p>
        </div>
        
        <Footer />
      </div>
      
      {/* الجانب الأيسر (الفورم): مساحة نظيفة مريحة للعين للتركيز على إدخال البيانات */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-shamelco-bg">
        
        {/* 4. تعديل مكان زرار اللغة ليصبح في الطرف المنطقي (end-6 بدل left-6) */}
        <div className="absolute top-6 end-6 z-50 bg-shamelco-surface rounded-full shadow-sm border border-shamelco-border">
          <Language />
        </div>
        
        {/* 5. جعل حركة الدخول من الأسفل لتبدو طبيعية في اللغتين */}
        <main className="w-full max-w-md bg-shamelco-surface sm:p-8 rounded-3xl sm:border sm:border-shamelco-border sm:shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}