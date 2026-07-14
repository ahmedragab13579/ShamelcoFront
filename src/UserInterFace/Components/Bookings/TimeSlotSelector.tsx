import { Clock, Timer, Plus, Minus, AlertCircle } from "lucide-react";
import type { TimeSlotDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export const TimeSlotSelector = ({ 
  slots, selectedSlot, onSelect, durationHours, onDurationChange 
}: { 
  slots: TimeSlotDto[], selectedSlot: string | null, onSelect: (slot: string) => void, 
  durationHours: number, onDurationChange: (val: number) => void 
}) => {
  const { t, currentLang } = useLanguage();

  return (
    <div className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm mb-6 transition-colors duration-200">
      <h3 className="flex items-center gap-2 font-black text-shamelco-darker mb-4 text-sm uppercase tracking-wider">
        <Clock className="w-4 h-4 text-shamelco-gold" />
        {t('messages.AVAILABLE_START_TIME')}
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
        {slots?.map((slotObj: TimeSlotDto, index: number) => {
          const slotDisplay = typeof slotObj === 'string' 
            ? slotObj 
            : new Date(slotObj.startTime).toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
          
          const isAvailable = typeof slotObj === 'string' ? true : slotObj.isAvailable;
          const slotKey = typeof slotObj === 'string' ? slotObj : slotObj.startTime.toString();

          return (
            <button
              key={index}
              disabled={!isAvailable}
              onClick={() => onSelect(slotKey)}
              className={`py-2.5 text-sm font-bold rounded-md border transition-all duration-200 focus-visible:outline-shamelco-gold ${
                !isAvailable 
                  ? "bg-shamelco-bg text-shamelco-muted border-shamelco-border/50 cursor-not-allowed opacity-50"
                  : selectedSlot === slotKey
                    ? "bg-shamelco-gold text-shamelco-darker border-shamelco-gold shadow-gold scale-[0.98]"
                    : "bg-shamelco-bg border-shamelco-border text-shamelco-darker hover:border-shamelco-gold/50 hover:bg-shamelco-sand/40"
              }`}
            >
              {slotDisplay}
            </button>
          );
        })}
        
        {(!slots || slots.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center gap-2 text-shamelco-muted text-sm py-8 bg-shamelco-bg/50 rounded-md border border-dashed border-shamelco-border">
            <AlertCircle className="w-6 h-6 text-shamelco-muted" />
            <p className="font-semibold">{t('messages.SELECT_TABLE_DAY_PROMPT')}</p>
          </div>
        )}
      </div>
      
      {/* قسم تعديل المدة */}
      <div className="border-t border-shamelco-border pt-5 flex items-center justify-between">
        <span className="flex items-center gap-2 font-bold text-shamelco-darker text-sm">
          <Timer className="w-4 h-4 text-shamelco-gold" />
          {t('messages.BOOKING_DURATION_HOURS')}
        </span>
        
        <div className="flex items-center gap-4 bg-shamelco-bg border border-shamelco-border rounded-md p-1">
          <button 
            onClick={() => onDurationChange(Math.max(1, durationHours - 1))} 
            className="w-8 h-8 flex items-center justify-center bg-shamelco-surface rounded-sm shadow-sm text-shamelco-darker hover:text-shamelco-gold transition-colors active:scale-90 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="font-black text-shamelco-darker w-6 text-center text-sm">
            {durationHours}
          </span>
          
          <button 
            onClick={() => onDurationChange(Math.min(5, durationHours + 1))} 
            className="w-8 h-8 flex items-center justify-center bg-shamelco-surface rounded-sm shadow-sm text-shamelco-darker hover:text-shamelco-gold transition-colors active:scale-90 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};