import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    // استخدمت flex و items-center عشان الأيقونة والنص يكونوا على خط واحد بالظبط
    <div className="z-10 flex items-center gap-1 text-xs text-shamelco-dark/60 font-medium">
      <Copyright className="w-3.5 h-3.5" />
      <span>2026 Shamelco. جميع الحقوق محفوظة.</span>
    </div>
  );
}