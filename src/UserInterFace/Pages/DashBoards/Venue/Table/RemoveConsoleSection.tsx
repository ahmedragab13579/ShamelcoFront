import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import Error from "../../../../Components/Common/Error";
import { Loader2, Gamepad2, Trash2 } from "lucide-react";
import { useRemoveConsoleSection } from "../../../../Hooks/Venue/useTableDetails";

export const RemoveConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const { handleRemoveConsole, isError, isPending, t } = useRemoveConsoleSection(parsedVenueId, parsedTableId);

  if (isError) {
    return <Error text={t('messages.ERROR_REMOVING_CONSOLE')} />;
  }

  return (
    <div className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto text-start mt-6 font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="w-6 h-6 text-shamelco-gold shrink-0" />
        <h3 className="text-xl font-black text-shamelco-darker">{t('messages.MANAGE_CONSOLE')}</h3>
      </div>
      <p className="mb-6 text-shamelco-muted text-sm font-semibold leading-relaxed">{t('messages.TABLE_HAS_CONSOLE_DESC')}</p>
      
      <div className="pt-4 border-t border-shamelco-border flex justify-end">
        <button 
          onClick={handleRemoveConsole} 
          disabled={isPending} 
          className="px-6 py-3 bg-status-danger text-white rounded-md font-bold hover:bg-status-danger/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-sm focus-visible:outline-status-danger shrink-0"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
              <span>{t('messages.REMOVING')}</span>
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 shrink-0" />
              <span>{t('messages.REMOVE_CONSOLE')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
