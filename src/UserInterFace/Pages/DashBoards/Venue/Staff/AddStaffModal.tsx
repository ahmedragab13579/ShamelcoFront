import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import type { VenueStaffRole } from "../../../../../BackEndIntegration/Types/Enums/AppEnums";
import { Loader2, ChevronDown, UserPlus } from "lucide-react";
import { useAddStaffModal } from "../../../../Hooks/Venue/useVenueMoreActions";

export const AddStaffModal = ({ venueId, onClose }: { venueId: GUID; onClose: () => void }) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    isError,
    isPending,
    errorMessage,
    t,
  } = useAddStaffModal(venueId, onClose);

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-shamelco-darker/60 flex items-center justify-center z-50 p-4 transition-opacity duration-200">
      <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200 text-start">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-shamelco-border">
          <UserPlus className="w-6 h-6 text-shamelco-gold shrink-0" />
          <h2 className="text-xl font-black text-shamelco-darker tracking-tight">{t('messages.ADD_NEW_STAFF')}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.FULL_NAME')}</label>
            <input
              required
              type="text"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold shadow-sm transition-all duration-200"
              value={formData.FullName}
              onChange={(e) => setFormData({ ...formData, FullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.EMAIL_LABEL')}</label>
            <input
              required
              type="email"
              dir="ltr"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold shadow-sm transition-all duration-200 text-left font-mono"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.PASSWORD_LABEL')}</label>
            <input
              required
              type="password"
              dir="ltr"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none text-sm font-semibold shadow-sm transition-all duration-200 text-left"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.JOB_ROLE')}</label>
            <div className="relative w-full">
              <select
                className="w-full border border-shamelco-border bg-shamelco-surface text-shamelco-darker rounded-md p-3 pe-8 focus:ring-2 focus:ring-shamelco-gold/20 focus:border-shamelco-gold outline-none appearance-none font-bold text-sm cursor-pointer shadow-sm transition-all duration-200 hover:border-shamelco-gold/50"
                value={formData.Role}
                onChange={(e) => setFormData({ ...formData, Role: e.target.value as VenueStaffRole })}
              >
                <option value="Cashier" className="bg-shamelco-surface text-shamelco-darker py-1 font-semibold">{t('messages.ROLE_CASHIER')}</option>
                <option value="Manager" className="bg-shamelco-surface text-shamelco-darker py-1 font-semibold">{t('messages.ROLE_MANAGER')}</option>
                <option value="Waiter" className="bg-shamelco-surface text-shamelco-darker py-1 font-semibold">{t('messages.ROLE_WAITER')}</option>
              </select>
              <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-shamelco-muted">
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
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
                <span>{t('messages.SAVE_STAFF')}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
