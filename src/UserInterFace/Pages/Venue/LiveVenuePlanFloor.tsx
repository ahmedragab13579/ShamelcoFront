import { Link, useParams } from "react-router-dom";
import { useGetVenueFloor } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Error from "../../Components/Common/Error";
import type { LiveFloorPlanDto, TableStateDto } from "../../../BackEndIntegration/Types/Venues/Response";
import VenueTableCard from "../../Components/Venue/VenueTableCard";

import { useLanguage } from "../../Hooks/Shared/useLanguage";

export default function LiveFloorPlan() {
  const {id} = useParams();
  const { t } = useLanguage();
  const result = useGetVenueFloor(asGUID(id||"00000000-0000-0000-0000-000000000000"));

  if (result.isLoading) {
    return <LiveFloorPlanSkeleton />;
  }

  if (result.isError) {
    return <Error text={t('messages.ERROR_FETCHING_DATA')} />;
  }
  
  if(!result.data?.data){
    return <Error text={t('messages.NO_DATA_CURRENT_FLOOR')} />;
  }
  
  const venue : LiveFloorPlanDto = result.data?.data; 

  return (
    <div className="w-full pb-12 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fade-in">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-shamelco-border pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-shamelco-darker">{venue.venueName}</h1>
          <p className="text-sm text-shamelco-muted font-semibold">{t('messages.LIVE_TABLES_MONITOR')}</p>
        </div>

        <div className="flex items-center gap-3 bg-shamelco-surface border border-shamelco-border p-2 px-3 rounded-xl text-xs font-bold shrink-0 w-fit">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse"></span> {t('messages.STATUS_AVAILABLE')}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {venue.tables.map((table: TableStateDto) => (
          <Link key={table.tableId} to={`../booking/${table.tableId}?type=venue`} relative="path" className="block active:scale-95 transition-transform duration-200">
            <VenueTableCard table={table} key={table.tableId}/>
          </Link>
        ))}
      </div>

    </div>
  );
}

function LiveFloorPlanSkeleton() {
  return (
    <div className="w-full pb-12 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-pulse">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-shamelco-border pb-4">
        <div className="space-y-2">
          <div className="h-6 w-44 bg-shamelco-border rounded-md" />
          <div className="h-4 w-52 bg-shamelco-border/60 rounded-md" />
        </div>
        <div className="h-8 w-20 bg-shamelco-sand rounded-xl shrink-0" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-32 bg-shamelco-surface border border-shamelco-border/40 rounded-2xl p-4 shadow-3xs" />
        ))}
      </div>
    </div>
  );
}