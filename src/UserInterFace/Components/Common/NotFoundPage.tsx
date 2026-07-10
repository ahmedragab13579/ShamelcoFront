import { Link } from "react-router-dom";
import { SearchX, ArrowRight } from "lucide-react"; // ArrowRight بيشاور يمين عشان الموقع عربي (الرجوع)

const NotFoundPage = () => {
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
        عفواً، الصفحة غير موجودة!
      </h2>
      
      {/* النص التوضيحي بلون متوسط وشفافية للقراءة المريحة */}
      <p className="text-shamelco-dark/70 max-w-lg my-6 leading-relaxed">
        الرابط اللي بتحاول توصله إما تم حذفه، أو تم تغيير اسمه، أو إنه غير موجود
        من الأساس في نظام شاميلكو.
      </p>
      
      {/* زرار الرجوع: لون كحلي غامق مع نص دهبي عشان يحفز اليوزر يرجع */}
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-shamelco-darker text-shamelco-gold rounded-xl font-bold transition-all duration-300 shadow-md hover:bg-shamelco-dark hover:shadow-lg active:scale-95"
      >
        الرجوع للصفحة الرئيسية
        <ArrowRight className="w-5 h-5" /> 
      </Link>
    </div>
  );
};

export default NotFoundPage;