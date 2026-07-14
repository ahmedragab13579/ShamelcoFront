import { useState, useRef, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
import { useGetNotifications } from "../../../BackEndIntegration/Hooks/Queries/useNotificationQueries";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import NotificationBubble from "./NotificationBubble";
import NotificationDetailModal from "./NotificationDetailModal";

export default function NotificationDropdown({ onViewClick }: { onViewClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationDto | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const HandleViewClick = () => {
    setIsOpen(false);
    onViewClick();
  };
  
  const { data, isLoading } = useGetNotifications({ page: 1, pageSize: 10 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = data?.data.items || []; 
  const unreadCount = notifications.filter((n: NotificationDto) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-shamelco-bg border border-shamelco-border text-shamelco-darker hover:bg-shamelco-gold-soft hover:border-shamelco-gold/50 hover:text-shamelco-gold transition-all relative cursor-pointer shadow-2xs"
        title="الإشعارات"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-status-danger rounded-full border-2 border-shamelco-surface animate-ping"></span>
        )}
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-status-danger rounded-full border-2 border-shamelco-surface"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full end-0 mt-3 w-80 sm:w-96 bg-shamelco-surface border border-shamelco-border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          {/* هيدر القائمة */}
          <div className="p-4 border-b border-shamelco-border flex justify-between items-center bg-shamelco-bg">
            <h3 className="font-black text-shamelco-darker text-base">الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="bg-shamelco-gold text-shamelco-darker text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                {unreadCount} جديد
              </span>
            )}
          </div>

          {/* محتوى القائمة */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar bg-shamelco-surface divide-y divide-shamelco-border/40">
            {isLoading ? (
              <div className="p-6 text-center text-shamelco-muted text-sm font-bold">
                جاري تحميل الإشعارات...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center gap-2">
                <div className="bg-shamelco-sand p-3 rounded-full text-shamelco-muted">
                  <BellRing className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-sm font-bold text-shamelco-darker">لا توجد إشعارات حالياً</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notification: NotificationDto) => (
                  <NotificationBubble 
                    key={notification.id.toString()} 
                    notification={notification} 
                    onClick={(notif) => {
                      setSelectedNotification(notif);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-shamelco-border text-center bg-shamelco-bg">
            <button 
              onClick={HandleViewClick} 
              className="text-xs font-black text-shamelco-accent hover:text-shamelco-gold transition-colors cursor-pointer"
            >
              عرض كل الإشعارات
            </button>
          </div>
        </div>
      )}
      
      <NotificationDetailModal 
        notification={selectedNotification} 
        onClose={() => setSelectedNotification(null)} 
      />
    </div>
  );
}