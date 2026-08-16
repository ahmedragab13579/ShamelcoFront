import { useState } from "react";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import type FailResult from "../../../BackEndIntegration/Types/Result/Fail";
import { useGetVenuesConsoles } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import { useAddVenueConsoleMutation, useRemoveVenueConsoleMutation } from "../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useConsolesList(venueId: GUID) {
  const [pagination] = useState({ page: 1, pageSize: 20 });
  const { t } = useLanguage();

  const { data, isLoading, isError } = useGetVenuesConsoles({
    Id: venueId,
    params: pagination,
  });

  const consolesList = data?.data?.items || [];

  return {
    consolesList,
    isLoading,
    isError,
    t,
  };
}

export function useAddConsoleModal(venueId: GUID, onClose: () => void) {
  const { mutate, isError, isPending, error } = useAddVenueConsoleMutation();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    Name: "",
    SerialNumber: "",
    HourlyRate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { 
        VenueId: venueId, 
        Name: formData.Name, 
        SerialNumber: formData.SerialNumber, 
        HourlyRate: Number(formData.HourlyRate) 
      },
      { onSuccess: () => onClose() }
    );
  };

  const errorMessage = (error as FailResult)?.code || "";

  return {
    formData,
    setFormData,
    handleSubmit,
    isError,
    isPending,
    errorMessage,
    t,
  };
}

export function useRemoveConsoleModal(venueId: GUID, consoleId: GUID, onClose: () => void) {
  const mutation = useRemoveVenueConsoleMutation();
  const { t } = useLanguage();

  const handleConfirm = () => {
    mutation.mutate(
      { 
        VenueId: venueId, 
        Id: consoleId 
      },
      { onSuccess: () => onClose() }
    );
  };

  return {
    handleConfirm,
    isPending: mutation.isPending,
    t,
  };
}
