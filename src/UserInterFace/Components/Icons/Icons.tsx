// components/Icons.tsx (أو DashboardIcons.tsx حسب مسارك)
import { 
  Home, 
  MapPin, 
  Gamepad2, 
  User, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";

// أيقونات الـ Navigation الأساسية
export const HomeIcon = () => <Home className="w-6 h-6" />;
export const PitchIcon = () => <MapPin className="w-6 h-6" />; // MapPin بديل مناسب للملاعب
export const VenueIcon = () => <Gamepad2 className="w-6 h-6" />;
export const ProfileIcon = () => <User className="w-6 h-6" />;

// أيقونات الـ Dashboard
export const DashboardHomeIcon = () => <LayoutDashboard className="w-6 h-6" />;
export const ReportsIcon = () => <BarChart3 className="w-6 h-6" />;
export const SettingsIcon = () => <Settings className="w-6 h-6" />;
export const LogoutIcon = () => <LogOut className="w-6 h-6" />;