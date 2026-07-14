import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import type { NotificationDto } from "../../../BackEndIntegration/Types/Notification/Response";

interface NotificationDetailModalProps {
  notification: NotificationDto | null;
  onClose: () => void;
}

export default function NotificationDetailModal({ notification, onClose }: NotificationDetailModalProps) {
  useEffect(() => {
    if (notification) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [notification]);

  if (!notification) return null;

  const getTypeConfiguration = (type: string) => {
    const normalizedType = type?.toLowerCase();
    switch (normalizedType) {
      case "success":
        return {
          Icon: CheckCircle2,
          bgClass: "bg-status-success/15 text-status-success border-status-success/30",
          badgeClass: "bg-status-success text-white",
          label: "عملية ناجحة",
        };
      case "warning":
        return {
          Icon: AlertTriangle,
          bgClass: "bg-status-warning/15 text-status-warning border-status-warning/30",
          badgeClass: "bg-status-warning text-white",
          label: "تنبيه هام",
        };
      case "error":
      case "danger":
        return {
          Icon: XCircle,
          bgClass: "bg-status-danger/15 text-status-danger border-status-danger/30",
          badgeClass: "bg-status-danger text-white",
          label: "تنبيه خطأ",
        };
      default:
        return {
          Icon: Info,
          bgClass: "bg-shamelco-sky-soft text-shamelco-sky border-shamelco-sky/30",
          badgeClass: "bg-shamelco-accent text-white",
          label: "إشعار عام",
        };
    }
  };

  const typeConfig = getTypeConfiguration(notification.type);
  const DynamicIcon = typeConfig.Icon;

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-shamelco-surface rounded-2xl shadow-2xl border border-shamelco-border overflow-hidden z-10 max-h-[85vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* شريط علوي ملون حسب نوع الإشعار */}
        <div className={`h-2 w-full ${typeConfig.badgeClass.split(" ")[0]}`} />

        {/* الهيدر */}
        <div className="p-5 border-b border-shamelco-border flex items-center justify-between bg-shamelco-bg/50">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${typeConfig.bgClass}`}>
              <DynamicIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-shamelco-darker text-base sm:text-lg">
                تفاصيل الإشعار
              </h3>
              <p className="text-[11px] text-shamelco-muted font-bold">
                المعرف: {notification.id.toString().substring(0, 8)}...
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-shamelco-muted hover:bg-shamelco-sand dark:hover:bg-shamelco-dark/40 hover:text-shamelco-danger rounded-xl transition-all duration-200 cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* محتوى الإشعار */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar text-right" dir="rtl">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-black px-3 py-1 rounded-full border ${typeConfig.bgClass}`}>
              {typeConfig.label}
            </span>
            <span className={`text-xs font-black px-3 py-1 rounded-full border ${
              notification.isRead 
                ? "bg-shamelco-sand dark:bg-shamelco-bg text-shamelco-muted border-shamelco-border" 
                : "bg-status-danger/15 text-status-danger border-status-danger/30"
            }`}>
              {notification.isRead ? "تمت القراءة" : "غير مقروء"}
            </span>
          </div>

          <h4 className="text-lg font-black text-shamelco-darker leading-snug">
            {notification.title}
          </h4>

          {/* مربع الرسالة الداخلي */}
          <div className="bg-shamelco-bg dark:bg-shamelco-dark/20 p-5 rounded-2xl border border-shamelco-border min-h-[100px]">
            <p className="text-sm font-medium text-shamelco-darker leading-relaxed whitespace-pre-wrap select-text">
              {notification.message}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-shamelco-muted font-bold pt-3 border-t border-shamelco-border/60">
            <Calendar className="w-4 h-4 text-shamelco-gold shrink-0" />
            <span>تاريخ الاستلام:</span>
            <span className="text-shamelco-darker">{formatDate(notification.createdAt)}</span>
          </div>
        </div>

        {/* الفوتر */}
        <div className="p-4 bg-shamelco-bg border-t border-shamelco-border flex justify-end gap-2">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker dark:text-shamelco-dark rounded-xl text-xs font-black transition-all duration-200 shadow-md hover:shadow-gold cursor-pointer active:scale-95"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  ,
    document.body
  );
}