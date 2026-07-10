
import { Link, useParams } from "react-router-dom";
import { useGetVenueFloor } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import type { LiveFloorPlanDto, TableStateDto } from "../../../BackEndIntegration/Types/Venues/Response";
import VenueTableCard from "../../Components/Venue/VenueTableCard";


export default function LiveFloorPlan() {
    const {id} = useParams();
    const result = useGetVenueFloor(asGUID(id||"00000000-0000-0000-0000-000000000000"));
  

 
   if (result.isLoading) {
        return <Loading text="جارى جلب البيانات" />;
      }
    
      if (result.isError) {
        return <Error text="حدث خطأ فى جلب البيانات" />;
      }
    if(!result.data?.data){
        return <Error text="لا توجد بيانات للطابق الحالى" />;
    }
  const venue : LiveFloorPlanDto = result.data?.data; ; 
 
  return (
    <div className="w-full pb-12 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-shamelco-dark/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-shamelco-darker mb-1">{venue.venueName}</h1>
          <p className="text-sm text-shamelco-dark/60">مراقبة حية للطاولات والأجهزة</p>
        </div>

        <div className="flex items-center gap-3 bg-shamelco-dark/5 p-2 rounded-xl text-xs font-bold">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-status-success"></span> متاحة</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {venue.tables.map((table: TableStateDto) => (
      <Link key={table.tableId} to={`../booking/${table.tableId}?type=venue`} relative="path">
         <VenueTableCard table={table} key={table.tableId}/>
      </Link>
        ))}
      </div>

    </div>
  );
}


 