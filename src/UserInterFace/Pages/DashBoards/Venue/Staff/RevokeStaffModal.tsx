import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import { Loader2, ShieldAlert, UserX } from "lucide-react";
import { useRevokeStaffModal } from "../../../../Hooks/Venue/useVenueMoreActions";

export const RevokeStaffModal = ({ venueId, staffId, onClose }: { venueId: GUID; staffId: GUID; onClose: () => void }) => {
  const {
    credentials,
    setCredentials,
    handleSubmit,
    isPending,
    t,
  } = useRevokeStaffModal(venueId, staffId, onClose);

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-shamelco-darker/60 flex items-center justify-center z-50 p-4 transition-opacity duration-200">      
      <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-lg w-full max-w-sm p-6 border-t-4 border-t-status-danger animate-in fade-in zoom-in-95 duration-200 text-start">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-6 h-6 text-status-danger shrink-0" />
          <h2 className="text-lg font-black text-status-danger tracking-tight">{t('messages.CONFIRM_REVOKE_PERMISSIONS')}</h2>
        </div>
        <p className="text-shamelco-muted text-xs font-semibold mb-6 leading-relaxed">
          {t('messages.REVOKE_STAFF_SECURITY_DESC')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.EMAIL_LABEL')}</label>
            <input
              required
              type="email"
              dir="ltr"
              placeholder="admin@example.com"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-status-danger/20 focus:border-status-danger outline-none text-sm font-semibold shadow-sm transition-all duration-200 text-left font-mono"
              value={credentials.Email}
              onChange={(e) => setCredentials({ ...credentials, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-darker text-xs font-bold mb-1.5">{t('messages.PASSWORD_LABEL')}</label>
            <input
              required
              type="password"
              dir="ltr"
              placeholder="••••••••"
              className="w-full border border-shamelco-border bg-shamelco-bg text-shamelco-darker rounded-md p-3 focus:ring-2 focus:ring-status-danger/20 focus:border-status-danger outline-none text-sm font-semibold shadow-sm transition-all duration-200 text-left"
              value={credentials.Password}
              onChange={(e) => setCredentials({ ...credentials, Password: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-shamelco-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-shamelco-darker bg-shamelco-border hover:bg-shamelco-sand rounded-md text-xs font-bold cursor-pointer transition-all duration-200"
            >
              {t('messages.BACK')}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 text-white bg-status-danger hover:bg-status-danger/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-[0.98] cursor-pointer transition-all duration-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
                  <span>{t('messages.CONFIRMING')}</span>
                </>
              ) : (
                <>
                  <UserX className="w-4 h-4 shrink-0" />
                  <span>{t('messages.CONFIRM_REMOVE')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
