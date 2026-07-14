import { useState, useEffect } from "react";
import { BellRing, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useGetNotifications } from "../../../BackEndIntegration/Hooks/Queries/useNotificationQueries";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import NotificationBubble from "./NotificationBubble";
import NotificationDetailModal from "./NotificationDetailModal";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({ isOpen, onClose }: NotificationSidebarProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState<NotificationDto | null>(null);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetNotifications({ page: pageNumber, pageSize });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const pagedResult = data?.data;
  const notifications = pagedResult?.items || []; 
  const unreadCount = notifications.filter((n: NotificationDto) => !n.isRead).length;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-shamelco-darker/50 backdrop-blur-2xs z-[998] transition-opacity animate-fade-in"
          onClick={onClose}
        />
      )}

      <div 
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-shamelco-surface shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out flex flex-col border-r border-shamelco-border ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* الهيدر */}
        <div className="p-4 border-b border-shamelco-border flex justify-between items-center bg-shamelco-bg">
          <div className="flex items-center gap-2.5">
            <h3 className="font-black text-shamelco-darker text-lg">كل الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="bg-shamelco-gold text-shamelco-darker text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                {unreadCount} جديد
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-shamelco-muted hover:bg-shamelco-surface hover:text-shamelco-darker hover:border hover:border-shamelco-border rounded-xl transition-all cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* قائمة الإشعارات */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-shamelco-surface divide-y divide-shamelco-border/50">
          {isLoading ? (
            <div className="p-6 h-full flex items-center justify-center text-shamelco-muted text-sm font-bold">
              جاري تحميل الإشعارات...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center gap-3">
              <div className="bg-shamelco-sand p-4 rounded-full text-shamelco-muted">
                <BellRing className="w-10 h-10 stroke-[1.5]" />
              </div>
              <p className="text-base font-bold text-shamelco-darker">لا توجد إشعارات حالياً</p>
              <span className="text-xs text-shamelco-muted">سنقوم بتنبيهك فور حدوث أي تحديث جديد</span>
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

        {/* الترقيم السفلي (Pagination) */}
        {pagedResult && pagedResult.totalPages > 0 && (
          <div className="p-3 border-t border-shamelco-border bg-shamelco-bg flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <button
                disabled={!pagedResult.hasPreviousPage}
                onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-shamelco-border bg-shamelco-surface hover:border-shamelco-accent text-shamelco-darker font-bold disabled:opacity-40 disabled:hover:border-shamelco-border disabled:cursor-not-allowed transition-all text-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" /> السابق
              </button>
              
              <span className="text-shamelco-darker font-bold text-xs bg-shamelco-gold-soft px-2.5 py-1 rounded-md border border-shamelco-gold/30">
                {pagedResult.pageNumber} / {pagedResult.totalPages}
              </span>
              
              <button
                disabled={!pagedResult.hasNextPage}
                onClick={() => setPageNumber(prev => prev + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-shamelco-border bg-shamelco-surface hover:border-shamelco-accent text-shamelco-darker font-bold disabled:opacity-40 disabled:hover:border-shamelco-border disabled:cursor-not-allowed transition-all text-xs cursor-pointer"
              >
                التالي <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        <NotificationDetailModal
          notification={selectedNotification} 
          onClose={() => setSelectedNotification(null)} 
        />
      </div>
    </>
  );
}