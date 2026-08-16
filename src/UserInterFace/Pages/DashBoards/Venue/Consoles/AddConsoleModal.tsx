import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import { Loader2, Gamepad2 } from "lucide-react";
import { useAddConsoleModal } from "../../../../Hooks/Venue/useManageConsoles";

export const AddConsoleModal = ({ venueId, onClose }: { venueId: GUID; onClose: () => void }) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    isError,
    isPending,
    errorMessage,
    t,
  } = useAddConsoleModal(venueId, onClose);

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-shamelco-darker/60 flex items-center justify-center z-50 p-4 transition-opacity duration-200">
      <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200 text-start">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-shamelco-border">
          <Gamepad2 className="w-6 h-6 text-shamelco-gold shrink-0" />
          <h2 className="text-xl font-black text-shamelco-darker tracking-tight">{t('messages.ADD_NEW_GAMING_CONSOLE')}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.CONSOLE_NAME')}</label>
            <input
              required
              type="text"
              placeholder="مثال: PS5 Pro"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold shadow-sm transition-all duration-200"
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.SERIAL_NUMBER_LABEL')}</label>
            <input
              required
              type="text"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold text-left font-mono shadow-sm transition-all duration-200"
              dir="ltr"
              value={formData.SerialNumber}
              onChange={(e) => setFormData({ ...formData, SerialNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.HOURLY_RATE_LABEL')}</label>
            <input
              required
              type="number"
              min="0"
              step="0.5"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold shadow-sm transition-all duration-200"
              value={formData.HourlyRate}
              onChange={(e) => setFormData({ ...formData, HourlyRate: Number(e.target.value) })}
            />
          </div>

          {isError && typeof errorMessage === 'string' && (
            <div className="text-status-danger bg-status-danger/10 p-3 rounded-md text-xs mt-2 font-semibold border border-status-danger/20">
              {errorMessage.split(', ').map((err, index) => (
                <div key={index} className="mb-1 last:mb-0">
                  • {err}
                </div>
              ))}
            </div>
          )}          
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-shamelco-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-shamelco-darker bg-shamelco-border hover:bg-shamelco-sand rounded-md text-xs font-bold cursor-pointer transition-all duration-200 focus-visible:outline-shamelco-gold"
            >
              {t('messages.CANCEL')}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover shadow-gold rounded-md disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs font-black cursor-pointer active:scale-[0.98] transition-all duration-200 focus-visible:outline-shamelco-gold"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
                  <span>{t('messages.ADDING')}</span>
                </>
              ) : (
                <span>{t('messages.SAVE_CONSOLE')}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
