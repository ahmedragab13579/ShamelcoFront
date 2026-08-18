import { Link } from "react-router-dom";
import { Copyright, ShieldCheck, Mail, Phone, MapPin, Trophy } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-shamelco-gold font-black text-2xl tracking-wider">
              <Trophy className="w-7 h-7 text-shamelco-gold" />
              <span>SHAMELCO</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("messages.FOOTER_BRAND_DESC") || "Premier PaaS platform for sports pitches, gaming lounges, Playstation lounges & cafe entertainment venues."}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t("messages.PAYMOB_SECURED") || "Paymob Secured Gateway"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t("messages.QUICK_LINKS") || "Quick Links"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/home" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.HOME") || "Home"}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.EXPLORE_PLACES")}
                </Link>
              </li>
              <li>
                <Link to="/pitches" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.PITCHES") || "Sports Pitches"}
                </Link>
              </li>
              <li>
                <Link to="/venues" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.VENUES") || "Gaming & Venues"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links (Mandatory for Paymob) */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t("messages.LEGAL_COMPLIANCE") || "Legal & Compliance"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.ABOUT_US") || "About Us"}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.CONTACT_US") || "Contact Us"}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.PRIVACY_POLICY") || "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-shamelco-gold transition-colors">
                  {t("messages.REFUND_POLICY") || "Refund & Cancellation Policy"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t("messages.CONTACT_US") || "Contact Us"}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-shamelco-gold shrink-0" />
                <a href="mailto:shamelco.works@gmail.com" className="hover:text-white transition-colors break-all">
                  shamelco.works@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-shamelco-gold shrink-0" />
                <a href="https://wa.me/201111471927" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +20 111 147 1927
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-shamelco-gold shrink-0" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Copyright className="w-4 h-4" />
            <span>{new Date().getFullYear()} Shamelco PaaS. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:underline">Refunds</Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
