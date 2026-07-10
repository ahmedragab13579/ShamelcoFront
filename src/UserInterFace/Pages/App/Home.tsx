import { Link } from "react-router-dom";
import { Search, ChevronLeft, Sparkles } from "lucide-react";
import { useAuth } from "../../../Context/Auth/AuthContext";
import TopRating from "../../Components/App/TopRatings";

export default function Home() {
  return (
    <div className="w-full space-y-8 pt-4 pb-24">
      <Greeting />
      <GoToExplore />
      <TopRating withPagination={false} showViewAll={true} />
    </div>
  );
}

function Greeting() {
  const { user } = useAuth();
  return (
    <section className="px-4">
      <h1 className="text-2xl font-black text-shamelco-darker flex items-center gap-2">
        أهلاً يا {user?.name?.split(" ")[0] || "بطل"}
        <Sparkles className="w-6 h-6 text-shamelco-gold" />
      </h1>
      <p className="text-sm text-shamelco-dark/70 mt-1 font-medium">جاهز تحجز المغامره الجايه؟</p>
    </section>
  );
}

function GoToExplore() {
  return (
    <section className="px-4">
      <Link 
        to={"/explore"}
        className="group flex items-center justify-between w-full bg-white border border-shamelco-dark/10 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-shamelco-accent/30 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          {/* أيقونة البحث بخلفية بترولية فاتحة */}
          <div className="bg-shamelco-accent/10 p-3 rounded-xl text-shamelco-accent group-hover:bg-shamelco-accent group-hover:text-white transition-colors duration-300">
            <Search className="w-6 h-6" />
          </div>
          
          <div className="flex flex-col text-right">
            <span className="text-shamelco-darker font-bold text-lg">
              اذهب للبحث عن الأماكن
            </span>
            <span className="text-shamelco-dark/60 text-sm mt-0.5">
              استكشف أفضل الملاعب المتاحة للحجز
            </span>
          </div>
        </div>

        {/* سهم التوجيه */}
        <div className="bg-shamelco-dark/5 p-2 rounded-lg text-shamelco-dark/40 group-hover:text-shamelco-accent group-hover:bg-shamelco-accent/10 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </div>
      </Link>
    </section>
  );
}