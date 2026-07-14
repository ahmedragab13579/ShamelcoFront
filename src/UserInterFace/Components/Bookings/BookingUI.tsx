import { useBookingLogic } from "../../Hooks/Booking/useBookingLogic";
import { useBookingSubmission } from "../../Hooks/Booking/useBookingSubmission"; 
import { BookingHeader } from "../../Components/Bookings/BookingHeader";
import { PlaceSummary } from "../../Components/Bookings/PlaceSummary";
import { TimeSlotSelector } from "../../Components/Bookings/TimeSlotSelector";
import { BookingFooter } from "../../Components/Bookings/BookingFooter";
import type { TimeSlotDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface BookingUIProps {
  place: any;
  placeCategory: "Pitch" | "Venue";
  pitchSlots?: TimeSlotDto[];
  venueSlots?: TimeSlotDto[];
  targetTableId?: GUID; 
  selectedDate: Date; 
  onDateChange: (date: Date) => void;
}

export function BookingUI({ 
  place, 
  placeCategory, 
  pitchSlots, 
  venueSlots, 
  targetTableId, 
  selectedDate, 
  onDateChange 
}: BookingUIProps) {
  const { t, currentLang } = useLanguage();
  
  const {
    handleDateChange,
    selectedSlot, setSelectedSlot,
    durationHours, setDurationHours,
    availableDates, currentAvailableSlots, finalTotal
  } = useBookingLogic({
    tableId: targetTableId,
    placeCategory,
    pricePerHour: place?.hourlyRate,
    pitchSlots,
    venueSlots,
    selectedDate, 
    setSelectedDate: onDateChange
  });

  const {
    paymentMethod, setPaymentMethod,
    walletNumber, setWalletNumber,
    isSubmitting, handleBookingSubmit
  } = useBookingSubmission({
    place,
    placeCategory,
    targetTableId,
    selectedSlot,
    durationHours,
    finalTotal
  });

  const formatDateLabel = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return t('messages.TODAY') || "اليوم";
    if (date.toDateString() === tomorrow.toDateString()) return t('messages.TOMORROW') || "غداً";
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-28 pt-4 md:pt-8 font-sans text-start transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        
        <BookingHeader />
        
        <PlaceSummary place={place} placeCategory={placeCategory} />

        {/* Date Selector - مجهز بالكامل للـ Dark Mode ومتفق مع قاعدة الـ 10% */}
        <div className="space-y-3">
          <h3 className="font-bold text-shamelco-darker text-sm sm:text-base">{t('messages.BOOKING_DATE')}</h3>
          
          <div className="flex gap-2.5 overflow-x-auto pb-2 custom-scrollbar snap-x">
            {availableDates.map((date, idx) => {
              const isSelected = selectedDate.toDateString() === date.toDateString();
              
              return (
                <button
                  key={idx}
                  onClick={() => handleDateChange(date)}
                  className={`min-w-[84px] p-3 rounded-md border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-shamelco-gold shrink-0 snap-start ${
                    isSelected 
                      ? "bg-shamelco-gold-soft border-shamelco-gold text-shamelco-darker shadow-sm" 
                      : "bg-shamelco-surface border-shamelco-border text-shamelco-muted hover:border-shamelco-gold/50 hover:bg-shamelco-sand/40"
                  }`}
                >
                  <span className={`text-xs font-bold mb-1 ${isSelected ? "text-shamelco-darker" : "text-shamelco-muted"}`}>
                    {date.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' })}
                  </span>
                  
                  <span className={`font-black text-xl leading-none ${isSelected ? "text-shamelco-gold dark:text-shamelco-gold-hover" : "text-shamelco-darker"}`}>
                    {date.getDate()}
                  </span>
                  
                  <span className={`text-[10px] font-bold mt-2 px-2 py-0.5 rounded-full transition-colors ${
                    isSelected 
                      ? "bg-shamelco-gold text-shamelco-darker font-black" 
                      : "bg-shamelco-bg text-shamelco-muted border border-shamelco-border/60"
                  }`}>
                    {formatDateLabel(date)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        <TimeSlotSelector 
          slots={currentAvailableSlots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
          durationHours={durationHours}
          onDurationChange={setDurationHours}
        />

      </div>

      <BookingFooter 
        paymentMethod={paymentMethod}
        walletNumber={walletNumber}
        setWalletNumber={setWalletNumber}
        setPaymentMethod={setPaymentMethod}
        finalTotal={finalTotal} 
        isSubmitDisabled={!selectedSlot || isSubmitting}
        onSubmit={handleBookingSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}