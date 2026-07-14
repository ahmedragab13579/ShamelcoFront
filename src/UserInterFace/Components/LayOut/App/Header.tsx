import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../../Context/Auth/AuthContext";
import { NAV_ITEMS } from "./constants/navigation";
import Logo from "../../../Images/Logo.svg";
import NotificationDropdown from "../NotificationDropdown";
import { ThemeToggle } from "../../Common/ThemeToggle";
import toast from "react-hot-toast";
import Language from "../../Common/Language";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (result: boolean) => void }) {
  const { user } = useAuth();
  const{t} = useLanguage();
  return (
    <header className="sticky top-0 z-50 bg-shamelco-surface/90 backdrop-blur-md border-b border-shamelco-border shadow-2xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* اللوجو */}
        <Link to="/home" className="flex items-center gap-3 transition-transform hover:scale-105" aria-label="الذهاب للرئيسية">
          <img src={Logo} alt="شاميلكو" className="h-10 w-auto" aria-hidden="true" />
          <span className="sr-only">شاميلكو</span>
        </Link>

        {/* روابط التنقل للشاشات الكبيرة */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isProfileUnAuth = item.path === "/profile" && !user;
            return (
              <NavLink
                key={item.path}
                to={isProfileUnAuth ? "/auth/login" : item.path}
                onClick={() => {
                  if (isProfileUnAuth) {
                    toast.error(t('messages.NEED_LOGIN'), { duration: 3000 });
                  }
                }}
                className={({ isActive }) =>
                  `text-sm font-bold transition-all duration-200 py-2 relative ${
                    isActive && !isProfileUnAuth
                      ? "text-shamelco-darker font-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-shamelco-gold after:rounded-full"
                      : "text-shamelco-muted hover:text-shamelco-accent"
                  }`
                }
              >
                {t('messages.' + item.name)}
              </NavLink>
            );
          })}
        </nav>

        {/* منطقة الحساب والإشعارات */}
        <div className="flex items-center gap-3 md:gap-4">
          <Language />
          <ThemeToggle />
          
          {user && (
            <div className="relative">
              <NotificationDropdown 
                onViewClick={() => setIsSidebarOpen(true)} 
              />
            </div>
          )}
          
          {user ? (
            <Link
              to={`profile`}
              title={user.name}
              className="w-10 h-10 rounded-xl bg-shamelco-gold-soft text-shamelco-darker font-black flex items-center justify-center border border-shamelco-gold/40 hover:bg-shamelco-darker hover:text-shamelco-gold transition-all shadow-2xs active:scale-95"
            >
              {user.name ? user.name.charAt(0) : "ي"}
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center justify-center text-xs md:text-sm font-black text-shamelco-darker bg-shamelco-gold px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:bg-shamelco-gold-hover hover:shadow-md transition-all duration-200 active:scale-95"
            >
              دخول
            </Link>
          )}
        </div>
        
      </div>
    </header>
  );
}