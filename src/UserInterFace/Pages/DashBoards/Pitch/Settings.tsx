import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { PitchDto } from "../../../../BackEndIntegration/Types/Pitch/Response";
import { useGetPitch } from "../../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import type { UpdatePitchCommand } from "../../../../BackEndIntegration/Types/Pitch/Request";
import { useParams } from "react-router-dom";
import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../../../Components/Common/SharedInput";
import Error from "../../../Components/Common/Error";
import { useUpdatePitchMutation } from "../../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";
import { Loader2, Camera } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface PitchSettingsFormProps {
  initialData: PitchDto;
}

const PitchSettingsForm: React.FC<PitchSettingsFormProps> = ({ initialData }) => {
  const { mutate: updatePitch, isPending } = useUpdatePitchMutation();
  const { t } = useLanguage();
  
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.mainImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const defaultValues = useMemo<UpdatePitchCommand>(() => ({
    id: initialData.id,
    name: initialData.name,
    type: initialData.type,
    capacity: initialData.capacity,
    open: initialData.openIn,
    close: initialData.closeIn,
    newRate: initialData.hourlyRate,
    address: initialData.address,
  }), [initialData]); 

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, errors },
  } = useForm<UpdatePitchCommand>({
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

  const onSubmit = (data: UpdatePitchCommand) => {
    updatePitch(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto text-start font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <h2 className="text-2xl sm:text-3xl font-black mb-6 text-shamelco-darker tracking-tight">
        {t('messages.PITCH_SETTINGS_TITLE')}
      </h2>
      
      {/* قسم تغيير صورة الملعب - حواف موحدة وتظبيط الـ Overlay للـ Dark Mode */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-full h-52 sm:h-60 bg-shamelco-sand rounded-md overflow-hidden border border-shamelco-border mb-2 group shadow-sm shrink-0">
          {imagePreview ? (
            <img src={imagePreview} alt={t('messages.PITCH_NAME') || "Pitch"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-shamelco-muted font-bold text-sm bg-shamelco-sand">
              {t('messages.NO_IMAGE')}
            </div>
          )}
          
          <div 
            className="absolute inset-0 bg-shamelco-darker/60 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-shamelco-surface gap-2 focus-visible:opacity-100"
            onClick={() => fileInputRef.current?.click()}
            title={t('messages.CHANGE_PITCH_IMAGE') || "تغيير صورة الملعب"}
          >
            <Camera className="w-8 h-8 text-shamelco-gold transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">{t('messages.CHANGE_PITCH_IMAGE')}</span>
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

      {/* حقول الإدخال مع مسافات مريحة وتوزيع Grid متناسق */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SharedInput label={t('messages.PITCH_NAME')} error={errors.name?.message} {...register("name")} />
        <SharedInput label={t('messages.ADDRESS')} error={errors.address?.message} {...register("address")} />
        <SharedInput label={t('messages.CAPACITY_PLAYERS')} type="number" error={errors.capacity?.message} {...register("capacity")}/>
        <SharedInput label={t('messages.HOURLY_RATE')} type="number" error={errors.newRate?.message} {...register("newRate")}/>
        <SharedInput label={t('messages.OPEN_TIME')} type="time" error={errors.open?.message} {...register("open")}/>
        <SharedInput label={t('messages.CLOSE_TIME')} type="time" error={errors.close?.message} {...register("close")}/>
      </div>

      {/* زرار الحفظ - توظيف اللون الذهبي للأكشن مع فاصل بصري */}
      <div className="mt-8 pt-6 border-t border-shamelco-border flex justify-end">
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

export default function PitchSettingsPage() {
  const { id } = useParams(); 
  const { t } = useLanguage();
  
  const pitchId = useMemo(() => asGUID(id || "00000000-0000-0000-0000-000000000000"), [id]);
  const { data, isLoading, isError } = useGetPitch(pitchId);

  if (isLoading) return <PitchSettingsSkeleton />;
  if (isError || !data?.data) return <Error text={t('messages.ERROR_FETCHING_DATA')} />;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center transition-colors duration-200">
      <div className="w-full">
        <PitchSettingsForm initialData={data.data} />
      </div>
    </div>
  );
};

// الـ Skeleton متوافق تماماً مع الحواف الجديدة والألوان بدون ומيض أبيض في الغامق
function PitchSettingsSkeleton() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center font-sans transition-colors duration-200">
      <div className="w-full max-w-2xl bg-shamelco-surface border border-shamelco-border rounded-lg p-6 sm:p-8 space-y-8 animate-pulse shadow-md">
        <div className="h-7 w-44 bg-shamelco-sand rounded-md" />
        
        {/* هيدر صورة الملعب الهيكلي */}
        <div className="w-full h-52 sm:h-60 bg-shamelco-sand rounded-md border border-shamelco-border/40" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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