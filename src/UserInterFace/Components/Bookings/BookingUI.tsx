import { useBookingLogic } from "../../Hooks/Booking/useBookingLogic";
import { BookingHeader } from "../../Components/Bookings/BookingHeader";
import { PlaceSummary } from "../../Components/Bookings/PlaceSummary";
import { TimeSlotSelector } from "../../Components/Bookings/TimeSlotSelector";
import { BookingFooter } from "../../Components/Bookings/BookingFooter";
import type {  TimeSlotDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import type { PaymentMethod } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePitchBookingMutation, useCreateVenueBookingMutation } from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";
import { useInitiatePaymentMutation } from "../../../BackEndIntegration/Hooks/Mutations/usePaymentMutations";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";

interface BookingUIProps {
  place: any;
  placeCategory: "Pitch" | "Venue";
  pitchSlots?: TimeSlotDto[];
  venueSlots?: TimeSlotDto[];
  targetTableId?: GUID; 
  selectedDate: Date; 
  onDateChange: (date: Date) => void;
}

export function BookingUI({ place, placeCategory, pitchSlots, venueSlots, targetTableId ,selectedDate, onDateChange}: BookingUIProps) {
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
  const nav = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [walletNumber, setWalletNumber] = useState<string>();
  const { mutateAsync: createPitchBooking, isPending: isPitchBooking } = useCreatePitchBookingMutation();
  const { mutateAsync: createVenueBooking, isPending: isVenueBooking  } = useCreateVenueBookingMutation();
  const { mutateAsync: initiatePayment, isPending: isPaying} = useInitiatePaymentMutation();

 const handleBookingSubmit = async () => {
    if (!selectedSlot) return;

    try {
      const startTime = new Date(selectedSlot);
      const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
      
      let bookingId: GUID = asGUID("00000000-0000-0000-0000-000000000000");

      if (placeCategory === "Pitch") {
        const result = await createPitchBooking({
          targetId: place.id,
          startTime,
          endTime,
          totalAmount:finalTotal
        });
        if(result.data && result.data.bookingId) 
             bookingId = result.data.bookingId; 
      } else {
        if (placeCategory === "Venue" && !targetTableId) {
            console.error("Missing table ID for venue booking");
            return; 
         }
        const result = await createVenueBooking({
          targetId: place.id,
          targetTableId:  targetTableId||asGUID("00000000-0000-0000-0000-000000000000"), 
          startTime,
          endTime,
          totalAmount:finalTotal
        });
        if(result.data && result.data.bookingId) 
            bookingId = result.data.bookingId;
      }
     
      const paymentResult = await initiatePayment({
        BookingId: bookingId,
        PaymentMethod: paymentMethod, 
        WalletMobileNumber: walletNumber
      });

      if (paymentResult && !paymentResult.data) { 
          throw new Error("Payment Gateway Failed"); 
      }

      // التحقق من وجود رابط دفع
      if (paymentResult?.data?.Link) { 
        nav("/success", {
          state: {
            title: "تم تسجيل الحجز المبدئي! ⏳",
            message: "تم حفظ حجزك بنجاح. يرجى إتمام عملية الدفع لتأكيد الحجز بشكل نهائي.",
            redirectUrl: paymentResult.data.Link, 
            buttonText: "الانتقال لصفحة الدفع 💳"
          }
        });
      } else {
        // الدفع كاش أو لا يوجد رابط دفع
        nav("/success", {
          state: {
            title: "تم تأكيد الحجز! 🎉",
            message: "تم تأكيد حجزك بنجاح، بانتظارك في الموعد المحدد.",
            redirectUrl: "/home",
            buttonText: "العودة للرئيسية 🏠"
          }
        });
      }

    } catch (error) {
      // 🟢 دلوقتي أي فشل في الدفع هيترمي هنا ويشغل الرسالة دي
      console.error("فشل في إتمام العملية:", error);
      nav("/success", {
        state: {
          title: "تم تسجيل الحجز المبدئي! ⏳",
          message: "لقد تم تسجيل حجزك. يرجى العلم أنه تم رفض الدفع الأونلاين، الرجاء الدفع عند الحضور.",
          redirectUrl: "/home",
          buttonText: "الانتقال للصفحة الرئيسية 🏠"
        }
      });    
    }
  };
  const isSubmitting = isPitchBooking || isVenueBooking || isPaying;

  const formatDateLabel = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "اليوم";
    if (date.toDateString() === tomorrow.toDateString()) return "غداً";
    return date.toLocaleDateString("ar-EG", { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-28 pt-4 md:pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <BookingHeader />
        
        <PlaceSummary place={place} placeCategory={placeCategory} />

        {/* Date Selector */}
        <div className="mb-6">
          <h3 className="font-bold text-shamelco-darker mb-3 text-sm">تاريخ الحجز</h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {availableDates.map((date, idx) => {
              const isSelected = selectedDate.toDateString() === date.toDateString();
              return (
                <button
                  key={idx}
                  onClick={() => handleDateChange(date)}
                  className={`min-w-[80px] p-3 rounded-xl border flex flex-col items-center justify-center transition-colors ${
                    isSelected ? "bg-status-success/10 border-status-success text-status-success shadow-sm" : "bg-white border-shamelco-dark/10 text-shamelco-dark/70 hover:border-status-success/50"
                  }`}
                >
                  <span className="text-xs mb-1 opacity-80">{date.toLocaleDateString("ar-EG", { weekday: 'short' })}</span>
                  <span className="font-black text-lg">{date.getDate()}</span>
                  <span className="text-[10px] font-bold mt-1 bg-white/50 px-2 py-0.5 rounded-full">
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