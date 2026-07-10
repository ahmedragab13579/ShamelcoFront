import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react"; // استخدام Lucide
import type { JSX } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  navItems: { name: string; path: string; icon: JSX.Element }[];
  onLogout: () => void;
}

export default function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen, navItems, onLogout }: SidebarProps) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-shamelco-darker/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-shamelco-darker text-shamelco-bg transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* اللوجو في الـ Sidebar */}
        <div className="flex items-center justify-center h-20 border-b border-shamelco-dark bg-shamelco-darker/50">
          <Link to="/dashboard" className="text-2xl font-black text-white tracking-tight">
            شاميلكو <span className="text-shamelco-gold">.</span>
          </Link>
        </div>

        {/* عناصر القائمة */}
        <nav className="p-4 space-y-1.5 mt-4 overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                  isActive
                    ? "bg-shamelco-gold text-shamelco-darker shadow-md" // النشط: خلفية دهبية ونص كحلي
                    : "hover:bg-shamelco-dark hover:text-white text-shamelco-bg/70"
                }`
              }
            >
              <span className={`text-xl transition-transform duration-200 group-hover:scale-110`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 right-0 w-full p-4 border-t border-shamelco-dark bg-shamelco-darker">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-status-danger hover:bg-status-danger/10 rounded-xl font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}