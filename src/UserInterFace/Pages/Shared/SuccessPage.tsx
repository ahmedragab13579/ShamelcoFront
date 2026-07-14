import { useLocation, useNavigate } from "react-router-dom";
import successIllust from "../../Images/bookingsuccessmodal.png";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { 
    title = t('messages.DEFAULT_SUCCESS_TITLE'), 
    message = t('messages.DEFAULT_SUCCESS_MESSAGE'), 
    redirectUrl = "/home", 
    buttonText = t('messages.BACK_TO_HOME') 
  } = location.state || {};

  const handleAction = () => {
    if (typeof redirectUrl === 'string' && redirectUrl.startsWith('http')) {
      window.location.href = redirectUrl; 
    } 
    else if (typeof redirectUrl === 'number') {
      navigate(redirectUrl);
    } else {
      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-shamelco-bg flex items-center justify-center p-4 antialiased">
      {/* الكارت المركزي */}
      <div className="bg-shamelco-bg p-8 md:p-12 rounded-3xl shadow-2xl shadow-shamelco-dark/5 max-w-lg w-full text-center border border-shamelco-dark/5 flex flex-col items-center">
        
        {/* حاوية الرسمة التوضيحية لنجاح العملية */}
        <div className="relative mb-6 flex items-center justify-center w-48 h-48">
          <img 
            src={successIllust} 
            alt={title} 
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* النص باللون الكحلي الغامق جداً (--color-shamelco-darker) */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-shamelco-darker mb-4 tracking-tight">
          {title}
        </h1>
        
        {/* الوصف باللون الأزرق البترولي الأخف قليلاً (--color-shamelco-accent) */}
        <p className="text-lg text-shamelco-accent/80 mb-10 leading-relaxed font-medium">
          {message}
        </p>

        {/* الزر الأساسي باللون الذهبي المميز (--color-shamelco-gold) والنص غامق */}
        <button 
          onClick={handleAction}
          className="bg-shamelco-gold text-shamelco-darker font-bold text-lg px-10 py-4 rounded-xl shadow-md hover:bg-shamelco-gold/90 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-shamelco-gold/30 w-full md:w-auto"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}