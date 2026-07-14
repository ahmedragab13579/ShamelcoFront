import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react"; 
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
import { useLanguage } from "../../../Hooks/Shared/useLanguage";

// مكون القائمة المنسدلة متوافق 100% مع الهوية والـ RTL/LTR والـ Dark Mode
const SharedSelect = ({ label, register, error, options, ...props }: any) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="block text-sm font-bold text-shamelco-darker mb-1 text-start">{label}</label>
    <div className="relative">
      <select
        {...register}
        {...props}
        className={`w-full px-4 pe-10 py-3 rounded-md border appearance-none transition-all duration-200 outline-none text-shamelco-darker bg-shamelco-surface text-start font-bold text-sm cursor-pointer shadow-sm
          ${error 
            ? "border-status-danger focus:ring-2 focus:ring-status-danger/20" 
            : "border-shamelco-border hover:border-shamelco-gold/50 focus:border-shamelco-gold focus:ring-2 focus:ring-shamelco-gold/20"}`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value} className="bg-shamelco-surface text-shamelco-darker font-semibold py-1">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5 text-shamelco-muted pointer-events-none" />
    </div>
    {error && <span className="text-xs font-bold text-status-danger text-start mt-1">{error}</span>}
  </div>
);

function SetupPitchForm() {
  const nav = useNavigate();
  const AddPitch = useAddPitchMutation();
  const { user, loginState } = useAuth();
  const { t } = useLanguage();

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput label={t('messages.PITCH_NAME')} placeholder={t('messages.PITCH_NAME_PLACEHOLDER')} {...register("Name")} error={errors.Name?.message} />
        
        <SharedSelect 
          label={t('messages.TYPE')} 
          register={register("Type")} 
          error={errors.Type?.message}
          options={[
            { value: "", label: t('messages.SELECT_TYPE') },
            { value: "1", label: t('messages.FIVE_A_SIDE') },
            { value: "2", label: t('messages.SIX_A_SIDE') },
            { value: "3", label: t('messages.TENNIS') },
            { value: "4", label: t('messages.PADEL') }
          ]}
        />

        <SharedInput label={t('messages.PRICE_PER_HOUR')} type="number" placeholder="10" {...register("HourlyRate", { valueAsNumber: true })} error={errors.HourlyRate?.message} />
        <SharedInput label={t('messages.CAPACITY')} type="number" placeholder={t('messages.CAPACITY_PLACEHOLDER')} {...register("Capacity", { valueAsNumber: true })} error={errors.Capacity?.message} />
      </div>

      <div className="flex justify-end pt-6 border-t border-shamelco-border">
        {/* تعديل زرار الحفظ ليكون هو الـ CTA الذهبي الرئيسي */}
        <button 
          type="submit" 
          disabled={AddPitch.isPending} 
          className="px-10 py-3.5 rounded-md font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover focus-visible:outline-shamelco-gold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-shamelco-gold shadow-gold flex items-center justify-center gap-2 cursor-pointer shrink-0 min-w-[180px]"
        >
          {AddPitch.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-shamelco-darker shrink-0" aria-hidden="true" />
              <span>{t('messages.CREATING')}</span>
            </>
          ) : (
            <span>{t('messages.CREATE_AND_START')}</span>
          )}
        </button>
      </div>
    </form>
  );
}

function SetupVenueForm() {
  const nav = useNavigate();
  const AddVenue = useAddVenueMutation();
  const { user, loginState } = useAuth();
  const { t } = useLanguage();

  const { register, handleSubmit, formState: { errors } } = useForm<SetupVenueInput>({
    resolver: zodResolver(setupVenueSchema),
  });

  const onSubmit = (data: SetupVenueInput) => {
    AddVenue.mutate({
        name: data.Name,
        type: data.Type as VenueType,
        hourRate: data.hourRate
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput label={t('messages.VENUE_NAME')} placeholder={t('messages.VENUE_NAME_PLACEHOLDER')} {...register("Name")} error={errors.Name?.message} />
        <SharedInput label={t('messages.TABLE_PRICE_PER_HOUR')} type="number" placeholder="0" {...register("hourRate", { valueAsNumber: true })} error={errors.hourRate?.message} />
        
        <SharedSelect 
          label={t('messages.TYPE')} 
          register={register("Type")} 
          error={errors.Type?.message}
          options={[
            { value: "", label: t('messages.SELECT_TYPE') },
            { value: "Cafe", label: t('messages.PLAYSTATION_LOUNGE') },
            { value: "Cafe", label: t('messages.CAFE_COFFEE') },
            { value: "Cafe", label: t('messages.BILLIARD_LOUNGE') },
            { value: "Restaurant", label: t('messages.RESTAURANT') }
          ]}
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-shamelco-border">
        <button 
          type="submit" 
          disabled={AddVenue.isPending} 
          className="px-10 py-3.5 rounded-md font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover focus-visible:outline-shamelco-gold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-shamelco-gold shadow-gold flex items-center justify-center gap-2 cursor-pointer shrink-0 min-w-[180px]"
        >
          {AddVenue.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-shamelco-darker shrink-0" aria-hidden="true" />
              <span>{t('messages.CREATING')}</span>
            </>
          ) : (
            <span>{t('messages.CREATE_AND_START')}</span>
          )}
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