import { CheckCircle2 } from "lucide-react";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";
import { useMarkAsReadNotificationMutation } from "../../../BackEndIntegration/Hooks/Mutations/useNotificationMutations";

interface NotificationBubbleProps {
  notification: NotificationDto;
  onClick?: () => void;
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
      onClick(); 
    }
  };

  return (
    <div
      onClick={handleBubbleClick}
      className={`p-4 border-b border-shamelco-dark/5 transition-all relative group cursor-pointer ${
        !notification.isRead
          ? "bg-shamelco-accent/5 hover:bg-shamelco-accent/10"
          : "hover:bg-shamelco-dark/5"
      }`}
    >
      <div className="flex gap-3">
        <div className="mt-1">
          {!notification.isRead ? (
            <div className="w-2.5 h-2.5 bg-shamelco-accent rounded-full animate-pulse"></div>
          ) : (
            <div className="w-2.5 h-2.5 bg-shamelco-dark/20 rounded-full"></div>
          )}
        </div>

        <div className="flex-1">
          <p
            className={`text-sm ${
              !notification.isRead ? "font-bold text-shamelco-darker" : "font-medium text-shamelco-dark"
            }`}
          >
            {notification.title}
          </p>
          <p className="text-xs text-shamelco-dark/70 mt-1 leading-relaxed">
            {notification.message}
          </p>
          <span className="text-[10px] text-shamelco-dark/50 mt-2 block font-medium">
            {formatDate(notification.createdAt)}
          </span>
        </div>

        {!notification.isRead && (
          <button
            onClick={handleMarkAsRead}
            disabled={isPending}
            className="text-shamelco-dark/40 hover:text-shamelco-accent p-1 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 h-fit"
            title="تحديد كمقروء"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}