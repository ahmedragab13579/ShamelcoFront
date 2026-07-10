import { Gamepad2 } from "lucide-react";
import type { TableStatus } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import type { TableStateDto } from "../../../BackEndIntegration/Types/Venues/Response";
import tableBackgroundImage from "../../Images/scott-webb-4MvIEBVCmz4-unsplash.jpg";

const getStatusBadge = (status: TableStatus) => {
  switch (status.toLowerCase()) {
    case "occupied":
      return <span className="bg-status-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">مشغولة</span>;
    case "reserved":
      return <span className="bg-status-warning text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">محجوزة</span>;
    case "available":
      return <span className="bg-status-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">متاحة</span>;
    default:
      return <span className="bg-status-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">غير متاحة</span>;
  }
};

const getTableStyle = (status: TableStatus) => {
  switch (status.toLowerCase()) {
    case "occupied":
      return "bg-status-danger/5 border-status-danger/20 text-status-danger shadow-sm ring-1 ring-status-danger/20";
    case "reserved":
      return "bg-status-warning/5 border-status-warning/20 text-status-warning shadow-sm";
    case "available":
    default:
      return "bg-white border-shamelco-dark/10 text-shamelco-darker hover:border-shamelco-accent hover:shadow-md cursor-pointer";
  }
};

export default function VenueTableCard({ table }: { table: TableStateDto }) {
  const status = table.status || "Unavailable";

  return (
    <div
      className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 text-right h-36 overflow-hidden ${getTableStyle(status)}`}
    >
      <img
        src={tableBackgroundImage}
        alt={`خلفية طاولة ${table.tableNumber}`}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] mix-blend-luminosity pointer-events-none select-none"
      />

      <div className="flex items-start justify-between w-full mb-2 z-10">
        <span className="text-lg font-black">{table.tableNumber}</span>
        {getStatusBadge(status)}
      </div>

      {table.consoleId && (
        <div className="flex items-center gap-1.5 text-xs font-bold opacity-70 mb-auto z-10">
          <Gamepad2 className="w-4 h-4" />
          <span>
            {table.consoleStatus === "Active" ? "شغال" : 
             table.consoleStatus === "Maintenance" ? "متوقف مؤقتاً" : "متاح"}
          </span>
        </div>
      )}

      <div className="w-full flex justify-between items-end mt-2 pt-2 border-t border-current/10 z-10">
        <span className="text-[10px] font-bold opacity-70">الفاتورة الحالية</span>
        <div className="font-black text-lg">
          {status === "Occupied" ? (
            <>
              {table.currentInvoiceTotal} <span className="text-[10px] font-normal">ج.م</span>
            </>
          ) : (
            <span className="text-sm opacity-50">---</span>
          )}
        </div>
      </div>

      {status === "Occupied" && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-danger opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-status-danger"></span>
        </span>
      )}
    </div>
  );
}
