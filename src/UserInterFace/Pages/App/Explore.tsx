import { Search, Frown } from "lucide-react";
import type { PlaceSearchDto } from "../../../BackEndIntegration/Types/Customer/Response";
import PlaceTypeTabs from "../../Components/App/Explore/PlaceTypeTabs";
import PlaceCard from "../../Components/App/PlaceCard";
import QuickFilters from "../../Components/Common/QuickFilters";
import SearchBar from "../../Components/Common/Search";
import { useExplore } from "../../Hooks/App/Explore/useExplore";

export default function Explore() {
  const { state, actions } = useExplore();
  const { searchInput, activePlaceType, activeCategory, currentQuickFilters, SearchPlaces } = state;

  return (
    <div className="w-full pb-12 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-black text-shamelco-darker mb-4 flex items-center gap-2">
          استكشف الأماكن <Search className="w-6 h-6 text-shamelco-accent" />
        </h1>

        <PlaceTypeTabs
          activePlaceType={activePlaceType}
          onPlaceTypeChange={actions.handlePlaceTypeChange}
        />

        <SearchBar
          value={searchInput}
          onChange={actions.setSearchInput}
          onSubmit={actions.handleSearchSubmit}
        />
      </div>

      <div className="px-4 mb-6">
        <QuickFilters
          filters={currentQuickFilters}
          activeFilter={activeCategory}
          onFilterChange={actions.handleCategoryChange}
        />
      </div>

      <div className="px-4">
        {SearchPlaces.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse bg-shamelco-dark/5 rounded-2xl h-64 w-full" />
            ))}
          </div>
        ) : SearchPlaces.isError ? (
          <div className="text-center py-12 text-status-danger font-bold">
            حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.
          </div>
        ) : SearchPlaces.data && SearchPlaces.data.data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SearchPlaces.data.data.items.map((place: PlaceSearchDto) => (
              <PlaceCard key={place.id} item={place} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-shamelco-dark/10 rounded-3xl shadow-sm">
            <Frown className="w-16 h-16 text-shamelco-dark/20 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-shamelco-darker mb-1">مفيش أماكن بالاسم ده</h3>
            <p className="text-shamelco-dark/70 text-sm">جرب تبحث بكلمة تانية أو غير الفلتر.</p>
          </div>
        )}
      </div>
    </div>
  );
}