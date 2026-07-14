import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; 
import { VenueApi } from "../../API Data/Venue/VenueAPi";
import type { AddConsoleCommand, AddStaffRequest, AddVenueCommand, AddVenueTableCommand, AddVenueTableConsoleCommand, DeleteConsoleCommand, DeleteVenueTableCommand, RemoveVenueTableConsoleCommand, RevokeStaffRequest, UpdateVenueCommand, UpdateVenueTableCommand } from "../../Types/Venues/Request";
import type SuccessResult from "../../Types/Result/Success";
import type FailResult from "../../Types/Result/Fail";
import type { GUID } from "../../Types/shared/Guid";
import { venueKeys } from "../Keys/useVenueKeys";
import { dashboardKeys } from "../Keys/useDashboardKeys";
import { NotificationKeys } from "../Keys/useNotificationKeys";
import asGUID from "../../Types/shared/Guid";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { useLanguage } from "../../../UserInterFace/Hooks/Shared/useLanguage";
import { getLocalizedMessage } from "../../../locales/i18nHelper";

export const useRemoveVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();
  return useMutation<SuccessResult<boolean>, FailResult, DeleteVenueTableCommand>({
    mutationKey: [...venueKeys.tables(), "remove"], 
    mutationFn: VenueApi.DeleteVenueTable,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.tables() });
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlans() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      toast.success(t('messages.TABLE_DELETED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useAddVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<GUID>, FailResult, AddVenueTableCommand>({
    mutationKey: [...venueKeys.tables(), "add"], 
    mutationFn: VenueApi.AddVenueTable,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.tables() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlans() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.TABLE_CREATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useRemoveVenueConsoleMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, DeleteConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "remove"], 
    mutationFn: VenueApi.DeleteVenueConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });

      toast.success(t('messages.CONSOLE_DELETED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useAddVenueConsoleMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<GUID>, FailResult, AddConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "add"], 
    mutationFn: VenueApi.AddVenueConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.CONSOLE_ADDED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useAddVenueMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<GUID>, FailResult, AddVenueCommand>({
    mutationKey: [...venueKeys.all, "add"], 
    mutationFn: VenueApi.AddVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      toast.success(t('messages.VENUE_ADDED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useUpdateVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, UpdateVenueTableCommand>({
    mutationKey: [...venueKeys.tables(), "update"], 
    mutationFn: VenueApi.UpdateVenueTable,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tables() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlans() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.TABLE_UPDATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useUpdateVenueMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, UpdateVenueCommand>({
    mutationKey: [...venueKeys.all, "update"], 
    mutationFn: VenueApi.UpdateVenue,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
      queryClient.invalidateQueries({ queryKey: venueKeys.detail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.Id) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.VENUE_UPDATED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useRemoveVenueTableConsoleMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, RemoveVenueTableConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "remove"], 
    mutationFn: VenueApi.DeleteVenueTableConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      
      toast.success(t('messages.CONSOLE_REMOVED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useAddVenueTableConsoleMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, AddVenueTableConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "add"], 
    mutationFn: VenueApi.AddVenueTableConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });  
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      
      toast.success(t('messages.CONSOLE_ASSIGNED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, AddStaffRequest>({
    mutationKey: [...venueKeys.staff(), "add"], 
    mutationFn: VenueApi.AddStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.staffListOfVenue(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.STAFF_ADDED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};

export const useRevokeStaffMutation = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const { t } = useLanguage();

  return useMutation<SuccessResult<boolean>, FailResult, RevokeStaffRequest>({
    mutationKey: [...venueKeys.staff(), "revoke"], 
    mutationFn: VenueApi.RevokeStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.staffListOfVenue(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success(t('messages.STAFF_ACCESS_REVOKED_SUCCESSFULLY'));
    },
    onError: (error) => {
      toast.error(getLocalizedMessage(error?.code));
    },
  });
};