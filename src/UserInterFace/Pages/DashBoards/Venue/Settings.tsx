import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import asGUID from "../../../../BackEndIntegration/Types/shared/Guid";
import { SharedInput } from "../../../Components/Common/SharedInput";
import Loading from "../../../Components/Common/Loading";
import Error from "../../../Components/Common/Error";
import type { VenueDto } from "../../../../BackEndIntegration/Types/Venues/Response";
import { useGetVenue } from "../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { UpdateVenueCommand } from "../../../../BackEndIntegration/Types/Venues/Request";
import { useUpdateVenueMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";

interface VenueSettingsFormProps {
  initialData: VenueDto;
}

const VenueSettingsForm: React.FC<VenueSettingsFormProps> = ({ initialData }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.mainImage || null);
    const fileInputRef = useRef <HTMLInputElement>(null);
  const { mutate: updateVenue, isPending } = useUpdateVenueMutation();

  const defaultValues = useMemo<UpdateVenueCommand>(() => ({
    Id: initialData.id,
    name: initialData.name,
    Address: initialData.address,
    OpenIn: initialData.openIn,
    CloseIn: initialData.closeIn,
    hourRate:initialData.hourRate
  }), [
    initialData
  ]); 

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-shamelco-darker text-right">إعدادات المكان (Venue)</h2>
       <div className="mb-6 flex flex-col items-center">
              <div className="relative w-full h-48 bg-shamelco-bg rounded-xl overflow-hidden border-2 border-dashed border-shamelco-dark/20 mb-2 group">
                {imagePreview ? (
                  <img src={imagePreview} alt="صورة المحل " className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-shamelco-dark/40">
                    لا توجد صورة
                  </div>
                )}
                
                {/* طبقة شفافة تظهر عند التمرير (Hover) لتغيير الصورة */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="text-white font-semibold">تغيير صورة الملعب</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SharedInput label="الاسم" error={errors.name?.message} {...register("name")} />
        <SharedInput label="العنوان" error={errors.Address?.message} {...register("Address")} />
        <SharedInput label="وقت الفتح" type="time" error={errors.OpenIn?.message} {...register("OpenIn")}/>
        <SharedInput label="وقت الإغلاق" type="time" error={errors.CloseIn?.message} {...register("CloseIn")}/>
        <SharedInput label="سعر الساعه للطاوله  " min={0} type="number" error={errors.hourRate?.message} {...register("hourRate")}/>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-6 py-2 rounded-md text-white font-semibold transition-all duration-300
             ${
              !isDirty || isPending
                ? "bg-shamelco-dark/20 cursor-not-allowed opacity-70"
                : "bg-shamelco-accent hover:bg-shamelco-accent/90 shadow-md"
            }`}
        >
          {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>
    </form>
  );
};

export default function VenueSettingsPage() {
  const { id } = useParams(); 
  
  const venueId = useMemo(() => asGUID(id||"00000000-0000-0000-0000-000000000000"), [id]);
  const { data, isLoading, isError } = useGetVenue(venueId);

  if (isLoading) return <Loading text="جاري تحميل بيانات المكان..."/>;
  if (isError || !data?.data) return <Error text="حدث خطأ أثناء جلب البيانات."/>;

  return (
    <div className="p-4 bg-shamelco-bg min-h-screen">
      <VenueSettingsForm initialData={data.data} />
    </div>
  );
}