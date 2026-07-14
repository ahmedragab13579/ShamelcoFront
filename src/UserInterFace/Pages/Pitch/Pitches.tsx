import Error from "../../Components/Common/Error";
import PitchCard from "../../Components/Pitch/PitchCard";
import type { MiniPitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";
import { usePitchesPage } from "../../Hooks/Pitch/usePitchesPage";
import Pagination from "../../Components/Common/Pagination";
import QuickFilters from "../../Components/Common/QuickFilters";

import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function Pitches() {
  const { t } = useLanguage();

  const QUICK_FILTERS = [
    { text: t('messages.ALL'), value: "all" },
    { text: t('messages.FIVE_A_SIDE'), value: "FiveASide" },
    { text: t('messages.SIX_A_SIDE'), value: "SixASide" },
    { text: t('messages.PADEL'), value: "Padel" },
    { text: t('messages.TENNIS'), value: "Tennis" },
  ];

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
    return <PitchesSkeleton />;
  }

  if (isError) {
    return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  }

  return (
    <div className="w-full pb-8 font-sans animate-fade-in">
      <div className="sticky top-16 z-40 bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-border shadow-xs">
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
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-black text-shamelco-darker">{t('messages.AVAILABLE_PITCHES')} ⚽</h1>
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

type PitchesGridProps = {
  filteredPitches: MiniPitchDto[];
};

function PitchesGrid({ filteredPitches }: PitchesGridProps) {
  const { t } = useLanguage();

  return (
    <div className="p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredPitches.length > 0 ? (
          filteredPitches.map((pitch: MiniPitchDto) => (
            <PitchCard key={pitch.id} {...pitch} />
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
              {t('messages.NO_PITCHES_MATCHING_FILTER')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PitchesSkeleton() {
  return (
    <div className="w-full pb-8 font-sans animate-pulse">
      {/* هيدر هيكلي */}
      <div className="bg-shamelco-bg pb-4 pt-4 px-4 border-b border-shamelco-border">
        <div className="flex justify-between items-center mb-5">
          <div className="h-6 w-32 bg-shamelco-border rounded-md" />
          <div className="h-9 w-20 bg-shamelco-border/60 rounded-xl" />
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-16 bg-shamelco-border/50 rounded-xl shrink-0" />
          ))}
        </div>
      </div>

      {/* شبكة ملاعب هيكلية */}
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