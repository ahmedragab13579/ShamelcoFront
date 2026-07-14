import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PaymentMethod } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import { 
  useCreatePitchBookingMutation, 
  useCreateVenueBookingMutation 
} from "../../../BackEndIntegration/Hooks/Mutations/useBookingMutations";
import { useInitiatePaymentMutation } from "../../../BackEndIntegration/Hooks/Mutations/usePaymentMutations";

interface UseBookingSubmissionProps {
  place: any;
  placeCategory: "Pitch" | "Venue";
  targetTableId?: GUID;
  selectedSlot: string | null;
  durationHours: number;
  finalTotal: number;
}

export function useBookingSubmission({
  place,
  placeCategory,
  targetTableId,
  selectedSlot,
  durationHours,
  finalTotal
}: UseBookingSubmissionProps) {
  const nav = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [walletNumber, setWalletNumber] = useState<string>();

  const { mutateAsync: createPitchBooking, isPending: isPitchBooking } = useCreatePitchBookingMutation();
  const { mutateAsync: createVenueBooking, isPending: isVenueBooking } = useCreateVenueBookingMutation();
  const { mutateAsync: initiatePayment, isPending: isPaying } = useInitiatePaymentMutation();

  const isSubmitting = isPitchBooking || isVenueBooking || isPaying;

  const handleBookingSubmit = async () => {
    if (!selectedSlot) return;

    const startTime = new Date(selectedSlot);
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
    let bookingId: GUID = asGUID("00000000-0000-0000-0000-000000000000");

    // ==========================================
    // المرحلة الأولى: إنشاء الحجز (Booking Step)
    // ==========================================
    try {
      if (placeCategory === "Pitch") {
        const result = await createPitchBooking({
          targetId: place.id,
          startTime,
          endTime,
          totalAmount: finalTotal
        });
        if (result.data?.bookingId) bookingId = result.data.bookingId;
      } else {
        if (!targetTableId) {
          throw new Error("Missing table ID for venue booking");
        }
        const result = await createVenueBooking({
          targetId: place.id,
          targetTableId: targetTableId || asGUID("00000000-0000-0000-0000-000000000000"),
          startTime,
          endTime,
          totalAmount: finalTotal
        });
        if (result.data?.bookingId) bookingId = result.data.bookingId;
      }

      // التحقق من أن الحجز تم فعلياً وأصدر ID صحيح
      if (bookingId === asGUID("00000000-0000-0000-0000-000000000000")) {
        throw new Error("Booking failed to generate a valid ID");
      }

    } catch (bookingError) {
      console.error("فشل في إنشاء الحجز:", bookingError);
      // حالة: فشل الحجز (أو فشل الحجز والدفع معاً) -> التوجيه لصفحة الـ Error
      nav("/error", {
        state: {
          title: "عفواً، حدث خطأ في الحجز! ❌",
          message: "لم نتمكن من تسجيل حجزك في الوقت الحالي. برجاء المحاولة مرة أخرى لاحقاً.",
          buttonText: "العودة للرئيسية 🏠",
          redirectUrl: "/home"
        }
      });
      return; // إيقاف التنفيذ حتى لا ينتقل لمرحلة الدفع
    }

    // ==========================================
    // المرحلة الثانية: إتمام الدفع (Payment Step)
    // ==========================================
    try {
      const paymentResult = await initiatePayment({
        BookingId: bookingId,
        PaymentMethod: paymentMethod,
        WalletMobileNumber: walletNumber
      });

      if (!paymentResult || !paymentResult.data) {
        throw new Error("Payment Gateway Failed");
      }

      // حالة: نجاح الحجز + نجاح الدفع (أونلاين)
      if (paymentResult.data.Link) {
        nav("/success", {
          state: {
            title: "تم تسجيل الحجز المبدئي! ⏳",
            message: "تم حفظ حجزك بنجاح. يرجى إتمام عملية الدفع لتأكيد الحجز بشكل نهائي.",
            redirectUrl: paymentResult.data.Link,
            buttonText: "الانتقال لصفحة الدفع 💳"
          }
        });
      } else {
        // حالة: نجاح الحجز + نجاح الدفع (كاش)
        nav("/success", {
          state: {
            title: "تم تأكيد الحجز! 🎉",
            message: "تم تأكيد حجزك بنجاح، بانتظارك في الموعد المحدد.",
            redirectUrl: "/home",
            buttonText: "العودة للرئيسية 🏠"
          }
        });
      }

    } catch (paymentError) {
      console.error("فشل في إتمام الدفع:", paymentError);
      // حالة: نجاح الحجز + فشل الدفع -> التوجيه لصفحة الـ Success مع تنبيه الدفع كاش
      nav("/success", {
        state: {
          title: "تم تسجيل الحجز المبدئي! ⏳",
          message: "لقد تم تسجيل حجزك بنجاح، ولكن تعذر إتمام الدفع الأونلاين. الرجاء الدفع عند الحضور في المقر.",
          redirectUrl: "/home",
          buttonText: "الانتقال للصفحة الرئيسية 🏠"
        }
      });
    }
  };

  return {
    paymentMethod,
    setPaymentMethod,
    walletNumber,
    setWalletNumber,
    isSubmitting,
    handleBookingSubmit
  };
}