import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../../../Components/Common/SharedInput";
import Error from "../../../Components/Common/Error";
import type { VenueDto } from "../../../../BackEndIntegration/Types/Venues/Response";
import { useGetVenue } from "../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { UpdateVenueCommand } from "../../../../BackEndIntegration/Types/Venues/Request";
import { useUpdateVenueMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { Loader2, Camera } from "lucide-react";
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

interface VenueSettingsFormProps {
  initialData: VenueDto;
}

const VenueSettingsForm: React.FC<VenueSettingsFormProps> = ({ initialData }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.mainImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateVenue, isPending } = useUpdateVenueMutation();
  const { t } = useLanguage();

  const defaultValues = useMemo<UpdateVenueCommand>(() => ({
    Id: initialData.id,
    name: initialData.name,
    Address: initialData.address,
    OpenIn: initialData.openIn,
    CloseIn: initialData.closeIn,
    hourRate: initialData.hourRate
  }), [initialData]); 

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, errors },
  } = useForm<UpdateVenueCommand>({
    defaultValues,
    values: defaultValues, 
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("MainImage", file, { shouldDirty: true });
    }
  };

  const onSubmit = (data: UpdateVenueCommand) => {
    updateVenue(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 bg-shamelco-surface rounded-lg shadow-md border border-shamelco-border max-w-2xl mx-auto text-start font-sans transition-colors duration-200 animate-in fade-in duration-500">
      <h2 className="text-2xl sm:text-3xl font-black mb-6 text-shamelco-darker tracking-tight">
        {t('messages.VENUE_SETTINGS_TITLE')}
      </h2>
      
      {/* قسم تغيير صورة الصالة - حواف موحدة وتظبيط الـ Overlay للـ Dark Mode */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-full h-52 sm:h-60 bg-shamelco-sand rounded-md overflow-hidden border border-shamelco-border mb-2 group shadow-sm shrink-0">
          {imagePreview ? (
            <img src={imagePreview} alt={t('messages.NAME') || "Venue"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-shamelco-muted font-bold text-sm bg-shamelco-sand">
              {t('messages.NO_IMAGE')}
            </div>
          )}
          
          <div 
            className="absolute inset-0 bg-shamelco-darker/60 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-shamelco-surface gap-2 focus-visible:opacity-100"
            onClick={() => fileInputRef.current?.click()}
            title={t('messages.CHANGE_VENUE_IMAGE') || "تغيير صورة الصالة"}
          >
            <Camera className="w-8 h-8 text-shamelco-gold transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">{t('messages.CHANGE_VENUE_IMAGE')}</span>
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
        <SharedInput label={t('messages.NAME')} error={errors.name?.message} {...register("name")} />
        <SharedInput label={t('messages.ADDRESS')} error={errors.Address?.message} {...register("Address")} />
        <SharedInput label={t('messages.OPEN_TIME')} type="time" error={errors.OpenIn?.message} {...register("OpenIn")}/>
        <SharedInput label={t('messages.CLOSE_TIME')} type="time" error={errors.CloseIn?.message} {...register("CloseIn")}/>
        <div className="md:col-span-2">
          <SharedInput label={t('messages.HOURLY_TABLE_RATE')} min={0} type="number" error={errors.hourRate?.message} {...register("hourRate")}/>
        </div>
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

export default function VenueSettingsPage() {
  const { id } = useParams(); 
  const { t } = useLanguage();
  
  const venueId = useMemo(() => asGUID(id || "00000000-0000-0000-0000-000000000000"), [id]);
  const { data, isLoading, isError } = useGetVenue(venueId);

  if (isLoading) return <VenueSettingsSkeleton />;
  if (isError || !data?.data) return <Error text={t('messages.ERROR_FETCHING_DATA')} />;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center transition-colors duration-200">
      <div className="w-full">
        <VenueSettingsForm initialData={data.data} />
      </div>
    </div>
  );
}

// الـ Skeleton متوافق تماماً مع الحواف الجديدة والألوان بدون وميض أبيض في الغامق
function VenueSettingsSkeleton() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex items-start justify-center font-sans transition-colors duration-200">
      <div className="w-full max-w-2xl bg-shamelco-surface border border-shamelco-border rounded-lg p-6 sm:p-8 space-y-8 animate-pulse shadow-md">
        <div className="h-7 w-44 bg-shamelco-sand rounded-md" />
        
        {/* هيدر صورة الصالة الهيكلي */}
        <div className="w-full h-52 sm:h-60 bg-shamelco-sand rounded-md border border-shamelco-border/40" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
              <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <div className="h-4 w-24 bg-shamelco-sand rounded-md" />
            <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
          </div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-shamelco-border">
          <div className="h-12 w-36 bg-shamelco-sand rounded-md" />
        </div>
      </div>
    </div>
  );
}