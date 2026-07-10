import { useState } from "react";
import type { TimeSlotDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
interface UseBookingProps {
  placeCategory: "Pitch" | "Venue";
  tableId?: GUID;
  pricePerHour?: number;
  venueSlots?: TimeSlotDto[];
  pitchSlots?: TimeSlotDto[]; 
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function useBookingLogic({ 
  tableId,
  placeCategory, 
  pricePerHour = 0, 
  venueSlots = [], 
  pitchSlots = [] ,
  selectedDate, 
  setSelectedDate
}: UseBookingProps) {
  
  const [selectedTableId, setSelectedTableId] = useState<GUID|null>(tableId||asGUID("00000000-0000-0000-0000-000000000000"));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [durationHours, setDurationHours] = useState<number>(1);

  const daysToShow = placeCategory === "Pitch" ? 7 : 2;
  const availableDates = Array.from({ length: daysToShow }).map((_, i) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + i);
    return nextDate;
  });

  let currentAvailableSlots:TimeSlotDto[] = [];
  if (placeCategory === "Pitch") {
    currentAvailableSlots = pitchSlots;
  } else if (placeCategory === "Venue" && selectedTableId) {
    currentAvailableSlots = venueSlots || [];
  }

  const finalTotal = pricePerHour * durationHours;

  // 5. دوال التحكم
  const resetSelection = () => {
    setSelectedSlot(null);
    setSelectedTableId(tableId || asGUID("00000000-0000-0000-0000-000000000000")); 
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date); 
    resetSelection();
  };

  return {
    selectedDate,
    handleDateChange,
    selectedTableId,
    setSelectedTableId,
    selectedSlot,
    setSelectedSlot,
    durationHours,
    setDurationHours,
    availableDates,
    currentAvailableSlots,
    finalTotal
  };
}