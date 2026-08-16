import React from "react";
import { SharedInput } from "../../../../Components/Common/SharedInput";
import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import type { TableStateDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { Loader2, ChevronDown } from "lucide-react";
import { useVenueTableSettingsForm } from "../../../../Hooks/Venue/useTableDetails";

interface VenueTableSettingsFormProps {
  initialData: TableStateDto;
  VenueId: GUID;
}

export const VenueTableSettingsForm: React.FC<VenueTableSettingsFormProps> = ({ initialData, VenueId }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    isDirty,
    errors,
    isPending,
    t,
  } = useVenueTableSettingsForm(initialData, VenueId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto text-start mb-6 font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <h2 className="text-2xl sm:text-3xl font-black mb-6 text-shamelco-darker tracking-tight">
        {t('messages.TABLE_SETTINGS_TITLE')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SharedInput
          label={t('messages.TABLE_NUMBER')}
          type="number"
          error={errors.TableNumber?.message}
          {...register("TableNumber", { required: t('messages.TABLE_NUMBER_REQUIRED') })}
        />
        <SharedInput
          label={t('messages.TABLE_CAPACITY')}
          type="number"
          error={errors.Capacity?.message}
          {...register("Capacity", { required: t('messages.TABLE_CAPACITY_REQUIRED') })}
        />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-bold text-shamelco-darker mb-1.5">{t('messages.TABLE_STATUS')}</label>
        <div className="relative w-full">
          <select
            {...register("Status")}
            className="w-full px-4 py-3 rounded-md border border-shamelco-border bg-shamelco-surface text-start transition-all duration-200 outline-none text-shamelco-darker hover:border-shamelco-gold/50 focus:border-shamelco-gold focus:ring-2 focus:ring-shamelco-gold/20 appearance-none font-bold text-sm cursor-pointer shadow-sm"
          >
            <option value="Available" className="bg-shamelco-surface text-shamelco-darker py-1">{t('messages.STATUS_AVAILABLE')}</option>
            <option value="Occupied" className="bg-shamelco-surface text-shamelco-darker py-1">{t('messages.STATUS_OCCUPIED')}</option>
            <option value="Reserved" className="bg-shamelco-surface text-shamelco-darker py-1">{t('messages.STATUS_RESERVED')}</option>
            <option value="Maintenance" className="bg-shamelco-surface text-shamelco-darker py-1">{t('messages.MAINTENANCE')}</option>
            <option value="Unavailable" className="bg-shamelco-surface text-shamelco-darker py-1">{t('messages.OUT_OF_SERVICE')}</option>
          </select>
          <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none text-shamelco-muted">
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-shamelco-border flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-8 py-3.5 rounded-md font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] focus-visible:outline-shamelco-gold shrink-0 min-w-[160px]
             ${!isDirty || isPending
              ? "bg-shamelco-border text-shamelco-muted cursor-not-allowed opacity-70 shadow-none"
              : "bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker shadow-gold"
            }`}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-current shrink-0" aria-hidden="true" />
              <span>{t('messages.SAVING')}</span>
            </>
          ) : (
            <span>{t('messages.SAVE_CHANGES')}</span>
          )}
        </button>
      </div>
    </form>
  );
};
