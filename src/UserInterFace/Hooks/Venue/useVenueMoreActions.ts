import { useState } from "react";
import type { GUID } from "../../../BackEndIntegration/Types/shared/Guid";
import type FailResult from "../../../BackEndIntegration/Types/Result/Fail";
import type { VenueStaffRole } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { useGetVenuesStaff } from "../../../BackEndIntegration/Hooks/Queries/useVenueQueries";
import { useAddStaffMutation, useRevokeStaffMutation } from "../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useStaffList(venueId: GUID) {
  const [pagination] = useState({ page: 1, pageSize: 10 });
  const { t } = useLanguage();

  const { data, isLoading, isError } = useGetVenuesStaff({
    Id: venueId,
    params: pagination,
  });

  const staffList = data?.data?.items || [];

  return {
    staffList,
    isLoading,
    isError,
    t,
  };
}

export function useAddStaffModal(venueId: GUID, onClose: () => void) {
  const { mutate, isError, isPending, error } = useAddStaffMutation();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Role: "Cashier" as VenueStaffRole,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { VenueId: venueId, ...formData },
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

export function useRevokeStaffModal(venueId: GUID, staffId: GUID, onClose: () => void) {
  const mutation = useRevokeStaffMutation();
  const [credentials, setCredentials] = useState({ Email: "", Password: "" });
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { 
        VenueId: venueId, 
        StaffId: staffId, 
        Email: credentials.Email, 
        Password: credentials.Password 
      },
      { onSuccess: () => onClose() }
    );
  };

  return {
    credentials,
    setCredentials,
    handleSubmit,
    isPending: mutation.isPending,
    t,
  };
}
