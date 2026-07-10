import React, { useState } from "react";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import { useGetVenuesStaff } from "../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { VenueStaffDto } from "../../../../BackEndIntegration/Types/Venues/Response";
import type { VenueStaffRole } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import { useParams } from "react-router-dom";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import type FailResult from "../../../../BackEndIntegration/Types/Result/Fail";
import { useAddStaffMutation, useRevokeStaffMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";


export  const VenueMoreActionsPage = () => {
  const{ id} = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffToRevoke, setStaffToRevoke] = useState<GUID | null>(null);

  return (
    <div className="p-6 bg-shamelco-bg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-shamelco-darker">إدارة طاقم العمل</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-shamelco-accent text-white px-4 py-2 rounded-lg hover:bg-shamelco-accent/90 transition"
        >
          + إضافة موظف جديد
        </button>
      </div>

      {/* قائمة الموظفين */}
      <StaffList venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")} onRevokeRequest={(staffId) => setStaffToRevoke(staffId)} />

      {/* نافذة إضافة موظف */}
      {isAddModalOpen && (
        <AddStaffModal venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")} onClose={() => setIsAddModalOpen(false)} />
      )}

      {/* نافذة سحب الصلاحيات (الحذف) */}
      {staffToRevoke && (
        <RevokeStaffModal
          venueId={asGUID(id||"00000000-0000-0000-0000-000000000000")}
          staffId={staffToRevoke}
          onClose={() => setStaffToRevoke(null)}
        />
      )}
    </div>
  );
};


const StaffList = ({ venueId, onRevokeRequest }: { venueId: GUID; onRevokeRequest: (id: GUID) => void }) => {
  // إعدادات الـ Pagination المبدئية (يمكنك ربطها بـ State لتغيير الصفحات)
  const [pagination] = useState({ page: 1, pageSize: 10 });

  const { data, isLoading, isError } = useGetVenuesStaff({
    Id: venueId,
    params: pagination,
  });

  if (isLoading) return <p className="text-center text-shamelco-dark/60">جاري تحميل البيانات...</p>;
  if (isError) return <p className="text-center text-status-danger">حدث خطأ أثناء جلب الموظفين.</p>;

  const staffList = data?.data?.items || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-right" dir="rtl">
        <thead className="bg-shamelco-bg border-b border-shamelco-dark/10">
          <tr>
            <th className="p-4 text-shamelco-dark/70 font-semibold">الاسم</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">البريد الإلكتروني</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">الدور (Role)</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">الحالة</th>
            <th className="p-4 text-shamelco-dark/70 font-semibold">إجراءات</th>
          </tr>
        </thead>
        <tbody>
           {staffList.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-shamelco-dark/60">لا يوجد موظفين حتى الآن.</td>
            </tr>
          ) : (
            staffList.map((staff: VenueStaffDto) => (
              <tr key={staff.staffId} className="border-b border-shamelco-dark/5 hover:bg-shamelco-dark/5">
                <td className="p-4">{staff.fullName}</td>
                <td className="p-4 text-shamelco-dark/70">{staff.email}</td>
                <td className="p-4">
                  <span className="bg-shamelco-accent/10 text-shamelco-accent px-2 py-1 rounded-full text-sm">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4">
                  {staff.isActive ? (
                    <span className="text-status-success font-medium">نشط</span>
                  ) : (
                    <span className="text-status-danger font-medium">غير نشط</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onRevokeRequest(staff.staffId)}
                    className="text-status-danger hover:text-status-danger/90 font-medium"
                  >
                    حذف الصلاحية
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


const AddStaffModal = ({ venueId, onClose }: { venueId: GUID; onClose: () => void }) => {
  const { mutate, isError, isPending, error } = useAddStaffMutation();
  
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Role: "Cashier" as VenueStaffRole, 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { VenueId: venueId, ...formData },
      { onSuccess: () => onClose() }
    );
  };
  const errorMessage = (error as FailResult)?.error || (error as FailResult)?.error || "";

  return (
<div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4" dir="rtl">      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">إضافة موظف جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-dark mb-1">الاسم الكامل</label>
            <input
              required
              type="text"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.FullName}
              onChange={(e) => setFormData({ ...formData, FullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">البريد الإلكتروني</label>
            <input
              required
              type="email"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">كلمة المرور</label>
            <input
              required
              type="password"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">الدور الوظيفي</label>
            <select
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-shamelco-accent/20 focus:border-shamelco-accent"
              value={formData.Role}
              onChange={(e) => setFormData({ ...formData, Role: e.target.value as any })}
            >
              <option value="Cashier">كاشير (Cashier)</option>
              <option value="Manager">مدير (Manager)</option>
              <option value="Waiter">ويتر (Waiter)</option>
            </select>
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
              {isPending ? "جاري الإضافة..." : "حفظ الموظف"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RevokeStaffModal = ({ venueId, staffId, onClose }: { venueId: GUID; staffId: GUID; onClose: () => void }) => {
  const mutation = useRevokeStaffMutation();
  const [credentials, setCredentials] = useState({ Email: "", Password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { 
        VenueId: venueId, 
        StaffId: staffId, 
        Email: credentials.Email, 
        Password: credentials.Password 
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
<div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4" dir="rtl">      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 border-t-4 border-status-danger">
        <h2 className="text-xl font-bold text-status-danger mb-2">تأكيد سحب الصلاحيات</h2>
        <p className="text-shamelco-dark/70 text-sm mb-4">
          لأسباب أمنية، يرجى إدخال البريد الإلكتروني وكلمة المرور الخاصة بفرد فريق العمل المراد حذفه  لتأكيد حذف هذا الموظف.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-shamelco-dark mb-1">البريد الإلكتروني</label>
            <input
              required
              type="email"
              placeholder="admin@example.com"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-status-danger/20 focus:border-status-danger"
              value={credentials.Email}
              onChange={(e) => setCredentials({ ...credentials, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-shamelco-dark mb-1">كلمة المرور</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full border border-shamelco-dark/20 rounded-lg p-2 focus:ring focus:ring-status-danger/20 focus:border-status-danger"
              value={credentials.Password}
              onChange={(e) => setCredentials({ ...credentials, Password: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-shamelco-dark/70 bg-shamelco-dark/10 rounded-lg hover:bg-shamelco-dark/20"
            >
              تراجع
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-white bg-status-danger rounded-lg hover:bg-status-danger/90 disabled:opacity-50"
            >
              {mutation.isPending ? "جاري التأكيد..." : "تأكيد الحذف"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};