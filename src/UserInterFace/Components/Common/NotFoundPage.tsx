import { Link } from "react-router-dom";
import { SearchX, ArrowLeft } from "lucide-react"; 
import { useLanguage } from "../../Hooks/Shared/useLanguage";

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-shamelco-bg p-5">
      {/* أيقونة تعبر عن عدم وجود الصفحة بلون أحمر شفاف شوية */}
      <SearchX className="w-24 h-24 text-status-danger/80 mb-4" strokeWidth={1.5} />
      
      {/* رقم 404 بلون الخطأ (Danger) اللي متعرف في الثيم */}
      <h1 className="text-[6rem] leading-none font-bold text-status-danger mb-2">
        404
      </h1>
      
      {/* العنوان الفرعي باللون الأساسي الغامق */}
      <h2 className="text-2xl font-bold text-shamelco-darker mt-3">
        {t('messages.SORRY_PAGE_NOT_FOUND')}
      </h2>
      
      {/* النص التوضيحي بلون متوسط وشفافية للقراءة المريحة */}
      <p className="text-shamelco-muted max-w-lg my-6 leading-relaxed">
        {t('messages.PAGE_NOT_FOUND_DESC')}
      </p>
      
      {/* زرار الرجوع: لون ذهبي مميز لجذب الانتباه كـ CTA رئيسي للعودة */}
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-shamelco-gold text-shamelco-darker rounded-xl font-bold transition-all duration-300 shadow-md hover:bg-shamelco-gold-hover hover:shadow-lg active:scale-95"
      >
        {t('messages.BACK_TO_HOME_PAGE')}
        <ArrowLeft className="w-5 h-5 rtl:rotate-180" /> 
      </Link>
    </div>
  );
};

export default NotFoundPage;