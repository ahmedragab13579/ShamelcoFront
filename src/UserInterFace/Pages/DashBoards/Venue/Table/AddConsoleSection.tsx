import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import type { GamingConsoleDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { Loader2, ChevronDown, Gamepad2, Plus } from "lucide-react";
import { useAddConsoleSection } from "../../../../Hooks/Venue/useTableDetails";

export const AddConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const {
    page,
    setPage,
    selectedConsoleId,
    setSelectedConsoleId,
    consolesList,
    hasNextPage,
    isLoading,
    isError,
    isAddError,
    isPending,
    handleAddConsole,
    t,
  } = useAddConsoleSection(parsedVenueId, parsedTableId);

  if (isLoading) return <p className="text-center text-shamelco-muted py-10 animate-pulse font-bold">{t('messages.LOADING_AVAILABLE_CONSOLES')}</p>;
  if (isError) return <p className="text-center text-status-danger font-semibold py-10">{t('messages.ERROR_FETCHING_CONSOLES')}</p>;
  if (!consolesList || consolesList.length === 0) 
    return <p className="text-center text-shamelco-muted font-semibold py-10">{t('messages.NO_AVAILABLE_CONSOLES')}</p>;

  return (
    <div className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto text-start mt-6 font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="w-6 h-6 text-shamelco-gold shrink-0" />
        <h3 className="text-xl font-black text-shamelco-darker">{t('messages.ADD_CONSOLE')}</h3>
      </div>
      
      {isAddError && <div className="mb-4 text-status-danger text-sm font-semibold bg-status-danger/10 p-3 rounded-md text-center border border-status-danger/20">{t('messages.ERROR_ADDING')}</div>}

      <div className="mb-6">
        <label className="block text-sm font-bold text-shamelco-darker mb-1.5">{t('messages.CHOOSE_CONSOLE')}</label>
        <div className="relative w-full">
          <select 
            value={selectedConsoleId}
            onChange={(e) => setSelectedConsoleId(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-shamelco-border bg-shamelco-surface text-start transition-all duration-200 outline-none text-shamelco-darker hover:border-shamelco-gold/50 focus:border-shamelco-gold focus:ring-2 focus:ring-shamelco-gold/20 appearance-none font-bold text-sm cursor-pointer shadow-sm"
          >
            <option value="" disabled className="bg-shamelco-surface text-shamelco-muted py-1">{t('messages.CHOOSE_DEVICE_PLACEHOLDER')}</option>
            {consolesList.map((consoleItem: GamingConsoleDto) => (
              <option key={consoleItem.id} value={consoleItem.id} className="bg-shamelco-surface text-shamelco-darker py-1 font-semibold">
                {consoleItem.name || `${t('messages.DEVICE_NUM')} ${consoleItem.id}`}
              </option>
            ))}
          </select>
          <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none text-shamelco-muted">
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 text-sm pt-2">
        <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))} 
          disabled={page === 1}
          className="px-4 py-2 bg-shamelco-border text-shamelco-darker rounded-md hover:bg-shamelco-sand disabled:opacity-40 disabled:cursor-not-allowed font-bold active:scale-[0.98] cursor-pointer transition-all duration-200"
        >
          {t('messages.PREVIOUS')}
        </button>
        <span className="text-shamelco-muted font-bold">{t('messages.PAGE_NUM')} {page}</span>
        <button 
          onClick={() => setPage((p) => p + 1)} 
          disabled={!hasNextPage}
          className="px-4 py-2 bg-shamelco-border text-shamelco-darker rounded-md hover:bg-shamelco-sand disabled:opacity-40 disabled:cursor-not-allowed font-bold active:scale-[0.98] cursor-pointer transition-all duration-200"
        >
          {t('messages.NEXT')}
        </button>
      </div>

      <div className="flex justify-end pt-4 border-t border-shamelco-border">
        <button 
          onClick={handleAddConsole} 
          disabled={isPending || !selectedConsoleId} 
          className={`px-6 py-3 rounded-md font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] text-sm focus-visible:outline-shamelco-gold shrink-0
             ${isPending || !selectedConsoleId
               ? "bg-shamelco-border text-shamelco-muted cursor-not-allowed opacity-70 shadow-none"
               : "bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker shadow-gold"}`}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
              <span>{t('messages.ADDING')}</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 shrink-0" />
              <span>{t('messages.ADD_CONSOLE')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
