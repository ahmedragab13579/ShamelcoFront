import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // السهم لليمين مناسب للرجوع في واجهة عربي (RTL)

export const BookingHeader = () => (
  <div className="flex items-center gap-3 mb-6">
    <Link 
      to={-1 as any} 
      className="flex items-center justify-center w-10 h-10 bg-shamelco-bg border border-shamelco-dark/10 rounded-xl text-shamelco-accent hover:bg-shamelco-dark/5 hover:text-shamelco-darker transition-colors"
    >
      <ChevronRight className="w-5 h-5" />
    </Link>
    <h1 className="text-xl font-black text-shamelco-darker">إتمام الحجز</h1>
  </div>
);