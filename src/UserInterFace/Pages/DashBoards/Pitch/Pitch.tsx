import Error from "../../../Components/Common/Error";
import DataTable from "../../../Components/Common/DataTable";
import { usePitchDashboard } from "../../../Hooks/Pitch/usePitchDashboard";

export default function PitchDashboard() {
  const {
    pitchQuery,
    activeSessionsColumns,
    upcomingBookingsColumns,
    t,
  } = usePitchDashboard();

  if (pitchQuery.isLoading) {
    return <PitchDashboardSkeleton />;
  }

  if (pitchQuery.isError || !pitchQuery.data) {
    return <Error text={t('messages.ERROR_FETCHING_PITCH_DASHBOARD')} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-start bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-in fade-in duration-500">
      {/* الترويسة */}
      <div className="flex flex-col gap-1 pb-2 border-b border-shamelco-border/60">
        <h2 className="text-2xl sm:text-3xl font-black text-shamelco-darker tracking-tight">
          {t('messages.PITCH_OVERVIEW')}
        </h2>
        <p className="text-shamelco-muted text-sm sm:text-base font-semibold">
          {t('messages.PITCH_OVERVIEW_DESC')}
        </p>
      </div>

      {/* بطاقات الإحصائيات (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* كارت الإيرادات */}
        <div className="bg-shamelco-surface p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">
            {t('messages.DAILY_REVENUE_TOTAL')}
          </span>
          <span className="text-3xl font-black text-shamelco-darker">
            {pitchQuery.data.data.totalDailyRevenue}{" "}
            <span className="text-sm font-bold text-shamelco-accent dark:text-shamelco-sky">{t('messages.CURRENCY')}</span>
          </span>
        </div>

        {/* كارت الجلسات النشطة */}
        <div className="bg-shamelco-gold-soft p-6 rounded-lg border border-shamelco-gold/50 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-darker/80 block mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>{t('messages.ACTIVE_SESSIONS_NOW')}</span>
            <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
          </span>
          <span className="text-3xl font-black text-shamelco-gold dark:text-shamelco-gold-hover">
            {pitchQuery.data.data.activeSessions.length}
          </span>
        </div>

        {/* كارت الحجوزات القادمة */}
        <div className="bg-shamelco-surface p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between hover:border-shamelco-gold/50 transition-all duration-200">
          <span className="text-xs font-bold text-shamelco-muted block mb-2 uppercase tracking-wider">
            {t('messages.UPCOMING_BOOKINGS')}
          </span>
          <span className="text-3xl font-black text-shamelco-accent dark:text-shamelco-sky">
            {pitchQuery.data.data.upcomingBookings.length}
          </span>
        </div>
      </div>

      {/* قسم الجلسات النشطة */}
      <section aria-label="Active Sessions" className="bg-shamelco-surface p-4 sm:p-6 rounded-lg border border-shamelco-border shadow-sm space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-shamelco-darker flex items-center gap-2">
          <span>{t('messages.ACTIVE_SESSIONS')}</span>
          <span className="text-xl">⏱️</span>
        </h3>
        <div className="overflow-x-auto">
          <DataTable
            data={pitchQuery.data.data.activeSessions}
            columns={activeSessionsColumns}
            keyExtractor={(row) => row.id} 
          />
        </div>
      </section>

      {/* قسم الحجوزات القادمة */}
      <section aria-label="Upcoming Bookings" className="bg-shamelco-surface p-4 sm:p-6 rounded-lg border border-shamelco-border shadow-sm space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-shamelco-darker flex items-center gap-2">
          <span>{t('messages.UPCOMING_BOOKINGS')}</span>
          <span className="text-xl">📅</span>
        </h3>
        <div className="overflow-x-auto">
          <DataTable
            data={pitchQuery.data.data.upcomingBookings}
            columns={upcomingBookingsColumns}
            keyExtractor={(row) => row.bookingId} 
          />
        </div>
      </section>
    </div>
  );
}

function PitchDashboardSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-start bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-pulse">
      <div className="flex flex-col gap-2 pb-2 border-b border-shamelco-border/40">
        <div className="h-7 w-48 bg-shamelco-sand rounded-md" />
        <div className="h-4 w-72 bg-shamelco-sand/60 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-shamelco-surface p-6 rounded-lg border border-shamelco-border shadow-sm flex flex-col justify-between h-32">
            <div className="h-3 w-28 bg-shamelco-sand rounded-md" />
            <div className="h-8 w-20 bg-shamelco-sand rounded-md" />
          </div>
        ))}
      </div>

      <div className="bg-shamelco-surface p-6 rounded-lg border border-shamelco-border shadow-sm space-y-4">
        <div className="h-6 w-40 bg-shamelco-sand rounded-md" />
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-shamelco-sand/40 border border-shamelco-border/40 rounded-md" />
          ))}
        </div>
      </div>

      <div className="bg-shamelco-surface p-6 rounded-lg border border-shamelco-border shadow-sm space-y-4">
        <div className="h-6 w-40 bg-shamelco-sand rounded-md" />
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-shamelco-sand/40 border border-shamelco-border/40 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}