import { Trophy, Gamepad2, Calendar, Clock } from "lucide-react";
import type { BookingStatus } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import type { BookingDto } from "../../../../BackEndIntegration/Types/Bookings/Response";
import RescheduleBookingButton from "../../Bookings/RescheduleBookingButton";
import CancelBookingButton from "../../Bookings/CancelBookingButton";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string }> = {
  Pending: { label: "قيد الانتظار", color: "bg-status-warning/10 text-status-warning border-status-warning/20" },
  Confirmed: { label: "مؤكد", color: "bg-shamelco-accent/10 text-shamelco-accent border-shamelco-accent/20" },
  InProgress: { label: "جاري الآن", color: "bg-status-success/10 text-status-success border-status-success/20" },
  CheckedIn: { label: "تم الحضور", color: "bg-status-success/10 text-status-success border-status-success/20" },
  Completed: { label: "مكتمل", color: "bg-shamelco-dark/10 text-shamelco-dark border-shamelco-dark/20" },
  Cancelled: { label: "ملغي", color: "bg-status-danger/10 text-status-danger border-status-danger/20" },
  NoShow: { label: "لم يحضر", color: "bg-shamelco-darker/10 text-shamelco-darker border-shamelco-darker/20" },
};

interface BookingCardProps {
  item: BookingDto;
  type: "pitch" | "venue";
  isUpcoming?: boolean;
}

export default function BookingCard({ item, type, isUpcoming }: BookingCardProps) { 
  const statusData = STATUS_CONFIG[item.status as BookingStatus] || STATUS_CONFIG.Pending;
  
  // تعديل النوع ليقبل string أو Date
  const formatDate = (dateString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };
  
  const formatTime = (timeString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(timeString).toLocaleTimeString("ar-EG", options);
  };

  return (
    <div className="bg-white border border-shamelco-dark/10 rounded-2xl shadow-sm hover:shadow-md hover:border-shamelco-accent/30 transition-all duration-300 flex flex-col group overflow-hidden">
      
      {/* الجزء العلوي: تفاصيل الحجز */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            type === "pitch" 
              ? "bg-shamelco-accent/10 text-shamelco-accent" 
              : "bg-shamelco-darker/5 text-shamelco-darker"
          }`}>
            {type === "pitch" ? <Trophy className="w-6 h-6" /> : <Gamepad2 className="w-6 h-6" />}
          </div>
          
          <div>
            <h4 className="font-bold text-shamelco-darker">
              {type === "pitch" ? "حجز ملعب" : "حجز صالة ترفيهية"}
              {/* ضفنا اسم الجهة من الباك إند كمعلومة إضافية تحت العنوان */}
              {item.entityName && (
                <span className="mr-2 text-sm font-normal text-shamelco-dark/60">- {item.entityName}</span>
              )}
            </h4>
            
            <div className="text-sm text-shamelco-dark/70 mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-shamelco-dark/40" /> 
                {formatDate(item.bookingDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-shamelco-dark/40" /> 
                {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${statusData.color}`}>
            {statusData.label}
          </span>
        </div>
      </div>

      {/* الجزء السفلي: أزرار العمليات (يظهر فقط لو الحجز قادم) */}
      {isUpcoming && (
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-shamelco-bg/80 border-t border-shamelco-dark/5">
          <RescheduleBookingButton bookingId={item.bookingId} />
          
          {/* التأكد من إمكانية الإلغاء من خلال الباك إند */}
          {item.canCancel && (
             <CancelBookingButton bookingId={item.bookingId} />
          )}
        </div>
      )}
    </div>
  );
}