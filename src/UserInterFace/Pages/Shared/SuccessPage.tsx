// src/UserInterFace/Pages/Common/SuccessPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    title = "تمت العملية بنجاح!", 
    message = "شكراً لثقتكم بنا، تم تنفيذ طلبكم كما هو مطلوب.", 
    redirectUrl = "/home", 
    buttonText = "العودة للرئيسية" 
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
        
        {/* حاوية الأيقونة مع حركة نبض خفيفة */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* حلقة خلفية متحركة */}
          <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-status-success/20 opacity-75"></span>
          {/* دائرة الأيقونة الأساسية باللون الأخضر */}
          <div className="relative rounded-full bg-status-success p-4 border-4 border-white shadow-lg">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.5" 
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
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