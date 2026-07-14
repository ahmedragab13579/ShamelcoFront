import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const currentLang = (i18n.language || 'ar').substring(0, 2) as 'ar' | 'en';
  const isRtl = currentLang === 'ar';

  const changeLanguage = (lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    changeLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isRtl]);

  return {
    t,                // دالة الترجمة الرئيسية
    i18n,             // أداة التحكم الـ i18n
    currentLang,      // اللغة الحالية ('ar' أو 'en')
    isRtl,            // true لو عربي، false لو إنجليزي
    toggleLanguage,   // التبديل بضغطة زرار
    changeLanguage,   // التغيير المباشر
  };
};