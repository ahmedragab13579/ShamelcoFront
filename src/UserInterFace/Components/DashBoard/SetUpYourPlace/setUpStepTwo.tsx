import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react"; 
import { 
  setupPitchSchema, 
  setupVenueSchema, 
  type SetupPitchInput, 
  type SetupVenueInput 
} from "../../../validations/setupSchema";
import { useAuth } from "../../../../Context/Auth/AuthContext";
import type { PitchType, PlaceType, VenueType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import { SharedInput } from "../../Common/SharedInput";
import { useAddVenueMutation } from "../../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { useAddPitchMutation } from "../../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";

const SharedSelect = ({ label, register, error, options, ...props }: any) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="block text-sm font-bold text-shamelco-darker mb-1 text-right">{label}</label>
    <div className="relative">
      <select
        {...register}
        {...props}
        className={`w-full px-4 py-3 rounded-xl border appearance-none transition-all duration-300 outline-none text-shamelco-darker bg-shamelco-dark/5 
          ${error 
            ? "border-status-danger focus:ring-status-danger/20" 
            : "border-shamelco-dark/10 focus:border-shamelco-accent focus:bg-white focus:ring-4 focus:ring-shamelco-accent/10"}`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-shamelco-dark/40 pointer-events-none" />
    </div>
    {error && <span className="text-xs font-bold text-status-danger text-right mt-1">{error}</span>}
  </div>
);

function SetupPitchForm() {
  const nav = useNavigate();
  const AddPitch = useAddPitchMutation();
  const { user, loginState } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<SetupPitchInput>({
    resolver: zodResolver(setupPitchSchema),
  });

  const onSubmit = (data: SetupPitchInput) => {
    AddPitch.mutate({
        name: data.Name,
        type: data.Type as PitchType,
        hourlyRate: data.HourlyRate,
        capacity: data.Capacity,
      },
      {
        onSuccess: (response) => {
          if (user) { user.pitchId = response.data; loginState(user); }
          nav(`/dashboard/pitch/${response.data}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-left-8 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput label="اسم الملعب" placeholder="مثال: ملعب الأبطال" {...register("Name")} error={errors.Name?.message} />
        
        <SharedSelect 
          label="النوع" 
          register={register("Type")} 
          error={errors.Type?.message}
          options={[
            { value: "", label: "اختر النوع..." },
            { value: "1", label: "خماسي" },
            { value: "2", label: "سداسي" },
            { value: "3", label: "تنس" },
            { value: "4", label: "بادل" }
          ]}
        />

        <SharedInput label="سعر الساعة (ج.م)"  type="number" placeholder="10" {...register("HourlyRate", { valueAsNumber: true })} error={errors.HourlyRate?.message} />
        <SharedInput label="السعة الاستيعابية"  type="number" placeholder="عدد الأفراد -6" {...register("Capacity", { valueAsNumber: true })} error={errors.Capacity?.message} />
      </div>

      <div className="flex justify-end pt-6 border-t border-shamelco-dark/10">
        <button type="submit" disabled={AddPitch.isPending} className="px-10 py-3.5 rounded-xl font-bold text-shamelco-gold bg-shamelco-darker hover:bg-shamelco-dark transition-all active:scale-95 disabled:opacity-50">
          {AddPitch.isPending ? "جاري الإنشاء..." : "إنشاء والبدء"}
        </button>
      </div>
    </form>
  );
}

function SetupVenueForm() {
  const nav = useNavigate();
  const AddVenue = useAddVenueMutation();
  const { user, loginState } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<SetupVenueInput>({
    resolver: zodResolver(setupVenueSchema),
  });

  const onSubmit = (data: SetupVenueInput) => {
    AddVenue.mutate({
        name: data.Name,
        type: data.Type as VenueType,
        hourRate:data.hourRate
      },
      {
        onSuccess: (response) => {
          if (user) { user.venueId = response.data; loginState(user); }
          nav(`/dashboard/venue/${response.data}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-left-8 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput label="اسم الصالة / الكافيه" placeholder="مثال: شاميلكو كافيه" {...register("Name")} error={errors.Name?.message} />
        <SharedInput label="سعر الساعه للطاوله" placeholder="0" {...register("hourRate")} error={errors.hourRate?.message} />
        <SharedSelect 
          label="النوع" 
          register={register("Type")} 
          error={errors.Type?.message}
          options={[
            { value: "", label: "اختر النوع..." },
            { value: "Cafe", label: "صالة بلايستيشن" },
            { value: "Cafe", label: "كافيه / قهوة" },
            { value: "Cafe", label:  "صالة بلياردو"},
            { value: "Restaurant", label:"مطعم" }
          ]}
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-shamelco-dark/10">
        <button type="submit" disabled={AddVenue.isPending} className="px-10 py-3.5 rounded-xl font-bold text-shamelco-gold bg-shamelco-darker hover:bg-shamelco-dark transition-all active:scale-95 disabled:opacity-50">
          {AddVenue.isPending ? "جاري الإنشاء..." : "إنشاء والبدء"}
        </button>
      </div>
    </form>
  );
}

interface SetupStepTwoProps {
  businessType: PlaceType;
  userId: string;
}
export default function SetupStepTwo({ businessType }: SetupStepTwoProps) {
  return businessType === "Pitch" ? <SetupPitchForm /> : <SetupVenueForm />;
}