import { useState } from "react";
import { Trophy, Gamepad2 } from "lucide-react"; // استدعاء الأيقونات بدل الإيموجيز
import type { CustomerProfileDto } from "../../../../BackEndIntegration/Types/Customer/Response";
import BookingCard from "./BookingCard";
import type { TabType } from "../../../Hooks/Customer/useProfile";
import type { BookingDto } from "../../../../BackEndIntegration/Types/Bookings/Response";

export default function BookingsTab({ profileData, activeTab }: { profileData: CustomerProfileDto; activeTab: TabType }) {
  const [bookingStatus, setBookingStatus] = useState<"upcoming" | "completed">("upcoming");

  const getActiveBookings = () => {
    if (activeTab === "pitches") {
      return bookingStatus === "upcoming"
        ? profileData?.pitchFutureBookings
        : profileData?.pitchPreviousBookings;
    } else {
      return bookingStatus === "upcoming"
        ? profileData?.venueFutureBookings
        : profileData?.venuePreviousBookings;
    }
  };

  const activeBookings = getActiveBookings();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* حاوية التابات: خلفية شفافة من أغمق لون عشان تلم التابات جواها بشياكة */}
      <div className="flex bg-shamelco-dark/5 rounded-xl p-1 mb-5">
        <button
          onClick={() => setBookingStatus("upcoming")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            bookingStatus === "upcoming" 
              ? "bg-shamelco-darker text-shamelco-gold shadow-md" // التاب النشط
              : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" // التاب العادي
          }`}
        >
          حجوزات قادمة
        </button>
        <button
          onClick={() => setBookingStatus("completed")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            bookingStatus === "completed" 
              ? "bg-shamelco-darker text-shamelco-gold shadow-md" 
              : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5"
          }`}
        >
          سجل الحجوزات
        </button>
      </div>

      <div className="space-y-3">
        {activeBookings && activeBookings.length > 0 ? (
          activeBookings.map((item: BookingDto) => (
            <BookingCard key={item.bookingId.toString()} item={item} type={activeTab === "pitches" ? "pitch" : "venue"} />
          ))
        ) : (
          // حالة عدم وجود بيانات (Empty State)
          <div className="flex flex-col items-center justify-center text-center py-12 bg-white rounded-3xl border border-shamelco-dark/10 shadow-sm">
            <div className="text-shamelco-dark/20 mb-4">
              {activeTab === "pitches" ? (
                <Trophy className="w-16 h-16" strokeWidth={1.5} />
              ) : (
                <Gamepad2 className="w-16 h-16" strokeWidth={1.5} />
              )}
            </div>
            <p className="text-shamelco-dark/70 font-medium">
              لا توجد {bookingStatus === "upcoming" ? "حجوزات قادمة" : "حجوزات سابقة"} {activeTab === "pitches" ? "للملاعب" : "للصالات"} حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}