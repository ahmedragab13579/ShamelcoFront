import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Gamepad2, Loader2, Trash2, X } from 'lucide-react'; 
import { useLanguage } from "../../../Hooks/Shared/useLanguage"; 

// Types
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import type { AddVenueTableCommand } from "../../../../BackEndIntegration/Types/Venues/Request";

// Hooks
import { useVenueDashboardQuery } from "../../../../BackEndIntegration/Hooks/Queries/useDashboardQueries";

// Components
import Error from "../../../Components/Common/Error";
import VenueTableCard from "../../../Components/Venue/VenueTableCard";
import { SharedInput } from "../../../Components/Common/SharedInput";
import { useAddVenueTableMutation, useRemoveVenueTableMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";

// ============================================================================
// 1. Main Component: VenueDashboard
// ============================================================================

export default function VenueDashboard() {
  const { id } = useParams<{ id: string }>();
  const venueId = id as GUID;
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  const { data: dashboardData, isLoading, isError } = useVenueDashboardQuery(venueId);

  if (isLoading) {
    return <VenueDashboardSkeleton />;
  }

  if (isError || !dashboardData) {
    return <Error text={t('messages.ERROR_LOADING_DATA_RETRY')} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-start bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-in fade-in duration-500">
      
      {/* استدعاء مكون الهيدر */}
      <HallManagementHeader setIsAddModalOpen={setIsAddModalOpen} />

      {/* Statistics Section - متوافقة 100% مع الـ Tokens وقاعدة الـ Contrast */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Revenue Stat */}
        <div className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">{t('messages.DAILY_REVENUE')}</span>
          <span className="text-2xl sm:text-3xl font-black text-shamelco-darker">
            {dashboardData.data.totalDailyRevenue}{" "}
            <span className="text-xs sm:text-sm font-bold text-shamelco-accent dark:text-shamelco-sky">{t('messages.CURRENCY')}</span>
          </span>
        </div>

        {/* Available Tables Stat */}
        <div className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">{t('messages.AVAILABLE_TABLES')}</span>
          <span className="text-2xl sm:text-3xl font-black text-shamelco-accent dark:text-shamelco-sky">
            {dashboardData.data.availableTablesCount}
          </span>
        </div>

        {/* Occupied Tables Stat */}
        <div className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">{t('messages.OCCUPIED_TABLES')}</span>
          <span className="text-2xl sm:text-3xl font-black text-shamelco-darker">
            {dashboardData.data.occupiedTablesCount}
          </span>
        </div>

        {/* Pending Orders Stat */}
        <div className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">{t('messages.PENDING_ORDERS')}</span>
          <span className="text-2xl sm:text-3xl font-black text-shamelco-darker">
            {dashboardData.data.pendingOrdersCount}
          </span>
        </div>
      </div>

      {/* Tables Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {dashboardData.data.tables.map((table) => (
          <div key={table.tableId} className="relative group">
            
            {/* Delete Button (Appears on Hover) - موقع منطقي وتصميم احترافي */}
            <div className="absolute top-3 start-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 focus-within:opacity-100">
              <RemoveTableButton tableId={table.tableId} venueId={venueId} />
            </div>

            <Link to={`table/${table.tableId}`} relative="path" className="block focus-visible:outline-shamelco-gold rounded-lg">
              <VenueTableCard table={table} />
            </Link>
          </div>
        ))}
      </div>

      {/* Add Table Modal - متوافق مع ألوان الخلفية في الـ Dark Mode */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-shamelco-darker/60 backdrop-blur-xs animate-in fade-in duration-200 transition-opacity">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 end-4 z-10 text-shamelco-muted hover:text-status-danger transition-colors font-bold w-8 h-8 rounded-full bg-shamelco-bg flex items-center justify-center cursor-pointer shadow-sm border border-shamelco-border/40 focus-visible:outline-shamelco-gold"
              aria-label={t('messages.CLOSE') || "إغلاق"}
              title={t('messages.CLOSE') || "إغلاق"}
            >
              <X className="w-4 h-4" />
            </button>
            
            <AddTableForm 
              venueId={venueId} 
              onSuccessCallback={() => setIsAddModalOpen(false)} 
            />
          </div>
        </div>
      )}
    </div> 
  );
}

// ============================================================================
// 2. Sub-Component: HallManagementHeader
// ============================================================================

