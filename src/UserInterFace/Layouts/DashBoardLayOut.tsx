import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth/AuthContext";
import { getDashboardNavItems } from "../Components/LayOut/DashBoard/constants/navigation";
import DashboardSidebar from "../Components/LayOut/DashBoard/DashboardSidebar";
import DashboardHeader from "../Components/LayOut/DashBoard/DashboardHeader";
import Loading from "../Components/Common/Loading";
import Error from "../Components/Common/Error";
import { useLogoutMutation } from "../../BackEndIntegration/Hooks/Mutations/useAuthMutations";
import NotificationSidebar from "../Components/LayOut/NotificationSidebar";
import asGUID from "../../BackEndIntegration/Types/shared/Guid";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isNotifSidebarOpen, setIsNotifSidebarOpen] = useState(false); 
  
  const { user, logoutState } = useAuth(); 
  const nav = useNavigate();
  
  let homePath = "/dashboard";
  if (user?.pitchId) {
    homePath = `/dashboard/pitch/${user.pitchId}`;
  } else if (user?.venueId) {
    homePath = `/dashboard/venue/${user.venueId}`;
  }
  
  const { mutate, isPending, isError } = useLogoutMutation();
  const navItems = getDashboardNavItems(homePath);

  function handleLogOut() {
    mutate(undefined, {
      onSuccess: () => {
        if (logoutState) logoutState(); 
        nav("/", { replace: true });
      },
      onError: (error) => {
        console.error("فشل تسجيل الخروج:", error);
      }
    });
  }

  if (isPending) return <Loading text="جارِ تسجيل الخروج..."/>;
  if (isError) return <Error text="حدث خطأ أثناء تسجيل الخروج"/>; 

  return (
    <div className="min-h-screen bg-shamelco-bg flex text-shamelco-darker" dir="rtl">
        
      <DashboardSidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        navItems={navItems}
        onLogout={handleLogOut}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <DashboardHeader 
          setIsSidebarOpen={setIsSidebarOpen} 
          setIsNotifSidebarOpen={setIsNotifSidebarOpen}
          userId={asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")}
          userName={user?.name || ""}
        />

        <div className="flex-1 overflow-auto w-full relative">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
             <Outlet />
          </div>
          
          {/* شريط الإشعارات الجانبي */}
          {isNotifSidebarOpen &&  (
            <NotificationSidebar 
              isOpen={isNotifSidebarOpen} 
              onClose={() => setIsNotifSidebarOpen(false)}
            />
          )}
        </div>
      </main>
      
    </div>
  );
}