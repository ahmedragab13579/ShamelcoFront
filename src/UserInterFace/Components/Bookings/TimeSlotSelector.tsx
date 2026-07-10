import { Clock, Timer, Plus, Minus, AlertCircle } from "lucide-react";
import type { TimeSlotDto } from "../../../BackEndIntegration/Types/Pitch/Response";

export const TimeSlotSelector = ({ 
  slots, selectedSlot, onSelect, durationHours, onDurationChange 
}: { 
  slots: TimeSlotDto[], selectedSlot: string | null, onSelect: (slot: string) => void, 
  durationHours: number, onDurationChange: (val: number) => void 
}) => (
  <div className="bg-white p-4 rounded-2xl border border-shamelco-dark/10 shadow-sm mb-6">
    <h3 className="flex items-center gap-2 font-bold text-shamelco-darker mb-3 text-sm">
      <Clock className="w-4 h-4 text-shamelco-accent" />
      ميعاد البداية المتاح
    </h3>
    
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
      {slots?.map((slotObj: TimeSlotDto, index: number) => {
        const slotDisplay = typeof slotObj === 'string' ? slotObj : new Date(slotObj.startTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        const isAvailable = typeof slotObj === 'string' ? true : slotObj.isAvailable;
        const slotKey = typeof slotObj === 'string' ? slotObj : slotObj.startTime.toString();

        return (
          <button
            key={index}
            disabled={!isAvailable}
            onClick={() => onSelect(slotKey)}
            className={`py-2 text-sm font-bold rounded-xl border transition-all duration-300 ${
              !isAvailable 
                ? "bg-shamelco-dark/5 text-shamelco-dark/40 border-transparent cursor-not-allowed opacity-60" // غير متاح: باهت جداً ومقري من الثيم
                : selectedSlot === slotKey
                  ? "bg-shamelco-darker text-shamelco-gold border-shamelco-darker shadow-md scale-95" // المختار: كحلي غامق مع دهبي
                  : "bg-shamelco-bg border-shamelco-dark/10 text-shamelco-dark hover:border-shamelco-accent hover:text-shamelco-accent" // المتاح: لون فاتح مع بوردر خفيف
            }`}
          >
            {slotDisplay}
          </button>
        );
      })}
      
      {/* حالة الـ Empty State لو مفيش مواعيد */}
      {(!slots || slots.length === 0) && (
        <div className="col-span-full flex flex-col items-center justify-center gap-2 text-shamelco-dark/60 text-sm py-6 bg-shamelco-bg/50 rounded-xl border border-dashed border-shamelco-dark/10">
          <AlertCircle className="w-6 h-6 text-shamelco-dark/30" />
          <p>برجاء اختيار الطاولة/اليوم لرؤية المواعيد المتاحة.</p>
        </div>
      )}
    </div>

    {/* قسم تعديل المدة */}
    <div className="border-t border-shamelco-dark/10 pt-4 flex items-center justify-between">
      <span className="flex items-center gap-2 font-bold text-shamelco-dark text-sm">
        <Timer className="w-4 h-4 text-shamelco-accent" />
        مدة الحجز (بالساعات)
      </span>
      
      <div className="flex items-center gap-4 bg-shamelco-bg border border-shamelco-dark/10 rounded-xl p-1">
        <button 
          onClick={() => onDurationChange(Math.max(1, durationHours - 1))} 
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-shamelco-darker hover:bg-shamelco-darker hover:text-shamelco-gold transition-colors active:scale-90"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="font-black text-shamelco-darker w-4 text-center">
          {durationHours}
        </span>
        
        <button 
          onClick={() => onDurationChange(Math.min(6, durationHours + 1))} 
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-shamelco-darker hover:bg-shamelco-darker hover:text-shamelco-gold transition-colors active:scale-90"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);