function HallManagementHeader({ setIsAddModalOpen }: { setIsAddModalOpen: (value: boolean) => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-shamelco-surface p-5 sm:p-6 rounded-lg shadow-sm border border-shamelco-border transition-colors duration-200">
      
      {/* قسم النصوص */}
      <div className="flex flex-col gap-1.5 text-start">
        <h2 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight">{t('messages.HALL_MANAGEMENT')}</h2>
        <p className="text-shamelco-muted text-sm sm:text-base font-semibold">
          {t('messages.HALL_MANAGEMENT_DESC')}
        </p>
      </div>

      {/* قسم الأزرار - توظيف قاعدة الـ 10% للأكشن الرئيسي */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
        
        {/* زر إدارة أجهزة التحكم (Secondary Action) */}
        <Link
          to={"consoles-management"}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-shamelco-surface border border-shamelco-border text-shamelco-darker hover:bg-shamelco-sand hover:text-shamelco-gold text-sm font-bold py-2.5 px-5 rounded-md transition-all duration-200 shadow-sm active:scale-[0.98] focus-visible:outline-shamelco-gold"
        >
          <Gamepad2 className="w-4 h-4 text-shamelco-gold shrink-0" />
          <span>{t('messages.MANAGE_CONSOLES')}</span>
        </Link>

        {/* زر إضافة طاولة (Primary Action - اللون الذهبي المميز) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker text-sm font-black py-2.5 px-6 rounded-md transition-all duration-200 shadow-gold active:scale-[0.98] cursor-pointer focus-visible:outline-shamelco-gold"
        >
          <Plus className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span>{t('messages.ADD_TABLE')}</span>
        </button>

      </div>
    </div>
  );
}

// ============================================================================
// 3. Sub-Component: AddTableForm
// ============================================================================

interface AddTableFormProps {
  venueId: GUID;
  onSuccessCallback?: () => void; 
}

const AddTableForm = ({ venueId, onSuccessCallback }: AddTableFormProps) => {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddVenueTableCommand>({
    defaultValues: {
      VenueId: venueId,
      Capacity: 2,
      HasConsole: false,
    },
  });

  const { mutate, isPending, isError } = useAddVenueTableMutation();

  const onSubmit = (data: AddVenueTableCommand) => {
    mutate(data, {
      onSuccess: () => {
        if (onSuccessCallback) onSuccessCallback();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-6 sm:p-8 bg-shamelco-surface rounded-lg border border-shamelco-border shadow-lg text-start font-sans animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex flex-col gap-1 mb-4 pb-3 border-b border-shamelco-border">
        <h3 className="text-xl font-black text-shamelco-darker tracking-tight">{t('messages.ADD_NEW_TABLE')}</h3>
        <p className="text-xs sm:text-sm font-semibold text-shamelco-muted">{t('messages.ENTER_TABLE_DETAILS_DESC')}</p>
      </div>

      <SharedInput
        label={t('messages.TABLE_CAPACITY')}
        type="number"
        placeholder={t('messages.EX_4') || "4"}
        min={1}
        {...register("Capacity", {
          required: t('messages.TABLE_CAPACITY_REQUIRED'),
          valueAsNumber: true,
          min: { value: 1, message: t('messages.TABLE_MIN_CAPACITY') || "السعة لا تقل عن 1" },
        })}
        error={errors.Capacity?.message}
      />

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="HasConsole"
          {...register("HasConsole")}
          className="w-5 h-5 text-shamelco-gold bg-shamelco-bg border-shamelco-border rounded focus:ring-shamelco-gold/20 focus:ring-2 transition-all cursor-pointer"
        />
        <label
          htmlFor="HasConsole"
          className="text-sm font-bold text-shamelco-darker select-none cursor-pointer"
        >
          {t('messages.HAS_GAME_CONSOLE')}
        </label>
      </div>

      {isError && (
        <div className="text-xs sm:text-sm text-status-danger font-semibold bg-status-danger/10 p-3 rounded-md text-center border border-status-danger/20 animate-in fade-in">
          {t('messages.ERROR_ADDING_TABLE')}
        </div>
      )}

      <div className="pt-4 mt-2 border-t border-shamelco-border flex justify-end">
        {/* زرار الحفظ - توظيف اللون الذهبي للأكشن */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker font-black py-3 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer active:scale-[0.98] shadow-gold focus-visible:outline-shamelco-gold"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-current shrink-0" aria-hidden="true" />
              <span>{t('messages.SAVING')}</span>
            </>
          ) : (
            <span>{t('messages.SAVE_TABLE')}</span>
          )}
        </button>
      </div>
    </form>
  );
};

// ============================================================================
// 4. Sub-Component: RemoveTableButton
// ============================================================================

interface RemoveTableButtonProps {
  venueId: GUID;
  tableId: GUID;
}

const RemoveTableButton = ({ venueId, tableId }: RemoveTableButtonProps) => {
  const { mutate, isPending } = useRemoveVenueTableMutation();
  const { t } = useLanguage();

  const handleRemove = (e: React.MouseEvent) => {
    // التأكيد المزدوج على منع تداخل الـ Event
    e.preventDefault(); 
    e.stopPropagation();

    if (window.confirm(t('messages.CONFIRM_REMOVE_TABLE') || "هل أنت متأكد من حذف هذه الطاولة؟")) {
      mutate({ Id: tableId, VenueId: venueId });
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="bg-status-danger hover:bg-status-danger/90 text-white text-xs font-bold py-1.5 px-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer focus-visible:outline-status-danger"
      title={t('messages.REMOVE_TABLE') || "حذف الطاولة"}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        <>
          <Trash2 className="w-3.5 h-3.5 shrink-0" />
          <span>{t('messages.REMOVE')}</span>
        </>
      )}
    </button>
  );
};

// ============================================================================
// 5. Skeleton: VenueDashboardSkeleton
// ============================================================================

function VenueDashboardSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-start bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-pulse">
      
      {/* هيدر الهيكل */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-shamelco-sand rounded-md" />
          <div className="h-4 w-64 bg-shamelco-sand/60 rounded-md" />
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="h-10 w-full sm:w-40 bg-shamelco-sand rounded-md" />
          <div className="h-10 w-full sm:w-32 bg-shamelco-sand rounded-md" />
        </div>
      </div>

      {/* إحصائيات هيكلية */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-shamelco-surface p-5 sm:p-6 rounded-lg border border-shamelco-border shadow-sm h-28 flex flex-col justify-between">
            <div className="h-3 w-20 bg-shamelco-sand rounded-md" />
            <div className="h-8 w-16 bg-shamelco-sand rounded-md" />
          </div>
        ))}
      </div>

      {/* شبكة طاولات هيكلية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-shamelco-surface p-5 rounded-lg border border-shamelco-border shadow-sm h-48" />
        ))}
      </div>

    </div>
  );
}