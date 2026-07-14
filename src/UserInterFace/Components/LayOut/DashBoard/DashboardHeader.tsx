import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../../../Images/Logo.svg";
import NotificationDropdown from "../NotificationDropdown";
import { ThemeToggle } from "../../Common/ThemeToggle";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import Language from "../../Common/Language";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  setIsNotifSidebarOpen: (isOpen: boolean) => void;
  userName: string;
  userId?: GUID; 
}

export default function DashboardHeader({ setIsSidebarOpen, setIsNotifSidebarOpen, userName, userId }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="h-20 bg-shamelco-surface/95 backdrop-blur-md border-b border-shamelco-border flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30 shadow-sm transition-colors duration-200">
      
      {/* الجانب الأيمن (أو الأيسر حسب اللغة): اللوجو وزرار القائمة */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="p-2 -me-2 rounded-md text-shamelco-muted hover:text-shamelco-darker hover:bg-shamelco-sand lg:hidden transition-all duration-200 cursor-pointer focus-visible:outline-shamelco-gold"
          onClick={() => setIsSidebarOpen(true)}
          title="فتح القائمة"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-3 group focus-visible:outline-shamelco-gold rounded-md">
          <img src={Logo} alt="شاميلكو" className="h-10 w-auto transition-transform duration-200 group-hover:scale-105" />
          <h1 className="text-xl font-black text-shamelco-darker hidden sm:block tracking-tight">
            {t('messages.SHAMELCO_DASHBOARD')}
          </h1>
        </Link>
      </div>

      {/* الجانب المقابل: الأدوات والبروفايل */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Language />
        <ThemeToggle />
        
        {userId && (
          <div className="relative">
            <NotificationDropdown 
              onViewClick={() => setIsNotifSidebarOpen(true)} 
            />
          </div>
        )}

        {/* فاصل بصري */}
        <div className="w-px h-6 bg-shamelco-border mx-1 hidden sm:block"></div>

        {/* زرار البروفايل */}
        <Link 
          to={"profile"} 
          className="flex items-center gap-3 cursor-pointer hover:bg-shamelco-sand/80 p-1.5 pe-3 rounded-full transition-all duration-200 border border-transparent hover:border-shamelco-border focus-visible:outline-shamelco-gold"
        >
          <div className="text-start hidden sm:block">
            <p className="text-sm font-black text-shamelco-darker leading-tight">
              {userName || ""}
            </p>
            <p className="text-xs text-shamelco-muted font-semibold mt-0.5">
              {t('messages.SYSTEM_MANAGER')}
            </p>
          </div>

          {/* تعديل ألوان الـ Avatar لتناسب الفاتح والغامق بدون مشاكل في الـ Contrast */}
          <div className="w-10 h-10 rounded-full bg-shamelco-gold-soft text-shamelco-gold flex items-center justify-center font-black text-lg border border-shamelco-gold/30 shadow-sm shrink-0">
            {userName ? userName.charAt(0) : "أ"}
          </div>
        </Link>

      </div>
    </header>
  );
}