import { useState, useEffect } from "react";
import {BellRing, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useGetNotifications } from "../../../BackEndIntegration/Hooks/Queries/useNotificationQueries";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import NotificationBubble from "./NotificationBubble";
interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({isOpen, onClose }: NotificationSidebarProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetNotifications({page:pageNumber, pageSize});

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
          className="fixed inset-0 bg-black/40 z-[998] transition-opacity"
          onClick={onClose}
        />
      )}

      <div 
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-shamelco-dark/10 flex justify-between items-center bg-shamelco-dark/5">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-shamelco-darker text-lg">كل الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="bg-status-danger/10 text-status-danger text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} جديد بالصفحة
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-shamelco-dark/50 hover:bg-shamelco-dark/10 hover:text-shamelco-darker rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* قائمة الإشعارات */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-6 h-full flex items-center justify-center text-shamelco-dark/50 text-sm font-medium">
              جاري تحميل الإشعارات...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center gap-3">
              <BellRing className="w-12 h-12 text-shamelco-dark/20" />
              <p className="text-base font-bold text-shamelco-dark/60">لا توجد إشعارات حالياً</p>
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

        {pagedResult && pagedResult.totalPages > 0 && (
          <div className="p-4 border-t border-shamelco-dark/10 bg-white flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <button
                disabled={!pagedResult.hasPreviousPage}
                onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-shamelco-dark/5 text-shamelco-dark disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" /> السابق
              </button>
              <span className="text-shamelco-dark font-medium text-xs">صفحة {pagedResult.pageNumber} من {pagedResult.totalPages}</span>
              <button
                disabled={!pagedResult.hasNextPage}
                onClick={() => setPageNumber(prev => prev + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-shamelco-dark/5 text-shamelco-dark disabled:opacity-30 disabled:hover:bg-transparent"
              >
                التالي <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}