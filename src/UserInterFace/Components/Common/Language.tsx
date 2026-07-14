// src/components/Language.tsx
import { Globe } from 'lucide-react';
import { useLanguage } from '../../Hooks/Shared/useLanguage';

const Language = () => {
  const { currentLang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center text-gray-700 dark:text-gray-300 cursor-pointer"
      aria-label={currentLang === 'en' ? 'تغيير اللغة إلى العربية' : 'Change language to English'}
      title={currentLang === 'en' ? 'تغيير اللغة إلى العربية' : 'Change language to English'}
    >
      <Globe className="w-5 h-5" />
    </button>
  );
};

export default Language;