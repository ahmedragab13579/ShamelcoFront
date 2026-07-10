import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    title = "عذراً، حدث خطأ ما!", 
    message = "لم نتمكن من إتمام العملية. قد تكون هناك مشكلة مؤقتة أو أن الصلاحيات غير كافية.", 
    redirectUrl = -1, 
    buttonText = "حاول مرة أخرى / العودة" 
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
        
        {/* حاوية الأيقونة مع حركة اهتزاز خفيفة (مستوحاة من الـ Scrollbar hover الخاص بك) */}
        <div className="relative mb-8 flex items-center justify-center group">
          {/* تأثير نبض أحمر خفيف */}
          <span className="animate-pulse absolute inline-flex h-20 w-20 rounded-full bg-status-danger/15"></span>
          
          {/* دائرة الأيقونة باللون الأحمر (--color-status-danger) */}
          <div className="relative rounded-full bg-status-danger p-4 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
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