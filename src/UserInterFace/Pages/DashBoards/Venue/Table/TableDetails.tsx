import { useMemo } from "react";
import { useParams } from "react-router-dom";
import asGUID from "../../../../../BackEndIntegration/Types/shared/Guid";
import { useGetVenueTable } from "../../../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import Error from "../../../../Components/Common/Error";
import { useLanguage } from "../../../../Hooks/Shared/useLanguage";
import { VenueTableSettingsForm } from "./VenueTableSettingsForm";
import { RemoveConsoleSection } from "./RemoveConsoleSection";
import { AddConsoleSection } from "./AddConsoleSection";

export default function VenueTableSettingsPage() {
  const { id, tableId } = useParams(); 
  const { t } = useLanguage();
  
  const parsedVenueId = useMemo(() => asGUID(id || "00000000-0000-0000-0000-000000000000"), [id]);
  const parsedTableId = useMemo(() => asGUID(tableId || "00000000-0000-0000-0000-000000000000"), [tableId]);

  const { data, isLoading, isError } = useGetVenueTable({ 
    Id: parsedTableId, 
    VenueId: parsedVenueId 
  });

  if (isLoading) return <TableDetailsSkeleton />;
  if (isError || !data?.data) return <Error text={t('messages.ERROR_FETCHING_DATA')} />;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] flex flex-col items-center justify-start transition-colors duration-200">
      <div className="w-full">
        <VenueTableSettingsForm initialData={data.data} VenueId={parsedVenueId} />
        
        {data.data?.hasConsole ? (
          <RemoveConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
        ) : (
          <AddConsoleSection parsedVenueId={parsedVenueId} parsedTableId={parsedTableId} />
        )}
      </div>
    </div>
  );
}

function TableDetailsSkeleton() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-shamelco-bg min-h-[calc(100vh-5rem)] font-sans transition-colors duration-200 animate-pulse flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl bg-shamelco-surface rounded-lg border border-shamelco-border p-6 sm:p-8 space-y-6 shadow-md">
        <div className="h-7 w-40 bg-shamelco-sand rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
              <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-shamelco-sand rounded-md" />
          <div className="h-12 bg-shamelco-sand/60 rounded-md border border-shamelco-border/40" />
        </div>
        <div className="flex justify-end pt-6 border-t border-shamelco-border">
          <div className="h-12 w-36 bg-shamelco-sand rounded-md" />
        </div>
      </div>
    </div>
  );
}