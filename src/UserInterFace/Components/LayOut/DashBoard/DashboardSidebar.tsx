import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { JSX } from "react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  navItems: { name: string; path: string; icon: JSX.Element }[];
  onLogout: () => void;
}

export default function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen, navItems, onLogout }: SidebarProps) {
  const { t, isRtl } = useLanguage();

  return (
    <>
      {/* خلفية التعتيم للشاشات الصغيرة */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-shamelco-darker/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 w-72 bg-shamelco-darker text-shamelco-surface transform transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none lg:static lg:translate-x-0 border-e border-shamelco-dark/50 flex flex-col justify-between ${
          isSidebarOpen 
            ? "translate-x-0" 
            : isRtl 
              ? "translate-x-full" 
              : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* اللوجو */}
          <div className="flex items-center justify-center h-20 border-b border-shamelco-dark bg-shamelco-dark/30 shrink-0">
            <Link to="/dashboard" className="text-2xl font-black text-shamelco-surface tracking-tight flex items-center gap-1 focus-visible:outline-shamelco-gold rounded-md px-2">
              <span>{t('messages.SHAMELCO_DASHBOARD')}</span>
              <span className="text-shamelco-gold animate-pulse text-3xl leading-none">.</span>
            </Link>
          </div>

          {/* عناصر القائمة */}
          <nav className="p-4 space-y-1.5 overflow-y-auto flex-1 custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-md font-bold transition-all duration-200 group focus-visible:outline-shamelco-gold ${
                    isActive
                      ? "bg-shamelco-gold text-shamelco-darker font-black shadow-gold rtl:-translate-x-1 ltr:translate-x-1"
                      : "hover:bg-shamelco-dark hover:text-shamelco-surface text-shamelco-border/70 rtl:hover:-translate-x-1 ltr:hover:translate-x-1"
                  }`
                }
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110 shrink-0">
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide truncate">
                  {t('messages.' + item.name)}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* زر تسجيل الخروج في الأسفل */}
        <div className="p-4 border-t border-shamelco-dark bg-shamelco-darker shrink-0">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-status-danger hover:bg-status-danger/15 rounded-md font-bold transition-all duration-200 cursor-pointer group focus-visible:outline-status-danger"
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 shrink-0 rtl:rotate-180" />
            <span className="text-sm tracking-wide">{t('messages.LOGOUT')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}