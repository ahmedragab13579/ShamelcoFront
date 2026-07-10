import { useParams, useSearchParams } from "react-router-dom";
import { useGetPitch, useGetPitchAvailableSlots } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import { useGetVenue, useGetVenueAvailableSlots } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID, { type GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import { BookingUI } from "../../Components/Bookings/BookingUI";
import { useState } from "react";

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
  
  if (isPlaceLoading || isSlotsLoading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (!place) return <div className="p-8 text-center text-status-danger">الملعب غير موجود</div>;

  return <BookingUI place={place.data} pitchSlots={slots?.data?.timeSlots} placeCategory="Pitch" selectedDate={selectedDate}
      onDateChange={setSelectedDate}/> ;
}

function VenueBookingContainer({ id, tId }: { id: string, tId: GUID }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: place, isLoading: isPlaceLoading } = useGetVenue(asGUID(id));
  const { data: slots, isLoading: isSlotsLoading } = useGetVenueAvailableSlots({VenueId:asGUID(id),Id:tId}, getLocalYYYYMMDD(selectedDate));
  
  if (isPlaceLoading || isSlotsLoading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (!place) return <div className="p-8 text-center text-status-danger">المكان غير موجود</div>;


  return (
    <BookingUI 
      place={place.data} 
      venueSlots={slots?.data.timeSlots} 
      placeCategory="Venue" 
      targetTableId={slots?.data?.tableId} 
      selectedDate={selectedDate} 
      onDateChange={setSelectedDate} 
    />
  );
}

export default function BookingPage() {
  const { id } = useParams();
  const { tId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (!id) return <div className="p-8 text-center">معرف المكان غير صالح</div>;

  if (type === "pitch") return <PitchBookingContainer id={id} />;
  if (type === "venue") return <VenueBookingContainer id={id} tId={asGUID(tId||"00000000-0000-0000-0000-000000000000")} />;

  return <div className="p-8 text-center">نوع المكان غير مدعوم</div>;
}