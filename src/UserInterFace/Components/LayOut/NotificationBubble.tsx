import { CheckCircle2 } from "lucide-react";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import { useMarkAsReadNotificationMutation } from "../../../BackEndIntegration/Hooks/Mutations/useNotificationMutations";

interface NotificationBubbleProps {
  notification: NotificationDto;
  onClick?: (notification: NotificationDto) => void;
}

export default function NotificationBubble({ notification, onClick }: NotificationBubbleProps) {
  const { mutate: markAsRead, isPending } = useMarkAsReadNotificationMutation();

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const handleMarkAsRead = (e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    if (!notification.isRead && !isPending) {
      markAsRead(notification.id);
    }
  };

  const handleBubbleClick = () => {
    handleMarkAsRead(); 
    if (onClick) {
      onClick(notification); 
    }
  };

  return (
    <div
      onClick={handleBubbleClick}
      className={`p-4 border-b border-shamelco-border transition-all duration-200 relative group cursor-pointer ${
        !notification.isRead
          ? "bg-shamelco-sky-soft hover:bg-shamelco-accent/10 dark:hover:bg-shamelco-sky-soft/40"
          : "bg-transparent hover:bg-shamelco-sand dark:hover:bg-shamelco-surface/60"
      }`}
    >
      <div className="flex gap-3 items-start">
        {/* مؤشر الحالة (Dot) */}
        <div className="mt-1.5 shrink-0">
          {!notification.isRead ? (
            <div className="w-2.5 h-2.5 bg-shamelco-gold rounded-full animate-pulse shadow-sm"></div>
          ) : (
            <div className="w-2.5 h-2.5 bg-shamelco-border rounded-full"></div>
          )}
        </div>

        {/* محتوى الإشعار */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm leading-snug ${
              !notification.isRead 
                ? "font-bold text-shamelco-darker" 
                : "font-medium text-shamelco-darker/80"
            }`}
          >
            {notification.title}
          </p>
          
          <p className="text-xs text-shamelco-muted mt-1 leading-relaxed line-clamp-2">
            {notification.message}
          </p>
          
          <span className="text-[10px] text-shamelco-muted/80 mt-2 block font-medium">
            {formatDate(notification.createdAt)}
          </span>
        </div>

        {/* زر التحديد كمقروء */}
        {!notification.isRead && (
          <button
            onClick={handleMarkAsRead}
            disabled={isPending}
            type="button"
            className="shrink-0 p-1.5 rounded-md text-shamelco-muted hover:text-shamelco-gold hover:bg-shamelco-gold-soft transition-all duration-150 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 disabled:opacity-50 cursor-pointer"
            title="تحديد كمقروء"
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}