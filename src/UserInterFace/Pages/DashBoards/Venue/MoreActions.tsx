import { useState } from "react";
import { useParams } from "react-router-dom";
import type { GUID } from "../../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import { Users, UserPlus } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";
import { StaffList } from "./Staff/StaffList";
import { AddStaffModal } from "./Staff/AddStaffModal";
import { RevokeStaffModal } from "./Staff/RevokeStaffModal";

export const VenueMoreActionsPage = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffToRevoke, setStaffToRevoke] = useState<GUID | null>(null);
  const { t } = useLanguage();

  const parsedVenueId = asGUID(id || "00000000-0000-0000-0000-000000000000");

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-in fade-in duration-500">
      {/* الترويسة وأدوات التحكم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 pb-4 border-b border-shamelco-border">
        <div className="space-y-1 text-start">
          <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-shamelco-gold shrink-0" />
            <span>{t('messages.STAFF_MANAGEMENT')}</span>
          </h1>
          <p className="text-sm sm:text-base font-semibold text-shamelco-muted">
            {t('messages.STAFF_MANAGEMENT_DESC')}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker px-5 py-2.5 rounded-md font-black transition-all duration-200 shadow-gold active:scale-[0.98] cursor-pointer text-sm flex items-center justify-center gap-2 focus-visible:outline-shamelco-gold shrink-0"
        >
          <UserPlus className="w-5 h-5 shrink-0" />
          <span>{t('messages.ADD_NEW_STAFF_BTN')}</span>
        </button>
      </div>

      {/* قائمة الموظفين */}
      <StaffList 
        venueId={parsedVenueId} 
        onRevokeRequest={(staffId) => setStaffToRevoke(staffId)} 
      />

      {/* نافذة إضافة موظف */}
      {isAddModalOpen && (
        <AddStaffModal 
          venueId={parsedVenueId} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}

      {/* نافذة سحب الصلاحيات (الحذف) */}
      {staffToRevoke && (
        <RevokeStaffModal
          venueId={parsedVenueId}
          staffId={staffToRevoke}
          onClose={() => setStaffToRevoke(null)}
        />
      )}
    </div>
  );
};