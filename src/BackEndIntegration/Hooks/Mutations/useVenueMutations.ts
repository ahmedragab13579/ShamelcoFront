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

export const useRemoveVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();
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
      toast.success("تم حذف معلومات الطاولة بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء حذف معلومات الطاولة، يرجى المحاولة مرة أخرى.");
    },
  });
};

export const useAddVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

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

      toast.success("تمت إضافة معلومات الطاولة بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إضافة معلومات الطاولة.");
    },
  });
};

export const useRemoveVenueConsoleMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, DeleteConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "remove"], 
    mutationFn: VenueApi.DeleteVenueConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });

      toast.success("تم حذف معلومات الجهاز بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء حذف معلومات الجهاز.");
    },
  });
};

export const useAddVenueConsoleMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<GUID>, FailResult, AddConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "add"], 
    mutationFn: VenueApi.AddVenueConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تمت إضافة معلومات الجهاز بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إضافة معلومات الجهاز.");
    },
  });
};

export const useAddVenueMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<GUID>, FailResult, AddVenueCommand>({
    mutationKey: [...venueKeys.all, "add"], 
    mutationFn: VenueApi.AddVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      toast.success("تمت إضافة المكان التجاري بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إضافة المكان.");
    },
  });
};

export const useUpdateVenueTableMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, UpdateVenueTableCommand>({
    mutationKey: [...venueKeys.tables(), "update"], 
    mutationFn: VenueApi.UpdateVenueTable,
    onSuccess: (_, variables) => { // Variables -> variables
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tables() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlans() });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تم تحديث معلومات الطاولة بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تحديث معلومات الطاولة.");
    },
  });
};

export const useUpdateVenueMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, UpdateVenueCommand>({
    mutationKey: [...venueKeys.all, "update"], 
    mutationFn: VenueApi.UpdateVenue,
    onSuccess: (_, variables) => { // Variables -> variables
      queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
      queryClient.invalidateQueries({ queryKey: venueKeys.detail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venues() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.venueDetails(variables.Id) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تم تحديث معلومات المكان التجاري بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء تحديث معلومات المكان.");
    },
  });
};

export const useRemoveVenueTableConsoleMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, RemoveVenueTableConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "remove"], 
    mutationFn: VenueApi.DeleteVenueTableConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      
      toast.success("تم حذف معلومات وحدة التحكم من الطاولة بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء حذف معلومات وحدة التحكم.");
    },
  });
};

export const useAddVenueTableConsoleMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, AddVenueTableConsoleCommand>({
    mutationKey: [...venueKeys.consoles(), "add"], 
    mutationFn: VenueApi.AddVenueTableConsole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.consoles() });
      queryClient.invalidateQueries({ queryKey: venueKeys.consolesListOfVenue(variables.VenueId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.tableDetail(variables.Id) });  
      queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });
      queryClient.invalidateQueries({ queryKey: venueKeys.floorPlan(variables.VenueId) });
      
      toast.success("تمت إضافة معلومات وحدة التحكم إلى الطاولة بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إضافة معلومات وحدة التحكم.");
    },
  });
};

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, AddStaffRequest>({
    mutationKey: [...venueKeys.staff(), "add"], 
    mutationFn: VenueApi.AddStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.staffListOfVenue(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تمت إضافة الموظف بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء إضافة الموظف.");
    },
  });
};

export const useRevokeStaffMutation = () => {
  const queryClient = useQueryClient();
  const{user} = useAuth();

  return useMutation<SuccessResult<boolean>, FailResult, RevokeStaffRequest>({
    mutationKey: [...venueKeys.staff(), "revoke"], 
    mutationFn: VenueApi.RevokeStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: venueKeys.staffListOfVenue(variables.VenueId) });
            queryClient.invalidateQueries({ queryKey: NotificationKeys.list(asGUID(user?.userId||"00000000-0000-0000-0000-000000000000")) });

      toast.success("تم سحب صلاحيات الموظف بنجاح!");
    },
    onError: (error) => {
      toast.error(error?.error || "حدث خطأ أثناء سحب صلاحيات الموظف.");
    },
  });
};