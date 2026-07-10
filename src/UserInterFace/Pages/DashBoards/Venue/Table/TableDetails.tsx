import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SharedInput } from "../../../../Components/Common/SharedInput";
import asGUID, { type GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import { 
  useGetVenuesConsoles, 
  useGetVenueTable, 

} from "../../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import Loading from "../../../../Components/Common/Loading";
import Error from "../../../../Components/Common/Error";
import type { UpdateVenueTableCommand } from "../../../../../BackEndIntegration/Types/Venues/Request";
import type { GamingConsoleDto, TableStateDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { useAddVenueTableConsoleMutation, useRemoveVenueTableConsoleMutation, useUpdateVenueTableMutation } from "../../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";


interface VenueTableSettingsFormProps {
  initialData: TableStateDto;
  VenueId: GUID;
}

const VenueTableSettingsForm: React.FC<VenueTableSettingsFormProps> = ({ initialData, VenueId }) => {
  const { mutate: updateVenueTable, isPending } = useUpdateVenueTableMutation();
  
  const defaultValues = useMemo<UpdateVenueTableCommand>(() => ({
    Id: initialData.tableId,
    VenueId: VenueId,
    TableNumber: initialData.tableNumber,
    Capacity: initialData.capacity,
    Status: initialData.status||"Unavailable",
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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto text-right mb-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-shamelco-darker">إعدادات الطاولة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SharedInput
          label="رقم الطاولة"
          type="number"
          error={errors.TableNumber?.message}
          {...register("TableNumber", { required: "رقم الطاولة مطلوب" })}
        />
        <SharedInput
          label="السعة (عدد الأفراد)"
          type="number"
          error={errors.Capacity?.message}
          {...register("Capacity", { required: "السعة مطلوبة" })}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-shamelco-dark mb-1">حالة الطاولة</label>
        <select
          {...register("Status")}
          className="w-full px-3 py-2 border border-shamelco-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
        >
          <option value="Available">متاحة</option>
          <option value="Occupied">مشغولة</option>
          <option value="Reserved">محجوزة</option>
          <option value="Maintenance">صيانة</option>
          <option value="Unavailable">خارج الخدمة</option>
        </select>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-6 py-2 rounded-md text-white font-semibold transition-all duration-300
             ${!isDirty || isPending
              ? "bg-shamelco-dark/20 cursor-not-allowed opacity-70"
              : "bg-shamelco-accent hover:bg-shamelco-accent/90 shadow-md"
            }`}
        >
          {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>
    </form>
  );
};

const RemoveConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const { mutate: removeVenueTableConsole, isError, isPending } = useRemoveVenueTableConsoleMutation();

  if (isError) {
    return <Error text="حدث خطأ أثناء إزالة وحدة التحكم." />;
  }

  function handleRemoveConsole() {
    removeVenueTableConsole({ VenueId: parsedVenueId, Id: parsedTableId });
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto text-right mt-6" dir="rtl">
      <h3 className="text-xl font-bold mb-4 text-shamelco-darker">إدارة وحدة التحكم (Console)</h3>
      <p className="mb-4 text-shamelco-dark/70">هذه الطاولة تحتوي بالفعل على وحدة تحكم مرتبطة بها.</p>
      <button 
        onClick={handleRemoveConsole} 
        disabled={isPending} 
        className="px-6 py-2 bg-status-danger text-white rounded-md hover:bg-status-danger/90 transition-all duration-300 disabled:opacity-50"
      >
        {isPending ? "جاري الإزالة..." : "إزالة وحدة التحكم"}
      </button>
    </div>
  );
};

const AddConsoleSection = ({ parsedVenueId, parsedTableId }: { parsedVenueId: GUID; parsedTableId: GUID }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  
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

  if (isLoading) return <Loading text="جاري تحميل أجهزة الكونسول المتاحة..." />;
  if (isError) return <Error text="حدث خطأ أثناء جلب أجهزة الكونسول." />;
  if(!data?.data || data.data.items.length === 0) 
    return <Error text="لا توجد أجهزة كونسول متاحة للإضافة." />;
  const consolesList = data.data.items; 
  const hasNextPage = data?.data?.hasNextPage || consolesList.length === pageSize;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto text-right mt-6" dir="rtl">
      <h3 className="text-xl font-bold mb-4 text-shamelco-darker">إضافة وحدة تحكم (Console)</h3>
      
      {isAddError && <div className="mb-4 text-status-danger">حدث خطأ أثناء الإضافة.</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-shamelco-dark mb-1">اختر وحدة التحكم</label>
        <select 
          value={selectedConsoleId}
          onChange={(e) => setSelectedConsoleId(e.target.value)}
          className="w-full px-3 py-2 border border-shamelco-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
        >
          <option value="" disabled>-- اختر جهازاً --</option>
          {consolesList.map((consoleItem: GamingConsoleDto) => (
            <option key={consoleItem.id} value={consoleItem.id}>
              {consoleItem.name || `جهاز رقم ${consoleItem.id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))} 
          disabled={page === 1}
          className="px-3 py-1 bg-shamelco-dark/10 text-shamelco-darker rounded-md hover:bg-shamelco-dark/20 disabled:opacity-50"
        >
          السابق
        </button>
        <span className="text-shamelco-dark/70">صفحة {page}</span>
        <button 
          onClick={() => setPage((p) => p + 1)} 
          disabled={!hasNextPage}
          className="px-3 py-1 bg-shamelco-dark/10 text-shamelco-darker rounded-md hover:bg-shamelco-dark/20 disabled:opacity-50"
        >
          التالي
        </button>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleAddConsole} 
          disabled={isPending || !selectedConsoleId} 
          className="px-6 py-2 bg-status-success text-white rounded-md hover:bg-status-success/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "جاري الإضافة..." : "إضافة وحدة التحكم"}
        </button>
      </div>
    </div>
  );
};

export default function VenueTableSettingsPage() {
  const { id, tableId } = useParams(); 
  
  const parsedVenueId = useMemo(() => asGUID(id||"00000000-0000-0000-0000-000000000000"), [id]);
  const parsedTableId = useMemo(() => asGUID(tableId||"00000000-0000-0000-0000-000000000000"), [tableId]);

  const { data, isLoading, isError } = useGetVenueTable({ 
    Id: parsedTableId, 
    VenueId: parsedVenueId 
  });

  if (isLoading) return <Loading text="جاري تحميل بيانات الطاولة..."/>;
  if (isError || !data?.data) return <Error text="حدث خطأ أثناء جلب البيانات."/>;

  return (
    <div className="p-4 bg-shamelco-bg min-h-screen">
      <VenueTableSettingsForm initialData={data.data} VenueId={parsedVenueId} />
      
      {data.data?.hasConsole ? (
        <RemoveConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
      ) : (
        <AddConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
      )}
    </div>
  );
}