import { useLocation, useNavigate } from "react-router-dom";
import errorIllust from "../../Images/errororofflineUI.png";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { 
    title = t('messages.DEFAULT_ERROR_TITLE'), 
    message = t('messages.DEFAULT_ERROR_MESSAGE'), 
    redirectUrl = -1, 
    buttonText = t('messages.DEFAULT_ERROR_BUTTON') 
  } = location.state || {};

  const handleAction = () => {
    if (typeof redirectUrl === 'number') {
      navigate(redirectUrl);
    } else {
      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    // نفس الخلفية الأساسية (--color-shamelco-bg)
    <div className="min-h-screen bg-shamelco-bg flex items-center justify-center p-4 antialiased">
      {/* نفس الكارت المركزي */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-shamelco-dark/5 max-w-lg w-full text-center border border-shamelco-dark/5 flex flex-col items-center">
        
        {/* حاوية الرسمة التوضيحية للخطأ أو حالة الأوفلاين */}
        <div className="relative mb-6 flex items-center justify-center w-48 h-48">
          <img 
            src={errorIllust} 
            alt={title} 
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* النص باللون الكحلي الغامق جداً */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-shamelco-darker mb-4 tracking-tight">
          {title}
        </h1>
        
        {/* الوصف باللون الأحمر الخفيف أو البترولي ليدل على المشكلة */}
        <p className="text-lg text-shamelco-accent/80 mb-10 leading-relaxed font-medium">
          {message}
        </p>

        {/* زر الإجراء: هنا جعلته باللون الكحلي الغامق ليعطي ثباتاً، وعند الهوفر يصبح ذهبياً */}
        <button 
          onClick={handleAction}
          className="bg-shamelco-dark text-white font-bold text-lg px-10 py-4 rounded-xl shadow-md hover:bg-shamelco-gold hover:text-shamelco-darker transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-shamelco-gold/30 w-full md:w-auto"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}