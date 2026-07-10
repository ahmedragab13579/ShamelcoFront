import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type OwnerProfileDto from "../../../BackEndIntegration/Types/Owner/Response";
import { useGetOwnerProfile } from "../../../BackEndIntegration/Hooks/Queries/UseOwnerQueries";
import type { UpdateOwnerProfileCommand } from "../../../BackEndIntegration/Types/Owner/Request";
import { SharedInput } from "../../Components/Common/SharedInput";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import { useAuth } from "../../../Context/Auth/AuthContext";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import { useUpdateOwnerProfile } from "../../../BackEndIntegration/Hooks/Mutations/UseOwnerMutations";

interface OwnerProfileFormProps {
  initialData: OwnerProfileDto;
}

const OwnerProfileForm: React.FC<OwnerProfileFormProps> = ({ initialData }) => {
  const { mutate: updateProfile, isPending } = useUpdateOwnerProfile();
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
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-2xl shadow-sm border border-shamelco-dark/5 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-8 text-shamelco-darker text-right">إعدادات حساب المالك</h2>
      
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-32 h-32 bg-shamelco-bg rounded-full overflow-hidden border-4 border-white shadow-md mb-2 group">
          {imagePreview ? (
            <img src={imagePreview} alt="صورة المالك" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-shamelco-dark/40 text-sm">
              بدون صورة
            </div>
          )}
          
          <div 
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-white text-xs font-bold text-center px-2">تغيير الصورة</span>
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
        <SharedInput label="الاسم بالكامل" error={errors.fullName?.message} {...register("fullName")} />
        <SharedInput label="البريد الإلكتروني" type="email" error={errors.email?.message} {...register("email")} />
        <SharedInput label="رقم الهاتف" type="tel" error={errors.phoneNumber?.message} {...register("phoneNumber")} />
        <SharedInput label="اسم العمل (Business Name)" error={errors.businessName?.message} {...register("businessName")} />
        <SharedInput label="الرقم الضريبي" error={errors.taxNumber?.message} {...register("taxNumber")} />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-8 py-3 rounded-xl text-white font-bold transition-all duration-300
            ${!isDirty || isPending ? "bg-shamelco-dark/20 cursor-not-allowed" : "bg-status-success hover:bg-status-success/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"}`}
        >
          {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>
    </form>
  );
};

export default function OwnerSettingsPage() {
  const { user } = useAuth(); 

  const ownerId = useMemo(() => asGUID(user?.userId||asGUID("00000000-0000-0000-0000-000000000000")), [user]);
  const { data, isLoading, isError } = useGetOwnerProfile(ownerId);

  if (isLoading) return <Loading text="جاري تحميل بيانات الحساب..."/>;
  if (isError || !data?.data) return <Error text="حدث خطأ أثناء جلب البيانات."/>;
  
  return (
    <div className="p-4 bg-slate-50 min-h-screen flex items-start justify-center">
      <div className="w-full">
        <OwnerProfileForm initialData={data.data} />
      </div>
    </div>
  );
}