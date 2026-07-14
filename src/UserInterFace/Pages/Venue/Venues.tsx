import { useState } from "react";
import VenueCard from "../../Components/Venue/VenueCard";
import Error from "../../Components/Common/Error";
import { useGetVenues } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { MiniVenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import QuickFilters from "../../Components/Common/QuickFilters";
import Pagination from "../../Components/Common/Pagination";

import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Venues() {
  const { t } = useLanguage();

  const QUICK_FILTERS = [
    { text: t('messages.ALL'), value: "all" },
    { text: t('messages.CAFE'), value: "Cafe" },
    { text: t('messages.RESTAURANT'), value: "Restaurant" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  const VENUES = useGetVenues({ page, pageSize });

  if (VENUES.isLoading) {
    return <VenuesSkeleton />;
  }

  if (VENUES.isError) {
    return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  }

  const venuesData = VENUES.data?.data?.items || [];
  const hasNextPage = venuesData.length === pageSize;

  const filteredVenues =
    activeFilter === "all"
      ? venuesData
      : venuesData.filter((venue: MiniVenueDto) => venue.type === activeFilter);

  return (
    <div className="w-full pb-8 font-sans animate-fade-in">
      <div className="sticky top-16 z-40 bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-border shadow-xs">
        <Header />
        <QuickFilters
          filters={QUICK_FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <VenuesGrid filteredVenues={filteredVenues} />

      {(page > 1 || hasNextPage) && (
        <Pagination
          currentPage={page}
          hasNextPage={hasNextPage}
          onPageChange={setPage}
          hasPreviousPage={true}
          totalPages={10}
        />
      )}
    </div>
  );
}

function Header() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-black text-shamelco-darker">
        {t('messages.VENUES_AND_CAFES')} 🎮
      </h1>
      <button className="flex items-center gap-1.5 text-sm font-black text-shamelco-dark bg-shamelco-surface border border-shamelco-border px-4 py-2 rounded-xl hover:bg-shamelco-bg hover:text-shamelco-darker active:scale-95 transition-all shadow-3xs cursor-pointer">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span>{t('messages.FILTER')}</span>
      </button>
    </div>
  );
}

type VenuesGridProps = {
  filteredVenues: MiniVenueDto[];
};

function VenuesGrid({ filteredVenues }: VenuesGridProps) {
  const { t } = useLanguage();

  return (
    <div className="p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue: MiniVenueDto) => (
            <VenueCard key={venue.id} {...venue} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-shamelco-muted bg-shamelco-surface rounded-3xl border border-shamelco-border p-6 shadow-3xs">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-shamelco-muted/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-bold text-shamelco-dark">
              {t('messages.NO_VENUES_MATCHING_FILTER')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function VenuesSkeleton() {
  return (
    <div className="w-full pb-8 font-sans animate-pulse">
      {/* هيدر هيكلي */}
      <div className="bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-border">
        <div className="flex justify-between items-center mb-5">
          <div className="h-6 w-36 bg-shamelco-border rounded-md" />
          <div className="h-9 w-20 bg-shamelco-border/60 rounded-xl" />
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-16 bg-shamelco-border/50 rounded-xl shrink-0" />
          ))}
        </div>
      </div>

      {/* شبكة صالات هيكلية */}
      <div className="p-4 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-shamelco-surface border border-shamelco-border/40 rounded-3xl p-4 shadow-3xs space-y-4">
              <div className="h-32 bg-shamelco-sand rounded-2xl w-full" />
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-shamelco-border rounded-md" />
                <div className="h-3 w-1/3 bg-shamelco-border/60 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
