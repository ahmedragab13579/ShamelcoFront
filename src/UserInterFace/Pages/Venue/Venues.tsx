import { useState } from "react";
import VenueCard from "../../Components/Venue/VenueCard";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import { useGetVenues } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import type { MiniVenueDto } from "../../../BackEndIntegration/Types/Venues/Response";
import QuickFilters from "../../Components/Common/QuickFilters";
import Pagination from "../../Components/Common/Pagination";

  const QUICK_FILTERS = [
    { text: "الكل", value: "all" },
    { text: "كافى", value: "Cafe" },
    { text: "مطعم", value: "Restaurant" },
  ];

export default function Venues() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  const VENUES = useGetVenues({ page, pageSize });

  if (VENUES.isLoading) {
    return <Loading text="جارى جلب البيانات" />;
  }

  if (VENUES.isError) {
    return <Error text="حدث خطأ فى جلب البيانات" />;
  }

  const venuesData = VENUES.data?.data?.items || [];
  const hasNextPage = venuesData.length === pageSize;

  const filteredVenues =
    activeFilter === "all"
      ? venuesData
      : venuesData.filter((venue: MiniVenueDto) => venue.type === activeFilter);

  return (
    <div className="w-full pb-8">
      <div className="sticky top-16 z-40 bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-dark/10 shadow-sm">
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
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-black text-shamelco-darker">
        الصالات والكافيهات 🎮
      </h1>
      <button className="flex items-center gap-1 text-sm font-bold text-shamelco-dark/70 bg-white border border-shamelco-dark/10 px-3 py-1.5 rounded-lg hover:bg-shamelco-dark/5 transition-colors">
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
        فلتر
      </button>
    </div>
  );
}


type VenuesGridProps = {
  filteredVenues: MiniVenueDto[];
};



function VenuesGrid({ filteredVenues }: VenuesGridProps) {
  return (
    <div className="p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue: MiniVenueDto) => (
            <VenueCard key={venue.id} {...venue} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-shamelco-dark/60">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-shamelco-dark/30"
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
            <p className="font-medium">
              لا توجد صالات مطابقة لهذا الفلتر حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


