import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import type { GamingConsoleDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { Trash2 } from "lucide-react";
import { useConsolesList } from "../../../../Hooks/Venue/useManageConsoles";

export const ConsolesList = ({ venueId, onRemoveRequest }: { venueId: GUID; onRemoveRequest: (id: GUID) => void }) => {
  const { consolesList, isLoading, isError, t } = useConsolesList(venueId);

  if (isLoading) return <p className="text-center text-shamelco-muted py-12 animate-pulse font-bold">{t('messages.LOADING_DATA')}</p>;
  if (isError) return <p className="text-center text-status-danger font-semibold py-12">{t('messages.ERROR_FETCHING_CONSOLES')}</p>;

  return (
    <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-sm overflow-x-auto transition-colors duration-200">
      <table className="min-w-full text-start border-collapse">
        <thead className="bg-shamelco-sand/40 border-b border-shamelco-border">
          <tr>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.CONSOLE_NAME')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.SERIAL_NUMBER')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.HOURLY_PRICE')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.STATUS')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-shamelco-border/60">
          {consolesList.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-shamelco-muted font-semibold">
                {t('messages.NO_CONSOLES_YET')}
              </td>
            </tr>
          ) : (
            consolesList.map((gamingConsole: GamingConsoleDto) => (
              <tr key={gamingConsole.id} className="hover:bg-shamelco-sand/20 transition-colors duration-150">
                <td className="p-4 font-bold text-shamelco-darker">{gamingConsole.name}</td>
                <td className="p-4 text-shamelco-muted font-semibold font-mono" dir="ltr">{gamingConsole.serialNumber}</td>
                <td className="p-4 font-bold text-shamelco-darker">
                  {gamingConsole.hourlyRate} <span className="text-xs font-normal text-shamelco-muted">{t('messages.CURRENCY')}</span>
                </td>
                <td className="p-4">
                  <span className="bg-shamelco-accent/10 dark:bg-shamelco-sky-soft text-shamelco-accent dark:text-shamelco-sky border border-shamelco-accent/20 px-3 py-1 rounded-full text-xs font-bold inline-block">
                    {gamingConsole.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onRemoveRequest(gamingConsole.id)}
                    className="text-status-danger hover:text-status-danger/80 font-bold text-xs cursor-pointer flex items-center gap-1 underline decoration-status-danger/40 underline-offset-4 transition-colors focus-visible:outline-status-danger rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('messages.REMOVE')}</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
