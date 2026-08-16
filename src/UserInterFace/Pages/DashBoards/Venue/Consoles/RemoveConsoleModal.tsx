import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { useRemoveConsoleModal } from "../../../../Hooks/Venue/useManageConsoles";

export const RemoveConsoleModal = ({ venueId, consoleId, onClose }: { venueId: GUID; consoleId: GUID; onClose: () => void }) => {
  const { handleConfirm, isPending, t } = useRemoveConsoleModal(venueId, consoleId, onClose);

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-shamelco-darker/60 flex items-center justify-center z-50 p-4 transition-opacity duration-200">
      <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-lg w-full max-w-sm p-6 border-t-4 border-t-status-danger animate-in fade-in zoom-in-95 duration-200 text-start">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-6 h-6 text-status-danger shrink-0" />
          <h2 className="text-lg font-black text-status-danger tracking-tight">{t('messages.CONFIRM_REMOVE_CONSOLE_TITLE')}</h2>
        </div>
        <p className="text-shamelco-muted text-xs font-semibold mb-6 leading-relaxed">
          {t('messages.CONFIRM_REMOVE_CONSOLE_DESC')}
        </p>

        <div className="flex justify-end gap-3 pt-4 border-t border-shamelco-border">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-shamelco-darker bg-shamelco-border hover:bg-shamelco-sand rounded-md text-xs font-bold cursor-pointer transition-all duration-200"
          >
            {t('messages.BACK')}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="px-5 py-2.5 text-white bg-status-danger hover:bg-status-danger/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-[0.98] cursor-pointer transition-all duration-200"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
                <span>{t('messages.DELETING')}</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>{t('messages.CONFIRM_REMOVE')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
