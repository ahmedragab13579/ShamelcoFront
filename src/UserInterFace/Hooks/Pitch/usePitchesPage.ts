import { useState, useMemo } from "react";
import { useGetPitches } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import type { PitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";

export const usePitchesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  const { data: PITCHES_RESPONSE, isLoading, isError } = useGetPitches({ page, pageSize });

  const responseData = PITCHES_RESPONSE?.data; 
  
  const totalPages = responseData?.totalPages || 1;
  const hasNextPage = responseData?.hasNextPage || false;
  const hasPreviousPage = responseData?.hasPreviousPage || false;

  const filteredPitches = useMemo(() => {
      const pitchesData = responseData?.items||[];
    if (activeFilter === "all") return pitchesData;
    return pitchesData.filter((pitch: PitchDto) => pitch.type === activeFilter);
  }, [responseData?.items, activeFilter]);

  return {
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    isLoading,
    isError,
    filteredPitches,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};