import type { GUID } from "../../../../../BackEndIntegration/Types/shared/Guid";
import type { VenueStaffDto } from "../../../../../BackEndIntegration/Types/Venues/Response";
import { UserX } from "lucide-react";
import { useStaffList } from "../../../../Hooks/Venue/useVenueMoreActions";

export const StaffList = ({ venueId, onRevokeRequest }: { venueId: GUID; onRevokeRequest: (id: GUID) => void }) => {
  const { staffList, isLoading, isError, t } = useStaffList(venueId);

  if (isLoading) return <p className="text-center text-shamelco-muted py-12 animate-pulse font-bold">{t('messages.LOADING_DATA')}</p>;
  if (isError) return <p className="text-center text-status-danger font-semibold py-12">{t('messages.ERROR_FETCHING_STAFF')}</p>;

  return (
    <div className="bg-shamelco-surface rounded-lg border border-shamelco-border shadow-sm overflow-x-auto transition-colors duration-200">
      <table className="min-w-full text-start border-collapse">
        <thead className="bg-shamelco-sand/40 border-b border-shamelco-border">
          <tr>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.NAME')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.EMAIL_LABEL')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.ROLE')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.STATUS')}</th>
            <th className="p-4 text-shamelco-muted font-bold text-xs uppercase tracking-wider">{t('messages.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-shamelco-border/60">
          {staffList.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-shamelco-muted font-semibold">
                {t('messages.NO_STAFF_YET')}
              </td>
            </tr>
          ) : (
            staffList.map((staff: VenueStaffDto) => (
              <tr key={staff.staffId} className="hover:bg-shamelco-sand/20 transition-colors duration-150">
                <td className="p-4 font-bold text-shamelco-darker">{staff.fullName}</td>
                <td className="p-4 text-shamelco-muted font-semibold font-mono" dir="ltr">{staff.email}</td>
                <td className="p-4">
                  <span className="bg-shamelco-accent/10 dark:bg-shamelco-sky-soft text-shamelco-accent dark:text-shamelco-sky border border-shamelco-accent/20 px-3 py-1 rounded-full text-xs font-bold inline-block">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4">
                  {staff.isActive ? (
                    <span className="bg-status-success/15 text-status-success border border-status-success/20 px-3 py-1 rounded-full text-xs font-bold inline-block shadow-2xs">
                      {t('messages.ACTIVE')}
                    </span>
                  ) : (
                    <span className="bg-status-danger/10 text-status-danger border border-status-danger/20 px-3 py-1 rounded-full text-xs font-bold inline-block">
                      {t('messages.INACTIVE')}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onRevokeRequest(staff.staffId)}
                    className="text-status-danger hover:text-status-danger/80 font-bold text-xs cursor-pointer flex items-center gap-1 underline decoration-status-danger/40 underline-offset-4 transition-colors focus-visible:outline-status-danger rounded"
                  >
                    <UserX className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('messages.REVOKE_PERMISSION')}</span>
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
