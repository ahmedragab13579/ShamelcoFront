import { Gamepad2 } from "lucide-react";
import type { TableStatus } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import type { TableStateDto } from "../../../BackEndIntegration/Types/Venues/Response";
import tableBackgroundImage from "../../Images/table.jpg";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

const getTableStyle = (status: TableStatus) => {
  switch (status.toLowerCase()) {
    case "occupied":
      return "bg-status-danger/5 border-status-danger/30 text-status-danger shadow-sm";
    case "reserved":
      return "bg-status-warning/5 border-status-warning/30 text-status-warning shadow-sm";
    case "available":
    default:
      // تم حل مشكلة bg-white لتتوافق مع الـ Dark Mode وتأخذ لون الـ Surface
      return "bg-shamelco-surface border-shamelco-border text-shamelco-darker hover:border-shamelco-gold/50 hover:shadow-md cursor-pointer";
  }
};

export default function VenueTableCard({ table }: { table: TableStateDto }) {
  const status = table.status || "Unavailable";
  const { t } = useLanguage();

  const getStatusBadge = (tableStatus: TableStatus) => {
    switch (tableStatus.toLowerCase()) {
      case "occupied":
        return <span className="bg-status-danger/15 text-status-danger text-[10px] font-black px-2.5 py-1 rounded-md border border-status-danger/20 shadow-2xs">{t('messages.STATUS_OCCUPIED')}</span>;
      case "reserved":
        return <span className="bg-status-warning/15 text-status-warning text-[10px] font-black px-2.5 py-1 rounded-md border border-status-warning/20 shadow-2xs">{t('messages.STATUS_RESERVED')}</span>;
      case "available":
        return <span className="bg-status-success/15 text-status-success text-[10px] font-black px-2.5 py-1 rounded-md border border-status-success/20 shadow-2xs">{t('messages.STATUS_AVAILABLE')}</span>;
      default:
        return <span className="bg-shamelco-border text-shamelco-muted text-[10px] font-black px-2.5 py-1 rounded-md border border-shamelco-border/50">{t('messages.STATUS_UNAVAILABLE')}</span>;
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between p-5 rounded-lg border transition-all duration-300 text-start h-40 overflow-hidden group/card ${getTableStyle(status)}`}
    >
      {/* 
        تظبيط صورة الخلفية: 
        تم فصلها في حاوية z-0 مع تقليل الشفافية لتناسب الفاتح والغامق
      */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={tableBackgroundImage}
          alt={`خلفية طاولة ${table.tableNumber}`}
          className="w-full h-full object-cover opacity-10 dark:opacity-5 mix-blend-luminosity group-hover/card:scale-105 transition-transform duration-500"
        />
        {/* طبقة تدرج لوني خفيفة لضمان قراءة النصوص اللي تحت */}
        <div className="absolute inset-0 bg-gradient-to-t from-current/5 to-transparent"></div>
      </div>

      {/* المحتوى الفعلي للكارت يأخذ z-10 ليكون فوق الصورة */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between w-full mb-2">
          <span className="text-2xl font-black">{table.tableNumber}</span>
          {getStatusBadge(status)}
        </div>

        {table.consoleId && (
          <div className="flex items-center gap-1.5 text-xs font-bold opacity-80 mb-auto">
            <Gamepad2 className="w-4 h-4 text-shamelco-gold" />
            <span>
              {table.consoleStatus === "Active" ? t('messages.ACTIVE') : 
               table.consoleStatus === "Maintenance" ? t('messages.PAUSED') : t('messages.STATUS_AVAILABLE')}
            </span>
          </div>
        )}

        <div className="w-full flex justify-between items-end mt-auto pt-3 border-t border-current/10">
          <span className="text-[11px] font-bold opacity-75">{t('messages.CURRENT_BILL')}</span>
          <div className="font-black text-lg">
            {status === "Occupied" ? (
              <>
                {table.currentInvoiceTotal} <span className="text-xs font-bold opacity-80">{t('messages.CURRENCY')}</span>
              </>
            ) : (
              <span className="text-sm opacity-50">---</span>
            )}
          </div>
        </div>
      </div>

      {/* نقطة التنبيه للطاولة المشغولة */}
      {status === "Occupied" && (
        <span className="absolute top-0 end-0 flex h-3 w-3 z-20 m-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-danger opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-status-danger border-2 border-shamelco-surface"></span>
        </span>
      )}
    </div>
  );
}