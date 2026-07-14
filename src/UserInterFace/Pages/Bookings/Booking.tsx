import { useParams, useSearchParams, Link } from "react-router-dom";
import { useGetPitch, useGetPitchAvailableSlots } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import { useGetVenue, useGetVenueAvailableSlots } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID, { type GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { BookingUI } from "../../Components/Bookings/BookingUI";
import { useState } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

const getLocalYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function PitchBookingContainer({ id }: { id: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: place, isLoading: isPlaceLoading } = useGetPitch(asGUID(id));
  const { data: slots, isLoading: isSlotsLoading } = useGetPitchAvailableSlots(asGUID(id), getLocalYYYYMMDD(selectedDate));
  const { t } = useLanguage();
  
  if (isPlaceLoading || isSlotsLoading) return <BookingSkeleton />;
  
  if (!place || !place.data) {
    return <BookingError message={t('messages.PITCH_NOT_AVAILABLE') || "الملعب غير متاح حالياً"} />;
  }

  return (
    <BookingUI 
      place={place.data} 
      pitchSlots={slots?.data?.timeSlots} 
      placeCategory="Pitch" 
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}

function VenueBookingContainer({ id, tId }: { id: string, tId: GUID }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: place, isLoading: isPlaceLoading } = useGetVenue(asGUID(id));
  const { data: slots, isLoading: isSlotsLoading } = useGetVenueAvailableSlots({VenueId: asGUID(id), Id: tId}, getLocalYYYYMMDD(selectedDate));
  const { t } = useLanguage();
  
  if (isPlaceLoading || isSlotsLoading) return <BookingSkeleton />;
  
  if (!place || !place.data) {
    return <BookingError message={t('messages.PLACE_NOT_AVAILABLE') || "المكان غير متاح حالياً"} />;
  }

  return (
    <BookingUI 
      place={place.data} 
      venueSlots={slots?.data?.timeSlots} 
      placeCategory="Venue" 
      targetTableId={slots?.data?.tableId} 
      selectedDate={selectedDate} 
      onDateChange={setSelectedDate} 
    />
  );
}

export default function BookingPage() {
  const { id, tId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { t } = useLanguage();

  if (!id) {
    return <BookingError message={t('messages.INVALID_PLACE_ID') || "معرف المكان غير صالح"} />;
  }

  if (type === "pitch") return <PitchBookingContainer id={id} />;
  if (type === "venue") return <VenueBookingContainer id={id} tId={asGUID(tId || "00000000-0000-0000-0000-000000000000")} />;

  return <BookingError message={t('messages.PLACE_TYPE_NOT_SUPPORTED') || "نوع المكان غير مدعوم"} />;
}

// Skeleton متوافق تماماً مع الـ Dark Mode بدون وميض أبيض
function BookingSkeleton() {
  return (
    <div className="w-full bg-shamelco-bg min-h-screen pb-28 pt-4 md:pt-8 animate-pulse transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col gap-3 mb-6">
          <div className="h-4 w-24 bg-shamelco-sand rounded-md" />
          <div className="h-7 w-40 bg-shamelco-sand rounded-md" />
        </div>
        
        <div className="bg-shamelco-surface p-5 rounded-lg border border-shamelco-border shadow-sm flex gap-4">
          <div className="w-24 h-24 rounded-md bg-shamelco-sand shrink-0" />
          <div className="flex-1 space-y-3 pt-1">
            <div className="h-5 w-1/3 bg-shamelco-sand rounded-md" />
            <div className="h-4 w-2/3 bg-shamelco-sand rounded-md" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-w-[84px] h-20 bg-shamelco-surface border border-shamelco-border/40 rounded-md shrink-0" />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-4 w-24 bg-shamelco-sand rounded-md" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-11 bg-shamelco-surface border border-shamelco-border/40 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingError({ message }: { message: string }) {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-shamelco-bg flex items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md bg-shamelco-surface border border-shamelco-border p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-status-danger/10 text-status-danger flex items-center justify-center border border-status-danger/20 shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-black text-shamelco-darker tracking-tight">{t('messages.CANNOT_PROCEED_BOOKING')}</h3>
          <p className="text-sm font-semibold text-shamelco-muted leading-relaxed">
            {message}
          </p>
        </div>
        
        <Link
          to="/home"
          className="w-full py-3.5 rounded-md bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker font-black text-sm transition-all shadow-gold flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer focus-visible:outline-shamelco-gold"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('messages.BACK_TO_HOME')}</span>
        </Link>
      </div>
    </div>
  );
}