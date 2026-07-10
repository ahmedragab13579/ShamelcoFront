import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import PitchCard from "../../Components/Pitch/PitchCard";
import type { MiniPitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import { usePitchesPage } from "../../Hooks/Pitch/usePitchesPage";
import Pagination from "../../Components/Common/Pagination";
import QuickFilters from "../../Components/Common/QuickFilters";
const QUICK_FILTERS = [
{ text: "الكل", value: "all" },
{ text: "خماسي", value: "FiveASide" },
{ text: "سداسى", value: "SixASide" },
{ text: "بادل", value: "Padel" },
{ text: "تنس", value: "Tennis" },
];
export default function Pitches() {

  const {
    isLoading,
    isError,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    filteredPitches,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = usePitchesPage();

  if (isLoading) {
    return <Loading text="جارى جلب البيانات" />;
  }

  if (isError) {
    return <Error text="حدث خطأ فى جلب البيانات" />;
  }

  return (
    <div className="w-full pb-8">
      <div className="sticky top-16 z-40 bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-dark/10 shadow-sm">
        <PitchesHeader />
        <QuickFilters
        filters={QUICK_FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
      <PitchesGrid filteredPitches={filteredPitches} />
      {(page > 1 || hasNextPage) && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}




function PitchesHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-black text-shamelco-darker">الملاعب المتاحة ⚽</h1>
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







type PitchesGridProps = {
  filteredPitches: MiniPitchDto[];
};

 function PitchesGrid({ filteredPitches }: PitchesGridProps) {
  return (
    <div className="p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredPitches.length > 0 ? (
          filteredPitches.map((pitch: MiniPitchDto) => (
            <PitchCard key={pitch.id} {...pitch} />
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
              لا توجد ملاعب مطابقة لهذا الفلتر حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}