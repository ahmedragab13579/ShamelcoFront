import { useState } from "react";
import type { CustomerProfileDto } from "../../../../BackEndIntegration/Types/Customer/Response";
import BookingCard from "./BookingCard";
import type { TabType } from "../../../Hooks/Customer/useProfile";
import type { BookingDto } from "../../../../BackEndIntegration/Types/Bookings/Response";
import emptyStateIllust from "../../../Images/emptystateUI.png";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function BookingsTab({ profileData, activeTab }: { profileData: CustomerProfileDto; activeTab: TabType }) {
  const [bookingStatus, setBookingStatus] = useState<"upcoming" | "completed">("upcoming");
  const { t } = useLanguage();

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
      <div className="flex bg-shamelco-dark/5 rounded-xl p-1 mb-5">
        <button
          onClick={() => setBookingStatus("upcoming")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            bookingStatus === "upcoming" 
              ? "bg-shamelco-darker text-shamelco-gold shadow-md" // التاب النشط
              : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5" // التاب العادي
          }`}
        >
          {t('messages.UPCOMING_BOOKINGS')}
        </button>
        <button
          onClick={() => setBookingStatus("completed")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            bookingStatus === "completed" 
              ? "bg-shamelco-darker text-shamelco-gold shadow-md" 
              : "text-shamelco-accent hover:text-shamelco-darker hover:bg-shamelco-dark/5"
          }`}
        >
          {t('messages.BOOKING_HISTORY')}
        </button>
      </div>

      <div className="space-y-3">
        {activeBookings && activeBookings.length > 0 ? (
          activeBookings.map((item: BookingDto) => (
            <BookingCard key={item.bookingId.toString()} item={item} type={activeTab === "pitches" ? "pitch" : "venue"} />
          ))
        ) : (
          // حالة عدم وجود بيانات (Empty State)
          <div className="flex flex-col items-center justify-center text-center py-12 bg-shamelco-surface rounded-3xl border border-shamelco-dark/10 shadow-sm px-4">
            <div className="w-24 h-24 mb-4 opacity-85">
              <img src={emptyStateIllust} alt={t('messages.NO_BOOKINGS')} className="w-full h-full object-contain" />
            </div>
            <p className="text-shamelco-dark/70 font-medium">
              {activeTab === "pitches"
                ? (bookingStatus === "upcoming" ? t('messages.NO_UPCOMING_BOOKINGS_PITCHES') : t('messages.NO_PREVIOUS_BOOKINGS_PITCHES'))
                : (bookingStatus === "upcoming" ? t('messages.NO_UPCOMING_BOOKINGS_VENUES') : t('messages.NO_PREVIOUS_BOOKINGS_VENUES'))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}