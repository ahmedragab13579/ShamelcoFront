import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Gamepad2 } from 'lucide-react'; 

// Types
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import type { AddVenueTableCommand } from "../../../../BackEndIntegration/Types/Venues/Request";

// Hooks
import { useVenueDashboardQuery } from "../../../../BackEndIntegration/Hooks/Queries/useDashboardQueries";
import { 
} from "../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";

// Components
import Loading from "../../../Components/Common/Loading";
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

  const { data: dashboardData, isLoading, isError } = useVenueDashboardQuery(venueId);

  if (isLoading) {
    return <Loading text="جارِ تحميل البيانات..." />;
  }

  if (isError || !dashboardData) {
    return <Error text="فشل تحميل البيانات، يرجى المحاولة لاحقاً." />;
  }

  return (
    <div className="space-y-8 p-6 text-right bg-shamelco-light/10 min-h-screen" dir="rtl">
      
      {/* استدعاء مكون الهيدر الذي قمنا بتصميمه */}
      <HallManagementHeader setIsAddModalOpen={setIsAddModalOpen} />

      {/* Statistics Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Stat */}
        <div className="bg-white p-5 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-dark block mb-2">الإيرادات اليومية</span>
          <span className="text-2xl font-black text-shamelco-darker">
            {dashboardData.data.totalDailyRevenue} <span className="text-sm font-bold text-shamelco-accent">ج.م</span>
          </span>
        </div>

        {/* Available Tables Stat */}
        <div className="bg-white p-5 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-dark block mb-2">طاولات متاحة</span>
          <span className="text-2xl font-black text-shamelco-accent">
            {dashboardData.data.availableTablesCount}
          </span>
        </div>

        {/* Occupied Tables Stat */}
        <div className="bg-white p-5 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-light block mb-2">طاولات مشغولة</span>
          <span className="text-2xl font-black text-shamelco-light">
            {dashboardData.data.occupiedTablesCount}
          </span>
        </div>

        {/* Pending Orders Stat */}
        <div className="bg-white p-5 rounded-2xl border border-shamelco-accent/20 shadow-sm flex flex-col justify-between hover:border-shamelco-accent transition-colors">
          <span className="text-xs font-semibold text-shamelco-dark block mb-2">طلبات قيد الانتظار</span>
          <span className="text-2xl font-black text-shamelco-dark">
            {dashboardData.data.pendingOrdersCount}
          </span>
        </div>
      </div>

      {/* Tables Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dashboardData.data.tables.map((table) => (
          <div key={table.tableId} className="relative group">
            {/* Delete Button (Appears on Hover) */}
            <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <RemoveTableButton tableId={table.tableId} venueId={venueId} />
            </div>

            <Link to={`table/${table.tableId}`} relative="path" className="block">
              <VenueTableCard table={table} />
            </Link>
          </div>
        ))}
      </div>

      {/* Add Table Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 left-4 z-10 text-shamelco-dark hover:text-status-danger transition-colors font-bold"
              aria-label="إغلاق"
            >
              ✕
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
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-shamelco-dark/5">
      
      {/* قسم النصوص */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-black text-shamelco-darker">إدارة الصالة</h2>
        <p className="text-shamelco-dark text-sm font-medium">
          متابعة الطاولات، البلايستيشن، والطلبات الحالية.
        </p>
      </div>

      {/* قسم الأزرار */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        
        {/* زر إدارة أجهزة التحكم */}
        <Link
          to={"consoles-management"}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white border-2 border-shamelco-accent text-shamelco-accent hover:bg-shamelco-accent hover:text-white text-sm font-bold py-2 px-5 rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:shadow"
        >
          <Gamepad2 size={18} strokeWidth={2.5} />
          <span>إدارة أجهزة التحكم</span>
        </Link>

        {/* زر إضافة طاولة */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-shamelco-accent hover:bg-shamelco-dark text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={3} />
          <span>إضافة طاولة</span>
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
      className="space-y-5 p-6 bg-white rounded-2xl border border-shamelco-dark/10 shadow-sm text-right"
      dir="rtl"
    >
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-xl font-black text-shamelco-darker">إضافة طاولة جديدة</h3>
        <p className="text-sm text-shamelco-dark">قم بإدخال بيانات الطاولة لضمها للصالة.</p>
      </div>

    

      <SharedInput
        label="سعة الطاولة (عدد الأفراد)"
        type="number"
        placeholder="مثال: 4"
        min={1}
        {...register("Capacity", {
          required: "سعة الطاولة مطلوبة",
          valueAsNumber: true,
          min: { value: 1, message: "يجب أن تتسع لشخص واحد على الأقل" },
        })}
        error={errors.Capacity?.message}
      />

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="HasConsole"
          {...register("HasConsole")}
          className="w-5 h-5 text-shamelco-accent bg-shamelco-dark/5 border-shamelco-dark/20 rounded focus:ring-shamelco-accent focus:ring-2 transition-all cursor-pointer"
        />
        <label
          htmlFor="HasConsole"
          className="text-sm font-bold text-shamelco-darker select-none cursor-pointer"
        >
          تحتوي على جهاز ألعاب (بلايستيشن / إكس بوكس)
        </label>
      </div>

      {isError && (
        <div className="text-sm text-status-danger font-bold bg-status-danger/10 p-3 rounded-lg text-center">
          حدث خطأ أثناء الإضافة، يرجى المحاولة مرة أخرى.
        </div>
      )}

      <div className="pt-4 mt-2 border-t border-shamelco-dark/5">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-shamelco-accent hover:bg-shamelco-dark text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isPending ? "جارِ الحفظ..." : "حفظ الطاولة"}
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

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (window.confirm("هل أنت متأكد من حذف هذه الطاولة؟")) {
      mutate({ Id: tableId, VenueId: venueId });
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="bg-status-danger hover:bg-status-danger/90 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-w-[70px]"
      title="حذف الطاولة"
    >
      {isPending ? "جارِ الحذف..." : "حذف"}
    </button>
  );
};