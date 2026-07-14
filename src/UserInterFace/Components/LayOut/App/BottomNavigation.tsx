import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./constants/navigation";
import { useAuth } from "../../../../Context/Auth/AuthContext";
import toast from "react-hot-toast";

export default function BottomNavigation() {
  const { user } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-shamelco-surface/95 backdrop-blur-md border-t border-shamelco-border px-3 py-2 z-50 safe-area-pb shadow-[0_-4px_20px_-10px_rgba(4,28,50,0.08)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isProfileUnAuth = item.path === "/profile" && !user;
          return (
            <NavLink
              key={item.path}
              to={isProfileUnAuth ? "/auth/login" : item.path}
              onClick={() => {
                if (isProfileUnAuth) {
                  toast.error("يجب تسجيل الدخول للوصول إلى الملف الشخصي", { duration: 3000 });
                }
              }}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-300 ease-out ${
                  isActive && !isProfileUnAuth
                    ? "text-shamelco-gold bg-shamelco-darker shadow-md scale-105 font-black" 
                    : "text-shamelco-muted hover:text-shamelco-darker hover:bg-shamelco-sand/60 font-medium" 
                }`
              }
            >
              <div className="w-6 h-6 flex items-center justify-center transition-transform duration-200">
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}