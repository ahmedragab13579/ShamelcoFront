import { useState, useMemo } from "react";
import { useGetPitches } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import type { PitchDto } from "../../../BackEndIntegration/Types/Pitch/Response";

export const usePitchesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [governorateId, setGovernorateId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();

  const {
    data: PITCHES_RESPONSE,
    isLoading,
    isError,
  } = useGetPitches({ page, pageSize, governorateId, cityId });

  const responseData = PITCHES_RESPONSE?.data;

  const totalPages = responseData?.totalPages || 1;
  const hasNextPage = responseData?.hasNextPage || false;
  const hasPreviousPage = responseData?.hasPreviousPage || false;

  const filteredPitches = useMemo(() => {
    const pitchesData = responseData?.items || [];
    if (activeFilter === "all") return pitchesData;
    return pitchesData.filter((pitch: PitchDto) => pitch.type === activeFilter);
  }, [responseData?.items, activeFilter]);

  const handleLocationChange = (govId?: number, cId?: number) => {
    setGovernorateId(govId);
    setCityId(cId);
    setPage(1);
  };

  return {
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    governorateId,
    cityId,
    handleLocationChange,
    isLoading,
    isError,
    filteredPitches,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};