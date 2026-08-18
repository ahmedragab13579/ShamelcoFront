import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-shamelco-bg py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-shamelco-darker via-slate-900 to-shamelco-dark text-white p-8 md:p-12 rounded-3xl shadow-xl text-center">
          <div className="inline-flex p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl mb-4">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("messages.PRIVACY_POLICY_TITLE") || "Privacy Policy"}
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {t("messages.PRIVACY_LAST_UPDATED") || "Last Updated: August 2026. Your privacy and data security are our top priorities."}
          </p>
        </div>

        {/* Highlight Banner for Paymob Security Compliance */}
        <div className="bg-emerald-50 border-2 border-emerald-500/30 p-6 md:p-8 rounded-3xl shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-500 text-white rounded-2xl shrink-0">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <span>{t("messages.CARD_SECURITY_CLAUSE_TITLE") || "Mandatory Payment Security Disclosure"}</span>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </h2>
            <p className="text-emerald-950 font-semibold leading-relaxed text-base">
              {t("messages.CARD_SECURITY_CLAUSE") || "Shamelco strictly does NOT collect, process, or store any sensitive credit card details, debit card numbers, CVVs, or card expiration dates on our servers. All monetary transactions are processed exclusively through Paymob's 3D-Secure PCI-DSS Level 1 compliant payment gateway."}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-shamelco-accent" />
              1. Information We Collect
            </h3>
            <p>
              When you register an account or book a service through Shamelco, we collect minimal operational information required to fulfill your reservation:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-4">
              <li>Contact Details (Full Name, Email Address, Phone Number).</li>
              <li>Booking Details (Selected Pitch/Venue, Date, Time Slot, and Order ID).</li>
              <li>Technical Logs (IP Address, Device Browser type for authentication & fraud prevention).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-shamelco-accent" />
              2. How We Use Your Data
            </h3>
            <p>
              Your information is strictly used for platform service delivery:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-4">
              <li>Confirming and managing your venue or pitch bookings.</li>
              <li>Sending transaction receipts and real-time status notifications.</li>
              <li>Preventing unauthorized activity or double-booking conflicts.</li>
              <li>Providing customer support when you contact us.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-shamelco-accent" />
              3. Data Protection & Sharing
            </h3>
            <p>
              We do not sell, rent, or trade your personal information to third-party marketers. Information is only shared with authorized merchant partners (the specific venue owner where you booked) to facilitate your check-in, and with Paymob to verify payment authorization.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-shamelco-accent" />
              4. Contact Privacy Officer
            </h3>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request data modification, please contact us at:{" "}
              <a href="mailto:shamelco.works@gmail.com" className="text-shamelco-accent font-bold hover:underline">
                shamelco.works@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
