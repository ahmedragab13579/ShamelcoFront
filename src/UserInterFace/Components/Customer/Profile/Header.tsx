import type { CustomerProfileDto } from "../../../../BackEndIntegration/Types/Customer/Response";
import { useRef } from "react";
import { Camera } from "lucide-react"; 
import defaultAvatar from "../../../Images/avataricon.png";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

export default function Header({ 
  profileData, 
  setImagePreview, 
  imagePreview 
}: { 
  profileData: CustomerProfileDto, 
  setImagePreview: (file: File) => void, 
  imagePreview: File | null 
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = imagePreview 
    ? URL.createObjectURL(imagePreview) 
    : (profileData?.imagePath || defaultAvatar);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(file);
    }
  };

  return (
    <div className="bg-shamelco-surface px-4 py-8 flex flex-col items-center justify-center rounded-b-[2.5rem] shadow-sm border-b border-shamelco-dark/10 mb-6">
      
      <div className="relative group mb-4 w-fit mx-auto">
        <img
          src={displayImage}
          alt={profileData?.fullName}
          className="w-28 h-28 rounded-full object-cover border-4 border-shamelco-bg shadow-md cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:border-shamelco-accent/30"
          onClick={handleImageClick}
        />
        
        <button 
          type="button" 
          onClick={handleImageClick}
          className="absolute bottom-1 start-1 flex items-center justify-center bg-shamelco-surface p-2 rounded-full border border-shamelco-dark/10 shadow-sm text-shamelco-dark/60 hover:text-shamelco-gold transition-colors cursor-pointer group-hover:bg-shamelco-dark/5 focus:outline-none z-10"
          aria-label={t('messages.CHANGE_PROFILE_IMAGE')}
        >
          <Camera className="w-4 h-4" />
        </button>

        <input
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-shamelco-darker tracking-tight">
          {profileData?.fullName || t('messages.SHAMELCO_USER')}
        </h1>
        <p className="text-sm font-medium text-shamelco-dark/70">
          {profileData?.email}
        </p>
      </div>
      
    </div>
  );
}