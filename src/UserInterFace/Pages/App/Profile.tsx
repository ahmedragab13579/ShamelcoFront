import { useState } from "react";
import Error from "../../Components/Common/Error";
import Loading from "../../Components/Common/Loading";
import BookingsTab from "../../Components/Customer/Profile/BookingsTab";
import Header from "../../Components/Customer/Profile/Header";
import MainTabs from "../../Components/Customer/Profile/MainTabs";
import { PersonalInformationTab } from "../../Components/Customer/Profile/PersonalInformationTab";
import { useProfile } from "../../Hooks/Customer/useProfile";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Profile() {
  const { 
    profileData, 
    isLoading, 
    isError, 
    activeTab, 
    setActiveTab, 
    handleLogOut, 
    userId,
    isLoggingOut 
  } = useProfile();
  
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const { t } = useLanguage();

  if (isLoggingOut) {
    return <Loading text={t('messages.LOGGING_OUT')} />;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !profileData || !userId) {
    return <Error text={t('messages.ERROR_FETCHING_PROFILE')} />;
  }

  return (
    // استخدام خلفية النظام المريحة للعين مع ضبط المسافات العلوية والسفلية
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 bg-shamelco-bg min-h-screen font-sans animate-fade-in selection:bg-shamelco-gold selection:text-shamelco-darker">
      
      {/* الهيدر العلوي الخاص بالمستخدم (الصورة والأسم) */}
      <Header 
        profileData={profileData} 
        setImagePreview={setImagePreview} 
        imagePreview={imagePreview} 
      />
      
      {/* منطقة المحتوى الرئيسية */}
      <div className="px-4 sm:px-6 mt-6">
        {/* التبويبات الرئيسية (الـ Tabs) */}
        <MainTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* حاوية المحتوى المتغير بناءً على التبويب النشط */}
        <div className="mt-6 transition-all duration-300">
          {activeTab === "info" && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <PersonalInformationTab 
                image={imagePreview}
                profileData={profileData} 
                handleLogOut={handleLogOut} 
              />
            </div>
          )}
          
          {(activeTab === "pitches" || activeTab === "venues") && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <BookingsTab 
                profileData={profileData} 
                activeTab={activeTab} 
              />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 bg-shamelco-bg min-h-screen font-sans animate-fade-in">
      
      {/* الهيدر الهيكلي */}
      <div className="bg-shamelco-surface px-4 py-8 flex flex-col items-center justify-center rounded-b-[2.5rem] shadow-sm border-b border-shamelco-border mb-6 animate-pulse">
        <div className="w-28 h-28 rounded-full bg-shamelco-border dark:bg-shamelco-dark/40 border-4 border-shamelco-bg shadow-md" />
        <div className="h-6 w-44 bg-shamelco-border dark:bg-shamelco-dark/60 rounded-md mt-4" />
        <div className="h-4 w-52 bg-shamelco-border/70 dark:bg-shamelco-dark/40 rounded-md mt-2" />
      </div>

      {/* المحتوى الهيكلي الرئيسي */}
      <div className="px-4 sm:px-6 mt-6 space-y-6 animate-pulse">
        
        {/* تبويبات هيكلية */}
        <div className="flex gap-2 max-w-md mx-auto bg-shamelco-surface p-1.5 rounded-2xl border border-shamelco-border shadow-sm">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 flex-1 bg-shamelco-sand dark:bg-shamelco-dark/30 rounded-xl" />
          ))}
        </div>

        {/* كارت البيانات الأساسية الهيكلي */}
        <div className="bg-shamelco-surface p-6 rounded-3xl border border-shamelco-border shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-shamelco-border dark:bg-shamelco-dark/60 rounded-md" />
            <div className="h-7 w-28 bg-shamelco-border/70 dark:bg-shamelco-dark/40 rounded-lg" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="h-3 w-16 bg-shamelco-border/60 dark:bg-shamelco-dark/40 rounded-md mb-2" />
              <div className="h-12 w-full bg-shamelco-sand dark:bg-shamelco-dark/20 rounded-xl border border-shamelco-border/50" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-3 w-20 bg-shamelco-border/60 dark:bg-shamelco-dark/40 rounded-md mb-2" />
                <div className="h-12 w-full bg-shamelco-sand dark:bg-shamelco-dark/20 rounded-xl border border-shamelco-border/50" />
              </div>
              <div>
                <div className="h-3 w-16 bg-shamelco-border/60 dark:bg-shamelco-dark/40 rounded-md mb-2" />
                <div className="h-12 w-full bg-shamelco-sand dark:bg-shamelco-dark/20 rounded-xl border border-shamelco-border/50" />
              </div>
            </div>
          </div>
        </div>

        {/* زر تسجيل خروج هيكلي */}
        <div className="h-14 w-full bg-shamelco-surface dark:bg-shamelco-dark/10 rounded-3xl border-2 border-shamelco-border" />
        
      </div>
    </div>
  );
}