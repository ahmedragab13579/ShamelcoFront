import { useState } from "react";
import { useGetGovernorates, useGetCitiesByGovernorate } from "../../../BackEndIntegration/Hooks/Queries/useLocationQueries";
import { SharedSelect } from "../DashBoard/SetUpYourPlace/SharedSelect";
import { useLanguage } from "../../Hooks/Shared/useLanguage";
import { MapPin } from "lucide-react";

interface LocationSelectProps {
  onGovernorateChange?: (governorateId?: number) => void;
  onCityChange?: (cityId?: number) => void;
  governorateValue?: number;
  cityValue?: number;
  governorateError?: string;
  cityError?: string;
  registerGov?: any;
  registerCity?: any;
}

export default function LocationSelect({
  onGovernorateChange,
  onCityChange,
  governorateValue,
  governorateError,
  cityError,
  registerGov,
  registerCity,
}: LocationSelectProps) {
  const { t, currentLang } = useLanguage();
  const [selectedGovId, setSelectedGovId] = useState<number | undefined>(
    governorateValue
  );

  const { data: govData, isLoading: isLoadingGov } = useGetGovernorates();
  const currentGovId = governorateValue !== undefined ? governorateValue : selectedGovId;

  const { data: cityData, isLoading: isLoadingCities } =
    useGetCitiesByGovernorate(currentGovId);

  const governorates = govData?.data || [];
  const cities = cityData?.data || [];

  const govOptions = [
    { value: "", label: isLoadingGov ? "جاري التحميل..." : t("messages.SELECT_GOVERNORATE") || "اختر المحافظة" },
    ...governorates.map((g) => ({
      value: String(g.id),
      label: currentLang === "ar" ? g.nameAr : g.nameEn,
    })),
  ];

  const cityOptions = [
    {
      value: "",
      label: !currentGovId
        ? t("messages.SELECT_GOVERNORATE_FIRST") || "اختر المحافظة أولاً"
        : isLoadingCities
        ? "جاري التحميل..."
        : t("messages.SELECT_CITY") || "اختر المدينة",
    },
    ...cities.map((c) => ({
      value: String(c.id),
      label: currentLang === "ar" ? c.nameAr : c.nameEn,
    })),
  ];

  const handleGovSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    setSelectedGovId(val);
    if (onGovernorateChange) onGovernorateChange(val);
    if (onCityChange) onCityChange(undefined);
  };

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    if (onCityChange) onCityChange(val);
  };

  return (
    <div className="contents">
      <SharedSelect
        label={t("messages.GOVERNORATE") || "المحافظة"}
        register={
          registerGov
            ? {
                ...registerGov,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                  registerGov.onChange(e);
                  handleGovSelect(e);
                },
              }
            : undefined
        }
        error={governorateError}
        options={govOptions}
        icon={MapPin}
      />

      <SharedSelect
        label={t("messages.CITY") || "المدينة"}
        register={
          registerCity
            ? {
                ...registerCity,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                  registerCity.onChange(e);
                  handleCitySelect(e);
                },
              }
            : undefined
        }
        error={cityError}
        options={cityOptions}
        disabled={!currentGovId || isLoadingCities}
        icon={MapPin}
      />
    </div>
  );
}
