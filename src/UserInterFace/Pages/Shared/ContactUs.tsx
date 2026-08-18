import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function ContactUs() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-shamelco-bg py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-shamelco-darker via-shamelco-dark to-shamelco-accent text-white p-8 md:p-12 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Mail className="w-64 h-64 text-shamelco-gold" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t("messages.CONTACT_US_TITLE") || "Contact Us"}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-medium">
            {t("messages.CONTACT_US_SUBTITLE") || "We're here to help! Reach out to the Shamelco team for inquiries, support, or feedback."}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Support Email Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t("messages.WORK_EMAIL") || "Work & Support Email"}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {t("messages.WORK_EMAIL_DESC") || "For official inquiries, support, and business communications."}
              </p>
              <a 
                href="mailto:shamelco.works@gmail.com" 
                className="text-shamelco-accent font-semibold hover:underline text-base break-all"
              >
                shamelco.works@gmail.com
              </a>
            </div>
          </div>

          {/* Personal Contact Email Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="p-3.5 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t("messages.PERSONAL_EMAIL") || "Direct Contact Email"}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {t("messages.PERSONAL_EMAIL_DESC") || "For direct contact with management and developer relations."}
              </p>
              <a 
                href="mailto:ahmedharidy2019@gmail.com" 
                className="text-shamelco-accent font-semibold hover:underline text-base break-all"
              >
                ahmedharidy2019@gmail.com
              </a>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="p-3.5 bg-green-50 rounded-xl text-green-600 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t("messages.PHONE_WHATSAPP") || "Phone & WhatsApp Support"}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {t("messages.PHONE_DESC") || "Available for immediate support and chat assistance."}
              </p>
              <a 
                href="https://wa.me/201111471927" 
                target="_blank" 
                rel="noreferrer"
                className="text-emerald-700 font-bold hover:underline text-lg block"
              >
                +20 111 147 1927
              </a>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="p-3.5 bg-amber-50 rounded-xl text-amber-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t("messages.BUSINESS_ADDRESS") || "Business Address"}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {t("messages.ADDRESS_DESC") || "Headquarters location for operations."}
              </p>
              <p className="text-slate-800 font-semibold text-base">
                Cairo, Egypt 🇪🇬
              </p>
            </div>
          </div>
        </div>

        {/* Operating Hours Info */}
        <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-shamelco-gold" />
            <div>
              <h4 className="font-bold text-white text-base">
                {t("messages.WORKING_HOURS_TITLE") || "Customer Support Hours"}
              </h4>
              <p className="text-sm text-slate-400">
                {t("messages.WORKING_HOURS") || "Sunday – Thursday: 9:00 AM – 9:00 PM (EET)"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{t("messages.RESPONSE_TIME") || "Fast Response via WhatsApp"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
