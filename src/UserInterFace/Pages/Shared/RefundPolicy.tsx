import { RefreshCcw, AlertOctagon, Clock, CalendarX, CheckCircle, HelpCircle } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function RefundPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-shamelco-bg py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-shamelco-darker to-shamelco-dark text-white p-8 md:p-12 rounded-3xl shadow-xl text-center">
          <div className="inline-flex p-3 bg-amber-500/20 text-amber-400 rounded-2xl mb-4">
            <RefreshCcw className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("messages.REFUND_POLICY_TITLE") || "Refund & Cancellation Policy"}
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {t("messages.REFUND_SUBTITLE") || "Clear and fair rules regarding booking cancellations, rescheduling, and refund eligibility."}
          </p>
        </div>

        {/* Highlight Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rule 1: Paid Booking Non-Cancellation */}
          <div className="bg-rose-50 border-2 border-rose-200 p-6 md:p-8 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="p-3 bg-rose-500 text-white rounded-2xl shrink-0">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-950 mb-2">
                {t("messages.PAID_BOOKING_RULE_TITLE") || "Paid Bookings Policy"}
              </h3>
              <p className="text-rose-900 font-medium text-sm leading-relaxed">
                {t("messages.PAID_BOOKING_RULE_MSG") || "Once a online payment is completed for a booking, paid funds are non-refundable. Paid bookings cannot be cancelled for cash refunds once finalized."}
              </p>
            </div>
          </div>

          {/* Rule 2: Notice Requirement */}
          <div className="bg-amber-50 border-2 border-amber-200 p-6 md:p-8 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-950 mb-2">
                {t("messages.CANCELLATION_WINDOW_TITLE") || "Cancellation & Rescheduling Notice"}
              </h3>
              <p className="text-amber-900 font-medium text-sm leading-relaxed">
                {t("messages.CANCELLATION_WINDOW_MSG") || "Sports pitch bookings require at least 72 hours (3 days) notice. Entertainment venue (cafe & lounge) bookings require at least 24 hours notice prior to the appointment time."}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarX className="w-5 h-5 text-shamelco-accent" />
              1. Cancellation & Rescheduling Rules
            </h3>
            <ul className="list-disc list-inside space-y-2.5 text-slate-600 pl-4">
              <li>
                <strong className="text-slate-800">Sports Pitches (Football, Padel, etc.):</strong> Modifications, slot rescheduling, or cancellations must be requested at least <strong>72 hours (3 days)</strong> before the scheduled appointment.
              </li>
              <li>
                <strong className="text-slate-800">Entertainment Venues (Cafes, Gaming Lounges, Playstation Tables):</strong> Modifications, slot rescheduling, or cancellations must be requested at least <strong>24 hours</strong> before the scheduled appointment.
              </li>
              <li>
                <strong className="text-slate-800">Confirmed Paid Bookings:</strong> Online payments processed via Paymob are non-refundable for cash/card returns once confirmed. However, slot rescheduling remains available within the eligible 24h/72h window.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-shamelco-accent" />
              2. Facility Blackout or Venue Issues
            </h3>
            <p>
              In the rare event that a venue or pitch facility is unavailable due to maintenance blackout or force majeure, the venue manager will contact you to reschedule your slot or process an administrative refund. Approved administrative refunds are credited back to the original card within 7–14 business days via Paymob.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-shamelco-accent" />
              3. Need Assistance?
            </h3>
            <p>
              If you have any questions regarding your booking status or need help rescheduling, please reach out to customer support at{" "}
              <a href="mailto:shamelco.works@gmail.com" className="text-shamelco-accent font-bold hover:underline">
                shamelco.works@gmail.com
              </a>{" "}
              or via WhatsApp at <strong className="text-slate-900">+20 111 147 1927</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
