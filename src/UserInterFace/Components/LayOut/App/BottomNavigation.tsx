import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./constants/navigation";

export default function BottomNavigation() {
  return (
    // الخلفية أخدت الأبيض الأساسي والبوردر بقي لون غامق شفاف متناسق مع باقي الـ Components
    <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-shamelco-dark/10 px-2 py-2 z-50 safe-area-pb shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "text-shamelco-gold bg-shamelco-darker shadow-md scale-105" // النشط: خلفية كحلي ونص دهبي
                  : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" // الخامل: أزرق بترولي
              }`
            }
          >
            {/* الأيقونات جاية من الـ NAV_ITEMS اللي اتحدثت في ملف الـ Icons */}
            <div className="w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}