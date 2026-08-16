import { Loader2 } from "lucide-react";
import { SharedInput } from "../../Common/SharedInput";
import { SharedSelect } from "./SharedSelect";
import { useSetupPitch } from "../../../Hooks/Pitch/useSetupPitch";
import LocationSelect from "../../Common/LocationSelect";

export function SetupPitchForm() {
  const { register, handleSubmit, watch, setValue, errors, onSubmit, isPending, t } =
    useSetupPitch();

  const selectedGovId = watch("GovernorateId");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          label={t("messages.PITCH_NAME")}
          placeholder={t("messages.PITCH_NAME_PLACEHOLDER")}
          {...register("Name")}
          error={errors.Name?.message}
        />

        <SharedSelect
          label={t("messages.TYPE")}
          register={register("Type")}
          error={errors.Type?.message}
          options={[
            { value: "", label: t("messages.SELECT_TYPE") },
            { value: "1", label: t("messages.FIVE_A_SIDE") },
            { value: "2", label: t("messages.SIX_A_SIDE") },
            { value: "3", label: t("messages.TENNIS") },
            { value: "4", label: t("messages.PADEL") },
          ]}
        />

        <SharedInput
          label={t("messages.PRICE_PER_HOUR")}
          type="number"
          placeholder="10"
          {...register("HourlyRate", { valueAsNumber: true })}
          error={errors.HourlyRate?.message}
        />
        <SharedInput
          label={t("messages.CAPACITY")}
          type="number"
          placeholder={t("messages.CAPACITY_PLACEHOLDER")}
          {...register("Capacity", { valueAsNumber: true })}
          error={errors.Capacity?.message}
        />

        {/* Location Select (Governorate & City) */}
        <LocationSelect
          governorateValue={selectedGovId}
          registerGov={register("GovernorateId", { valueAsNumber: true })}
          registerCity={register("CityId", { valueAsNumber: true })}
          governorateError={errors.GovernorateId?.message}
          cityError={errors.CityId?.message}
          onGovernorateChange={(govId) => {
            setValue("GovernorateId", govId as any);
            setValue("CityId", undefined as any);
          }}
          onCityChange={(cityId) => {
            setValue("CityId", cityId as any);
          }}
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-shamelco-border">
        <button
          type="submit"
          disabled={isPending}
          className="px-10 py-3.5 rounded-md font-black text-shamelco-darker bg-shamelco-gold hover:bg-shamelco-gold-hover focus-visible:outline-shamelco-gold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-shamelco-gold shadow-gold flex items-center justify-center gap-2 cursor-pointer shrink-0 min-w-[180px]"
        >
          {isPending ? (
            <>
              <Loader2
                className="w-5 h-5 animate-spin text-shamelco-darker shrink-0"
                aria-hidden="true"
              />
              <span>{t("messages.CREATING")}</span>
            </>
          ) : (
            <span>{t("messages.CREATE_AND_START")}</span>
          )}
        </button>
      </div>
    </form>
  );
}
