import { useState } from "react";
import { useTopRatedPlacesQuery } from "../../../BackEndIntegration/Hooks/Queries/useCustomerQueries.ts";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

interface UseTopRatingsProps {
  initialPageSize?: number;
}

export function useTopRatings({ initialPageSize = 20 }: UseTopRatingsProps = {}) {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(initialPageSize);
  const { t } = useLanguage();

  const { data, isLoading, isError, isFetching } = useTopRatedPlacesQuery({ page, pageSize });

  const items = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const hasNextPage = data?.data?.hasNextPage ?? page < totalPages;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    page,
    setPage,
    t,
    isLoading,
    isError,
    isFetching,
    items,
    totalPages,
    hasNextPage,
    handleNextPage,
    handlePrevPage,
  };
}
