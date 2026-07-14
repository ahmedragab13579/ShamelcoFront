import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import type FailResult from "../../../../BackEndIntegration/Types/Result/Fail";

import { 
  useGetVenuesConsoles, 
} from "../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { GamingConsoleDto } from "../../../../BackEndIntegration/Types/Venues/Response";
import { useAddVenueConsoleMutation, useRemoveVenueConsoleMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { Loader2, Plus, Trash2, Gamepad2, AlertTriangle } from "lucide-react";

import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export const VenueConsolesPage = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [consoleToRemove, setConsoleToRemove] = useState<GUID | null>(null);
  const { t } = useLanguage();

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-in fade-in duration-500">
      
      {/* الترويسة وأدوات التحكم - متوافقة مع الموبايل والديسكتوب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 pb-4 border-b border-shamelco-border">
        <div className="space-y-1 text-start">
          <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-shamelco-gold shrink-0" />
            <span>{t('messages.MANAGE_GAMING_CONSOLES')}</span>
          </h1>
          <p className="text-sm sm:text-base font-semibold text-shamelco-muted">
            {t('messages.MANAGE_GAMING_CONSOLES_DESC')}
          </p>
        </div>

        {/* توظيف اللون الذهبي للأكشن الرئيسي (Primary CTA) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker px-5 py-2.5 rounded-md font-black transition-all duration-200 shadow-gold active:scale-[0.98] cursor-pointer text-sm flex items-center justify-center gap-2 focus-visible:outline-shamelco-gold shrink-0"
        >
          <Plus className="w-5 h-5 shrink-0" />
          <span>{t('messages.ADD_NEW_CONSOLE_BTN')}</span>
        </button>
      </div>

      {/* قائمة الأجهزة */}
      <ConsolesList 
        venueId={asGUID(id || "00000000-0000-0000-0000-000000000000")} 
        onRemoveRequest={(consoleId) => setConsoleToRemove(consoleId)} 
      />

      {/* نافذة إضافة جهاز */}
      {isAddModalOpen && (
        <AddConsoleModal 
          venueId={asGUID(id || "00000000-0000-0000-0000-000000000000")} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}

      {/* نافذة حذف الجهاز */}
      {consoleToRemove && (
        <RemoveConsoleModal
          venueId={asGUID(id || "00000000-0000-0000-0000-000000000000")}
          consoleId={consoleToRemove}
          onClose={() => setConsoleToRemove(null)}
        />
      )}
    </div>
  );
};

const ConsolesList = ({ venueId, onRemoveRequest }: { venueId: GUID; onRemoveRequest: (id: GUID) => void }) => {
  const [pagination] = useState({ page: 1, pageSize: 20 });
  const { t } = useLanguage();

  const { data, isLoading, isError } = useGetVenuesConsoles({
    Id: venueId,
    params: pagination,
  });

  if (isLoading) return <p className="text-center text-shamelco-muted py-12 animate-pulse font-bold">{t('messages.LOADING_DATA')}</p>;
  if (isError) return <p className="text-center text-status-danger font-semibold py-12">{t('messages.ERROR_FETCHING_CONSOLES')}</p>;

  const consolesList = data?.data?.items || [];

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

const AddConsoleModal = ({ venueId, onClose }: { venueId: GUID; onClose: () => void }) => {
  const { mutate, isError, isPending, error } = useAddVenueConsoleMutation();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    Name: "",
    SerialNumber: "",
    HourlyRate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { 
        VenueId: venueId, 
        Name: formData.Name, 
        SerialNumber: formData.SerialNumber, 
        HourlyRate: Number(formData.HourlyRate) 
      },
      { onSuccess: () => onClose() }
    );
  };

  const errorMessage = (error as FailResult)?.code || "";

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

const RemoveConsoleModal = ({ venueId, consoleId, onClose }: { venueId: GUID; consoleId: GUID; onClose: () => void }) => {
  const mutation = useRemoveVenueConsoleMutation();
  const { t } = useLanguage();

  const handleConfirm = () => {
    mutation.mutate(
      { 
        VenueId: venueId, 
        Id: consoleId 
      },
      { onSuccess: () => onClose() }
    );
  };

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
            disabled={mutation.isPending}
            className="px-5 py-2.5 text-white bg-status-danger hover:bg-status-danger/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-[0.98] cursor-pointer transition-all duration-200"
          >
            {mutation.isPending ? (
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