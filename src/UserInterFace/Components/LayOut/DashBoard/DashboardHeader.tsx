import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../../../Images/Logo.svg";
import NotificationDropdown from "../NotificationDropdown";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  setIsNotifSidebarOpen: (isOpen: boolean) => void; // دالة فتح شريط الإشعارات
  userName: string;
  userId?: GUID; 
}

export default function DashboardHeader({ setIsSidebarOpen, setIsNotifSidebarOpen, userName, userId }: HeaderProps) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-shamelco-dark/10 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="p-2 -mr-2 rounded-lg text-shamelco-accent hover:bg-shamelco-dark/5 lg:hidden transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="شاميلكو" className="h-10 w-auto" />
          <h1 className="text-xl font-black text-shamelco-darker hidden sm:block tracking-tight">
            لوحة تحكم شاميلكو
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* تم إزالة الـ <button> الخارجي لأنه يسبب خطأ وتداخل */}
        {userId && (
          <div className="relative">
            <NotificationDropdown 
              onViewClick={() => setIsNotifSidebarOpen(true)} 
            />
          </div>
        )}

        <div className="w-px h-8 bg-shamelco-dark/10 mx-1 sm:mx-2 hidden sm:block"></div>

        <Link 
          to={"profile"} 
          className="flex items-center gap-3 cursor-pointer hover:bg-shamelco-dark/5 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-shamelco-dark/5"
        >
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-shamelco-darker leading-tight">
              {userName || "أحمد رجب"}
            </p>
            <p className="text-xs text-shamelco-dark/60 font-medium">
              مدير النظام
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-shamelco-darker text-shamelco-gold flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
            {userName ? userName.charAt(0) : "أ"}
          </div>
        </Link>
      </div>
    </header>
  );
}