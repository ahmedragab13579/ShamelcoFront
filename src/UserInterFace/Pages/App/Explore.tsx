import { Search, Sparkles } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response";
import PlaceTypeTabs from "../../Components/App/Explore/PlaceTypeTabs";
import PlaceCard from "../../Components/App/PlaceCard";
import QuickFilters from "../../Components/Common/QuickFilters";
import SearchBar from "../../Components/Common/Search";
import { useExplore } from "../../Hooks/App/Explore/useExplore";
import emptyStateIllust from "../../Images/emptystateUI.png";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Explore() {
  const { state, actions } = useExplore();
  const { searchInput, activePlaceType, activeCategory, currentQuickFilters, SearchPlaces } = state;
  const { t } = useLanguage();

  return (
    <div className="w-full pb-20 pt-4 animate-fade-in font-sans selection:bg-shamelco-gold selection:text-shamelco-darker">
      
      {/* القسم العلوي: العنوان والتنقل ومربع البحث */}
      <div className="px-4 sm:px-6 mb-6 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-shamelco-darker flex items-center gap-2 tracking-tight">
            <span>{t('messages.EXPLORE_PLACES')}</span>
            <Search className="w-6 h-6 sm:w-7 sm:h-7 text-shamelco-gold animate-pulse" aria-hidden="true" />
          </h1>
        </div>

        <PlaceTypeTabs
          activePlaceType={activePlaceType}
          onPlaceTypeChange={actions.handlePlaceTypeChange}
        />

        <div className="pt-1">
          <SearchBar
            value={searchInput}
            onChange={actions.setSearchInput}
            onSubmit={actions.handleSearchSubmit}
          />
        </div>
      </div>

      {/* الفلاتر السريعة */}
      <div className="px-4 sm:px-6 mb-6 overflow-hidden">
        <QuickFilters
          filters={currentQuickFilters}
          activeFilter={activeCategory}
          onFilterChange={actions.handleCategoryChange}
        />
      </div>

      {/* منطقة عرض النتائج */}
      <div className="px-4 sm:px-6">
        {SearchPlaces.isLoading ? (
          /* شبكة التحميل (Skeleton Loading) محسنة لتحاكي شكل الكروت الحقيقية */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-shamelco-surface border border-shamelco-border rounded-2xl p-4 space-y-3 shadow-2xs animate-pulse">
                <div className="bg-shamelco-sand rounded-xl h-40 w-full" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 bg-shamelco-border/60 rounded-md w-1/4" />
                  <div className="h-5 bg-shamelco-border rounded-md w-3/4" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-shamelco-border/40">
                  <div className="h-3 bg-shamelco-border/60 rounded-md w-1/3" />
                  <div className="h-5 bg-shamelco-border rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : SearchPlaces.isError ? (
          /* حالة الخطأ */
          <div className="text-center py-16 bg-status-danger/5 border border-status-danger/20 rounded-3xl p-6 max-w-md mx-auto">
            <p className="text-status-danger font-bold text-base mb-2">{t('messages.ERROR_FETCHING_PLACES')}</p>
            <span className="text-xs text-shamelco-muted block mb-4">{t('messages.CHECK_CONNECTION_TRY_AGAIN')}</span>
            <button 
              onClick={() => SearchPlaces.refetch && SearchPlaces.refetch()}
              className="px-5 py-2 bg-shamelco-darker text-white text-xs font-bold rounded-xl hover:bg-shamelco-accent transition-all shadow-xs cursor-pointer active:scale-95"
            >
              {t('messages.RETRY')}
            </button>
          </div>
        ) : SearchPlaces.data && SearchPlaces.data.data.items.length > 0 ? (
          /* عرض الكروت في حالة وجود نتائج */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
            {SearchPlaces.data.data.items.map((place: PlaceSearchDto) => (
              <PlaceCard key={place.id} item={place} />
            ))}
          </div>
        ) : (
          /* حالة عدم وجود نتائج (Empty State) مطورة بصرياً */
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-shamelco-surface border border-shamelco-border rounded-3xl shadow-2xs text-center max-w-lg mx-auto mt-4">
            <div className="w-32 h-32 mb-4 opacity-85">
              <img src={emptyStateIllust} alt={t('messages.NO_RESULTS')} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-black text-shamelco-darker mb-1.5">
              {t('messages.NO_PLACES_FOUND')}
            </h3>
            <p className="text-shamelco-muted text-sm max-w-xs mb-6">
              {t('messages.TRY_ANOTHER_SEARCH_WORD')}
            </p>
            {(searchInput || activeCategory) && (
              <button
                onClick={() => {
                  actions.setSearchInput("");
                  if (actions.handleCategoryChange) actions.handleCategoryChange("");
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-shamelco-gold text-shamelco-darker font-black text-xs rounded-xl hover:bg-shamelco-gold-hover transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>{t('messages.VIEW_ALL_PLACES')}</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}