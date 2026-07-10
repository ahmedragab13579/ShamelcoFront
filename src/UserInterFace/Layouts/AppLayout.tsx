import { Outlet } from "react-router-dom";
import Header from "../Components/LayOut/App/Header";
import BottomNavigation from "../Components/LayOut/App/BottomNavigation";
import { useState } from "react";
import NotificationSidebar from "../Components/LayOut/NotificationSidebar";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-shamelco-bg flex flex-col font-sans text-shamelco-darker" dir="rtl">
      
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-8 pt-6">
        <Outlet />
      </main>
      
      {isSidebarOpen && (
        <NotificationSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      
      <BottomNavigation />
    </div>
  );
}