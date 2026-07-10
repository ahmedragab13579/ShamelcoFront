import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../../Context/Auth/AuthContext";
import { NAV_ITEMS } from "./constants/navigation";
import Logo from "../../../Images/Logo.svg";
import NotificationDropdown from "../NotificationDropdown";
import toast from "react-hot-toast";

export default function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (result: boolean) => void }) {
  const { user } = useAuth();

  function HandleUnAuthUserProfileClick() {
    if (!user) {
      toast.error("يجب تسجيل الدخول للوصول إلى الملف الشخصي", { duration: 3000 });
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-shamelco-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link to="/home" className="flex items-center gap-3">
          <img src={Logo} alt="شاميلكو" className="h-10 w-auto" />
          <span className="sr-only">شاميلكو</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              onClick={() => {
                if (item.path === "/profile") {
                  HandleUnAuthUserProfileClick();
                }
              }}
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-shamelco-accent"
                    : "text-shamelco-dark/70 hover:text-shamelco-accent"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* التعديل هنا: تمت إزالة الـ <button> المغلف للـ Dropdown وتم تمرير true للفتح */}
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
              className="w-9 h-9 rounded-full bg-shamelco-dark/5 text-shamelco-darker flex items-center justify-center font-bold border border-shamelco-dark/10 hover:bg-shamelco-dark/10 transition-colors"
            >
              {user.name ? user.name.charAt(0) : "ي"}
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="hidden md:flex text-sm font-bold text-shamelco-gold bg-shamelco-darker px-4 py-2 rounded-xl hover:bg-shamelco-dark transition-all active:scale-95"
            >
              دخول
            </Link>
          )}
        </div>
        
      </div>
    </header>
  );
}