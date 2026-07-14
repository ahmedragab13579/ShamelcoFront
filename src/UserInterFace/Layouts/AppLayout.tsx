import { Outlet } from "react-router-dom";
import Header from "../Components/LayOut/App/Header";
import BottomNavigation from "../Components/LayOut/App/BottomNavigation";
import { useState } from "react";
import NotificationSidebar from "../Components/LayOut/NotificationSidebar";
import { useLanguage } from "../Hooks/Shared/useLanguage";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isRtl } = useLanguage();

  return (
    <div className="min-h-screen bg-shamelco-bg flex flex-col font-sans text-shamelco-darker selection:bg-shamelco-gold selection:text-shamelco-darker" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* الشريط العلوي الثابت */}
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* حاوية المحتوى الرئيسي المتغيرة */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-12 pt-6 animate-fade-in">
        <Outlet />
      </main>
      
      {/* القائمة الجانبية للإشعارات */}
      <NotificationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* شريط التنقل السفلي الخاص بالهواتف */}
      <BottomNavigation />
    </div>
  );
}