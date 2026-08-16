import { MapPin, RotateCcw } from "lucide-react";
import { useGetGovernorates, useGetCitiesByGovernorate } from "../../../BackEndIntegration/Hooks/Queries/useLocationQueries";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface LocationFilterBarProps {
  selectedGovId?: number;
  selectedCityId?: number;
  onFilterChange: (govId?: number, cityId?: number) => void;
}

export default function LocationFilterBar({
  selectedGovId,
  selectedCityId,
  onFilterChange,
}: LocationFilterBarProps) {
  const { t, currentLang } = useLanguage();

  const { data: govData, isLoading: isLoadingGov } = useGetGovernorates();
  const { data: cityData, isLoading: isLoadingCities } =
    useGetCitiesByGovernorate(selectedGovId);

  const governorates = govData?.data || [];
  const cities = cityData?.data || [];

  const handleGovChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange(val, undefined);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange(selectedGovId, val);
  };

  const handleReset = () => {
    onFilterChange(undefined, undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-shamelco-surface p-3 rounded-2xl border border-shamelco-border shadow-2xs mt-3">
      <div className="flex items-center gap-1.5 text-xs font-bold text-shamelco-darker shrink-0">
        <MapPin className="w-4 h-4 text-shamelco-gold" />
        <span>{t("messages.FILTER_BY_LOCATION") || "التصفية حسب الموقع"}:</span>
      </div>

      {/* Governorate Selector */}
      <div className="relative min-w-[140px] flex-1 sm:flex-initial">
        <select
          value={selectedGovId || ""}
          onChange={handleGovChange}
          className="w-full px-3 py-1.5 rounded-xl border border-shamelco-border bg-shamelco-bg text-shamelco-darker font-semibold text-xs outline-none focus:border-shamelco-gold cursor-pointer"
        >
          <option value="">
            {isLoadingGov
              ? "جاري التحميل..."
              : t("messages.ALL_GOVERNORATES") || "كل المحافظات"}
          </option>
          {governorates.map((g) => (
            <option key={g.id} value={g.id}>
              {currentLang === "ar" ? g.nameAr : g.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* City Selector */}
      <div className="relative min-w-[140px] flex-1 sm:flex-initial">
        <select
          value={selectedCityId || ""}
          onChange={handleCityChange}
          disabled={!selectedGovId || isLoadingCities}
          className="w-full px-3 py-1.5 rounded-xl border border-shamelco-border bg-shamelco-bg text-shamelco-darker font-semibold text-xs outline-none focus:border-shamelco-gold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedGovId
              ? t("messages.SELECT_GOVERNORATE_FIRST") || "اختر المحافظة أولاً"
              : isLoadingCities
              ? "جاري التحميل..."
              : t("messages.ALL_CITIES") || "كل المدن"}
          </option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {currentLang === "ar" ? c.nameAr : c.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filter Button */}
      {(selectedGovId || selectedCityId) && (
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-shamelco-bg hover:bg-shamelco-border/40 text-status-danger text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t("messages.RESET") || "إعادة ضبط"}</span>
        </button>
      )}
    </div>
  );
}
