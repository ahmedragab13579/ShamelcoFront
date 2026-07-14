import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SharedInput } from "../../../../Components/Common/SharedInput";
import asGUID, { type GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import { 
  useGetVenuesConsoles, 
  useGetVenueTable, 
} from "../../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import Error from "../../../../Components/Common/Error";
import type { UpdateVenueTableCommand } from "../../../../../BackEndIntegration/Types/Venues/Request";
import type { GamingConsoleDto, TableStateDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { useAddVenueTableConsoleMutation, useRemoveVenueTableConsoleMutation, useUpdateVenueTableMutation } from "../../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { Loader2, ChevronDown, Gamepad2, Trash2, Plus } from "lucide-react";
import { useLanguage } from "../../../../Hooks/Shared/useLanguage";

interface VenueTableSettingsFormProps {
  initialData: TableStateDto;
  VenueId: GUID;
}

const VenueTableSettingsForm: React.FC<VenueTableSettingsFormProps> = ({ initialData, VenueId }) => {
  const { mutate: updateVenueTable, isPending } = useUpdateVenueTableMutation();
  const { t } = useLanguage();
  
  const defaultValues = useMemo<UpdateVenueTableCommand>(() => ({
    Id: initialData.tableId,
    VenueId: VenueId,
    TableNumber: initialData.tableNumber,
    Capacity: initialData.capacity,
    Status: initialData.status || "Unavailable",
  }), [
    initialData.tableId,
    VenueId,
    initialData.tableNumber,
    initialData.capacity,
    initialData.status,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateVenueTableCommand>({
    defaultValues,
    values: defaultValues,
  });

  const onSubmit = (data: UpdateVenueTableCommand) => {
    data.TableNumber = Number(data.TableNumber);
    data.Capacity = Number(data.Capacity);

    updateVenueTable(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

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
        {/* توظيف اللون الذهبي للأكشن الرئيسي */}
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

const RemoveConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const { mutate: removeVenueTableConsole, isError, isPending } = useRemoveVenueTableConsoleMutation();
  const { t } = useLanguage();

  if (isError) {
    return <Error text={t('messages.ERROR_REMOVING_CONSOLE')} />;
  }

  function handleRemoveConsole() {
    removeVenueTableConsole({ VenueId: parsedVenueId, Id: parsedTableId });
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

const AddConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const { t } = useLanguage();
  
  const [selectedConsoleId, setSelectedConsoleId] = useState<string>("");

  const { data, isLoading, isError } = useGetVenuesConsoles({ 
    Id: parsedVenueId, 
    params: { page, pageSize } 
  });

  const { mutate: addVenueTableConsole, isPending, isError: isAddError } = useAddVenueTableConsoleMutation();

  function handleAddConsole() {
    if (!selectedConsoleId) return;
    addVenueTableConsole({ 
      VenueId: parsedVenueId, 
      Id: parsedTableId, 
      ConsoleId: asGUID(selectedConsoleId) 
    });
  }

  if (isLoading) return <p className="text-center text-shamelco-muted py-10 animate-pulse font-bold">{t('messages.LOADING_AVAILABLE_CONSOLES')}</p>;
  if (isError) return <p className="text-center text-status-danger font-semibold py-10">{t('messages.ERROR_FETCHING_CONSOLES')}</p>;
  if (!data?.data || data.data.items.length === 0) 
    return <p className="text-center text-shamelco-muted font-semibold py-10">{t('messages.NO_AVAILABLE_CONSOLES')}</p>;
  
  const consolesList = data.data.items; 
  const hasNextPage = data?.data?.hasNextPage || consolesList.length === pageSize;

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

      {/* Pagination Controls - متوافقة مع الـ Dark Mode */}
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
        {/* توظيف اللون الذهبي لإضافة الجهاز */}
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

export default function VenueTableSettingsPage() {
  const { id, tableId } = useParams(); 
  const { t } = useLanguage();
  
  const parsedVenueId = useMemo(() => asGUID(id || "00000000-0000-0000-0000-000000000000"), [id]);
  const parsedTableId = useMemo(() => asGUID(tableId || "00000000-0000-0000-0000-000000000000"), [tableId]);

  const { data, isLoading, isError } = useGetVenueTable({ 
    Id: parsedTableId, 
    VenueId: parsedVenueId 
  });

  if (isLoading) return <TableDetailsSkeleton />;
  if (isError || !data?.data) return <Error text={t('messages.ERROR_FETCHING_DATA')} />;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex flex-col items-center justify-start transition-colors duration-200">
      <div className="w-full">
        <VenueTableSettingsForm initialData={data.data} VenueId={parsedVenueId} />
        
        {data.data?.hasConsole ? (
          <RemoveConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
        ) : (
          <AddConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
        )}
      </div>
    </div>
  );
}

// Skeleton متسق تماماً مع ألوان الوضع الغامق وبدون وميض أبيض
function TableDetailsSkeleton() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-pulse flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl bg-shamelco-surface rounded-lg border border-shamelco-border p-6 sm:p-8 space-y-6 shadow-md">
        <div className="h-7 w-40 bg-shamelco-sand rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
              <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
          <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
        </div>
        <div className="flex justify-end pt-6 border-t border-shamelco-border">
          <div className="h-12 w-36 bg-shamelco-sand rounded-md" />
        </div>
      </div>
    </div>
  );
}