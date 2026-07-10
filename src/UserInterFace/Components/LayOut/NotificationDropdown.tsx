import { useState, useRef, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
import { useGetNotifications } from "../../../BackEndIntegration/Hooks/Queries/useNotificationQueries";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import NotificationBubble from "./NotificationBubble";


export default function NotificationDropdown({onViewClick}:{onViewClick: () => void}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const HandleViewClick = () => {
    setIsOpen(false);
    onViewClick();
  }
  const { data, isLoading } = useGetNotifications({page: 1, pageSize: 10});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = data?.data.items||[]; 
      const unreadCount = notifications.filter((n: NotificationDto) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-shamelco-dark/5 text-shamelco-dark/60 hover:bg-shamelco-dark/10 hover:text-shamelco-darker transition-colors relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-status-danger rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full end-0 mt-2 w-80 sm:w-96 bg-white border border-shamelco-dark/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden flex flex-col">
          {/* هيدر القائمة */}
          <div className="p-4 border-b border-shamelco-dark/10 flex justify-between items-center bg-shamelco-dark/5">
            <h3 className="font-bold text-shamelco-darker text-base">الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="bg-status-danger/10 text-status-danger text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} جديد
              </span>
            )}
          </div>

          {/* محتوى القائمة */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-6 text-center text-shamelco-dark/50 text-sm font-medium">
                جاري تحميل الإشعارات...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center gap-2">
                <BellRing className="w-10 h-10 text-shamelco-dark/20" />
                <p className="text-sm font-bold text-shamelco-dark/60">لا توجد إشعارات حالياً</p>
              </div>
            ) : (
            <div className="flex flex-col">
  {notifications.map((notification: NotificationDto) => (
    <NotificationBubble 
      key={notification.id.toString()} 
      notification={notification} 
    />
  ))}
</div>
            )}
          </div>

          <div className="p-3 border-t border-shamelco-dark/10 text-center bg-shamelco-dark/5">
            <button onClick={HandleViewClick} className="text-xs font-bold text-shamelco-accent hover:text-shamelco-darker transition-colors">
              عرض كل الإشعارات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}