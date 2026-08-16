import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import type { TableStateDto } from "../../../BackEndIntegration/Types/Venues/Response";
import type { UpdateVenueTableCommand } from "../../../BackEndIntegration/Types/Venues/Request";
import {
  useAddVenueTableConsoleMutation,
  useRemoveVenueTableConsoleMutation,
  useUpdateVenueTableMutation
} from "../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { useGetVenuesConsoles } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useVenueTableSettingsForm(initialData: TableStateDto, VenueId: GUID) {
  const { mutate: updateVenueTable, isPending } = useUpdateVenueTableMutation();
  const { t } = useLanguage();

  const defaultValues = useMemo<UpdateVenueTableCommand>(() => ({
    Id: initialData.tableId,
    VenueId: VenueId,
    TableNumber: initialData.tableNumber,
    Capacity: initialData.capacity,
    Status: initialData.status || "Unavailable",
  }), [
    initialData.tableId,
    VenueId,
    initialData.tableNumber,
    initialData.capacity,
    initialData.status,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateVenueTableCommand>({
    defaultValues,
    values: defaultValues,
  });

  const onSubmit = (data: UpdateVenueTableCommand) => {
    data.TableNumber = Number(data.TableNumber);
    data.Capacity = Number(data.Capacity);

    updateVenueTable(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isDirty,
    errors,
    isPending,
    t,
  };
}

export function useRemoveConsoleSection(parsedVenueId: GUID, parsedTableId: GUID) {
  const { mutate: removeVenueTableConsole, isError, isPending } = useRemoveVenueTableConsoleMutation();
  const { t } = useLanguage();

  function handleRemoveConsole() {
    removeVenueTableConsole({ VenueId: parsedVenueId, Id: parsedTableId });
  }

  return {
    handleRemoveConsole,
    isError,
    isPending,
    t,
  };
}

export function useAddConsoleSection(parsedVenueId: GUID, parsedTableId: GUID) {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const { t } = useLanguage();
  const [selectedConsoleId, setSelectedConsoleId] = useState<string>("");

  const { data, isLoading, isError } = useGetVenuesConsoles({ 
    Id: parsedVenueId, 
    params: { page, pageSize } 
  });

  const { mutate: addVenueTableConsole, isPending, isError: isAddError } = useAddVenueTableConsoleMutation();

  function handleAddConsole() {
    if (!selectedConsoleId) return;
    addVenueTableConsole({ 
      VenueId: parsedVenueId, 
      Id: parsedTableId, 
      ConsoleId: asGUID(selectedConsoleId) 
    });
  }

  const consolesList = data?.data?.items || [];
  const hasNextPage = data?.data?.hasNextPage || consolesList.length === pageSize;

  return {
    page,
    setPage,
    selectedConsoleId,
    setSelectedConsoleId,
    consolesList,
    hasNextPage,
    isLoading,
    isError,
    isAddError,
    isPending,
    handleAddConsole,
    t,
  };
}
