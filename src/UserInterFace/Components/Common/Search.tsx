import React from 'react';
import { Search } from 'lucide-react'; // استبدال الـ SVG بأيقونة من المكتبة
import type { PlaceType } from '../../../BackEndIntegration/Types/Enums/AppEnums';
import { useLanguage } from '../../Hooks/Shared/useLanguage';

export interface SearchBarProps {
  value: string;
  activePlaceType?: PlaceType;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  className = ""
}: SearchBarProps) {
  const { t } = useLanguage();
  const defaultPlaceholder = placeholder || t('messages.SEARCH_PLACEHOLDER');

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        // البوردر الديفولت خفيف، ولما اليوزر يضغط (focus) البوردر والـ ring بياخدوا لون الـ Accent (الأزرق البترولي)
        className="flex items-center bg-shamelco-surface border border-shamelco-border rounded-2xl p-2 shadow-sm focus-within:border-shamelco-accent focus-within:ring-2 focus-within:ring-shamelco-accent/20 transition-all duration-300"
      >
        {/* أيقونة البحث بلون هادي */}
        <div className="flex items-center justify-center ps-3 pe-2 text-shamelco-muted">
          <Search className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={defaultPlaceholder}
          // النص الأساسي واخد أغمق لون، والـ Placeholder واخد لون شفاف ومقري
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-shamelco-darker placeholder:text-shamelco-muted outline-none w-full py-2"
        />
        
        <button
          type="submit"
          // زرار الأكشن: خلفية ذهبي مع نص كحلي داكن للتفاعل المباشر
          className="bg-shamelco-gold text-shamelco-darker text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-shamelco-gold-hover transition-colors shrink-0 active:scale-95 shadow-sm"
        >
          {t('messages.SEARCH')}
        </button>
      </form>
    </div>
  );
}