import { Loader2 } from "lucide-react";
import { SharedInput } from "../../Common/SharedInput";
import { SharedSelect } from "./SharedSelect";
import { useSetupVenue } from "../../../Hooks/Venue/useSetupVenue";
import LocationSelect from "../../Common/LocationSelect";

export function SetupVenueForm() {
  const { register, handleSubmit, watch, setValue, errors, onSubmit, isPending, t } =
    useSetupVenue();

  const selectedGovId = watch("GovernorateId");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          label={t("messages.VENUE_NAME")}
          placeholder={t("messages.VENUE_NAME_PLACEHOLDER")}
          {...register("Name")}
          error={errors.Name?.message}
        />
        <SharedInput
          label={t("messages.TABLE_PRICE_PER_HOUR")}
          type="number"
          placeholder="0"
          {...register("hourRate", { valueAsNumber: true })}
          error={errors.hourRate?.message}
        />

        <SharedSelect
          label={t("messages.TYPE")}
          register={register("Type")}
          error={errors.Type?.message}
          options={[
            { value: "", label: t("messages.SELECT_TYPE") },
            { value: "Cafe", label: t("messages.PLAYSTATION_LOUNGE") },
            { value: "Cafe", label: t("messages.CAFE_COFFEE") },
            { value: "Cafe", label: t("messages.BILLIARD_LOUNGE") },
            { value: "Restaurant", label: t("messages.RESTAURANT") },
          ]}
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
