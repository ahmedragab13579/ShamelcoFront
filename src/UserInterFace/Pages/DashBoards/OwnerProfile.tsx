import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type OwnerProfileDto from "../../../BackEndIntegration/Types/Owner/Response";
import { useGetOwnerProfile } from "../../../BackEndIntegration/Hooks/Queries/UseOwnerQueries";
import type { UpdateOwnerProfileCommand } from "../../../BackEndIntegration/Types/Owner/Request";
import { SharedInput } from "../../Components/Common/SharedInput";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import { useAuth } from "../../../Context/Auth/AuthContext";
import Error from "../../Components/Common/Error";
import { useUpdateOwnerProfile } from "../../../BackEndIntegration/Hooks/Mutations/UseOwnerMutations";
import { Camera, Loader2 } from "lucide-react";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface OwnerProfileFormProps {
  initialData: OwnerProfileDto;
}

const OwnerProfileForm: React.FC<OwnerProfileFormProps> = ({ initialData }) => {
  const { mutate: updateProfile, isPending } = useUpdateOwnerProfile();
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.imagePath || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const defaultValues = useMemo<UpdateOwnerProfileCommand>(() => ({
    id: initialData.id,
    fullName: initialData.fullName,
    email: initialData.email,
    phoneNumber: initialData.phoneNumber,
    businessName: initialData.businessName, 
    taxNumber: initialData.taxNumber,
  }), [initialData]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateOwnerProfileCommand>({
    defaultValues,
    values: defaultValues, 
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file, { shouldDirty: true });
    }
  };

  const onSubmit = (data: UpdateOwnerProfileCommand) => {
    updateProfile(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto mt-6 sm:mt-8 text-start font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black mb-8 text-shamelco-darker tracking-tight">
        {t('messages.OWNER_SETTINGS_TITLE')}
      </h2>
      
      {/* قسم رفع الصورة الشخصية - مجهز 100% للـ Dark Mode بدون حدود بيضاء صريحة */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-32 h-32 bg-shamelco-sand rounded-full overflow-hidden border-4 border-shamelco-surface shadow-md mb-2 group shrink-0">
          {imagePreview ? (
            <img src={imagePreview} alt={t('messages.NAME') || "Profile"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-shamelco-muted font-bold text-sm bg-shamelco-sand">
              {t('messages.NO_IMAGE')}
            </div>
          )}
          
          <div 
            className="absolute inset-0 bg-shamelco-darker/60 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-shamelco-surface gap-1.5 focus-visible:opacity-100"
            onClick={() => fileInputRef.current?.click()}
            title={t('messages.CHANGE_IMAGE') || "تغيير الصورة"}
          >
            <Camera className="w-6 h-6 text-shamelco-gold transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs font-bold tracking-wide">{t('messages.CHANGE_IMAGE')}</span>
          </div>
        </div>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SharedInput label={t('messages.FULL_NAME')} error={errors.fullName?.message} {...register("fullName")} />
        <SharedInput label={t('messages.EMAIL_LABEL')} type="email" error={errors.email?.message} {...register("email")} />
        <SharedInput label={t('messages.PHONE_LABEL')} type="tel" error={errors.phoneNumber?.message} {...register("phoneNumber")} />
        <SharedInput label={t('messages.BUSINESS_NAME')} error={errors.businessName?.message} {...register("businessName")} />
        <SharedInput label={t('messages.TAX_NUMBER')} error={errors.taxNumber?.message} {...register("taxNumber")} />
      </div>

      <div className="mt-8 pt-6 border-t border-shamelco-border flex justify-end">
        {/* تعديل زرار الحفظ ليكون باللون الذهبي المميز (Primary Action) */}
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-8 py-3.5 rounded-md font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] focus-visible:outline-shamelco-gold shrink-0 min-w-[160px]
            ${!isDirty || isPending 
              ? "bg-shamelco-border text-shamelco-muted cursor-not-allowed opacity-70 shadow-none" 
              : "bg-shamelco-gold hover:bg-shamelco-gold-hover text-shamelco-darker shadow-gold"}`}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-current shrink-0" aria-hidden="true" />
              <span>{t('messages.SAVING')}</span>
            </>
          ) : (
            <span>{t('messages.SAVE_CHANGES')}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default function OwnerSettingsPage() {
  const { user } = useAuth(); 
  const { t } = useLanguage();

  const ownerId = useMemo(() => asGUID(user?.userId || asGUID("00000000-0000-0000-0000-000000000000")), [user]);
  const { data, isLoading, isError } = useGetOwnerProfile(ownerId);

  if (isLoading) return <OwnerProfileSkeleton />;
  if (isError || !data?.data) return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  
  return (
    <div className="p-4 md:p-6 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center transition-colors duration-200">
      <div className="w-full">
        <OwnerProfileForm initialData={data.data} />
      </div>
    </div>
  );
}

// الـ Skeleton متوافق تماماً مع ألوان الـ Dark Mode بدون وميض أبيض
function OwnerProfileSkeleton() {
  return (
    <div className="p-4 md:p-6 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center font-sans transition-colors duration-200">
      <div className="w-full max-w-2xl bg-shamelco-surface rounded-lg border border-shamelco-border p-6 sm:p-8 space-y-8 animate-pulse shadow-md mt-6 sm:mt-8">
        <div className="h-7 w-48 bg-shamelco-sand rounded-md" />
        
        {/* هيرو الصورة الهيكلي */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-shamelco-sand border-4 border-shamelco-surface shadow-sm shrink-0" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
              <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-6 border-t border-shamelco-border">
          <div className="h-12 w-36 bg-shamelco-sand rounded-md" />
        </div>
      </div>
    </div>
  );
}