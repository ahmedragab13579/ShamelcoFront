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

export const VenueConsolesPage = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [consoleToRemove, setConsoleToRemove] = useState<GUID | null>(null);

  return (
    <div className="p-6 bg-shamelco-bg min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-shamelco-darker">إدارة أجهزة الألعاب</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-shamelco-accent text-white px-4 py-2 rounded-lg hover:bg-shamelco-accent/90 transition"
        >
          + إضافة جهاز جديد
        </button>
      </div>

      {/* قائمة الأجهزة */}
      <ConsolesList 
        venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")} 
        onRemoveRequest={(consoleId) => setConsoleToRemove(consoleId)} 
      />

      {/* نافذة إضافة جهاز */}
      {isAddModalOpen && (
        <AddConsoleModal 
          venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}

      {/* نافذة حذف الجهاز */}
      {consoleToRemove && (
        <RemoveConsoleModal
          venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")}
          consoleId={consoleToRemove}
          onClose={() => setConsoleToRemove(null)}
        />
      )}
    </div>
  );
};


const ConsolesList = ({ venueId, onRemoveRequest }: { venueId: GUID; onRemoveRequest: (id: GUID) => void }) => {
  const [pagination] = useState({ page: 1, pageSize: 20 });

  const { data, isLoading, isError } = useGetVenuesConsoles({
    Id: venueId,
    params: pagination,
  });

  if (isLoading) return <p className="text-center text-shamelco-dark/60">جاري تحميل البيانات...</p>;
  if (isError) return <p className="text-center text-status-danger">حدث خطأ أثناء جلب الأجهزة.</p>;

  const consolesList = data?.data?.items || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-right">
        <thead className="bg-shamelco-bg border-b border-shamelco-dark/10">
          <tr>
            <th className="p-4 text-shamelco-dark/70 font-semibold">اسم الجهاز</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">الرقم التسلسلي</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">السعر / ساعة</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">الحالة</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">إجراءات</th>
          </tr>
        </thead>
        <tbody>
           {consolesList.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-shamelco-dark/60">لا توجد أجهزة حتى الآن.</td>
            </tr>
          ) : (
            consolesList.map((gamingConsole: GamingConsoleDto) => (
              <tr key={gamingConsole.id} className="border-b border-shamelco-dark/5 hover:bg-shamelco-dark/5">
                <td className="p-4 font-medium text-shamelco-darker">{gamingConsole.name}</td>
                <td className="p-4 text-shamelco-dark/70">{gamingConsole.serialNumber}</td>
                <td className="p-4 text-shamelco-darker">{gamingConsole.hourlyRate} ج.م</td>
                <td className="p-4">
                  <span className="bg-shamelco-dark/10 text-shamelco-dark px-2 py-1 rounded-full text-sm">
                    {gamingConsole.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onRemoveRequest(gamingConsole.id)}
                    className="text-status-danger hover:text-status-danger/90 font-medium"
                  >
                    حذف
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

  const errorMessage = (error as FailResult)?.error || "";

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">إضافة جهاز ألعاب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-dark mb-1">اسم الجهاز</label>
            <input
              required
              type="text"
              placeholder="مثال: PS5 Pro"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">الرقم التسلسلي (Serial Number)</label>
            <input
              required
              type="text"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent text-left"
              dir="ltr"
              value={formData.SerialNumber}
              onChange={(e) => setFormData({ ...formData, SerialNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">السعر في الساعة</label>
            <input
              required
              type="number"
              min="0"
              step="0.5"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.HourlyRate}
              onChange={(e) => setFormData({ ...formData, HourlyRate: e.target.value as any })}
            />
          </div>

          {isError && typeof errorMessage === 'string' && (
            <div className="text-status-danger bg-status-danger/10 p-3 rounded-lg text-sm mt-2">
              {errorMessage.split(', ').map((err, index) => (
                <div key={index} className="mb-1">
                  • {err}
                </div>
              ))}
            </div>
          )}          
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-shamelco-dark/70 bg-shamelco-dark/10 rounded-lg hover:bg-shamelco-dark/20"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-white bg-shamelco-accent rounded-lg hover:bg-shamelco-accent/90 disabled:opacity-50"
            >
              {isPending ? "جاري الإضافة..." : "حفظ الجهاز"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const RemoveConsoleModal = ({ venueId, consoleId, onClose }: { venueId: GUID; consoleId: GUID; onClose: () => void }) => {
  const mutation = useRemoveVenueConsoleMutation();

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
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 border-t-4 border-status-danger">
        <h2 className="text-xl font-bold text-status-danger mb-2">تأكيد حذف الجهاز</h2>
        <p className="text-shamelco-dark/70 text-sm mb-6">
          هل أنت متأكد من رغبتك في حذف هذا الجهاز من النظام؟ لا يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-shamelco-dark/70 bg-shamelco-dark/10 rounded-lg hover:bg-shamelco-dark/20"
          >
            تراجع
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={mutation.isPending}
            className="px-4 py-2 text-white bg-status-danger rounded-lg hover:bg-status-danger/90 disabled:opacity-50"
          >
            {mutation.isPending ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
        </div>
      </div>
    </div>
  );
};