import { useState } from "react";
import Error from "../../Components/Common/Error";
import Loading from "../../Components/Common/Loading";
import BookingsTab from "../../Components/Customer/Profile/BookingsTab";
import Header from "../../Components/Customer/Profile/Header";
import MainTabs from "../../Components/Customer/Profile/MainTabs";
import { PersonalInformationTab } from "../../Components/Customer/Profile/PersonalInformationTab";
import { useProfile } from "../../Hooks/Customer/useProfile";

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

  if (isLoggingOut) {
    return <Loading text="جارِ تسجيل الخروج..." />;
  }

  if (isLoading) {
    return <Loading text="جارِ تحميل البيانات..." />;
  }

  if (isError || !profileData || !userId) {
    return <Error text="حدث خطأ أثناء جلب بيانات الملف الشخصي." />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto pb-12 bg-shamelco-bg min-h-screen">
      <Header 
        profileData={profileData} 
        setImagePreview={setImagePreview} 
        imagePreview={imagePreview} 
      />
      
      <div className="px-4">
        <MainTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "info" && (
            <PersonalInformationTab 
              image={imagePreview}
              profileData={profileData} 
              handleLogOut={handleLogOut} 
            />
          )}
          
          {(activeTab === "pitches" || activeTab === "venues") && (
            <BookingsTab 
              profileData={profileData} 
              activeTab={activeTab} 
            />
          )}
        </div>
      </div>
    </div>
  );
}