import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setupVenueSchema, type SetupVenueInput } from "../../validations/setupSchema";
import { useAuth } from "../../../Context/Auth/AuthContext";
import type { VenueType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { useAddVenueMutation } from "../../../BackEndIntegration/Hooks/Mutations/useVenueMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useSetupVenue() {
  const nav = useNavigate();
  const AddVenue = useAddVenueMutation();
  const { user, loginState } = useAuth();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SetupVenueInput>({
    resolver: zodResolver(setupVenueSchema),
  });

  const onSubmit = (data: SetupVenueInput) => {
    AddVenue.mutate(
      {
        name: data.Name,
        type: data.Type as VenueType,
        hourRate: data.hourRate,
        governorateId: data.GovernorateId,
        cityId: data.CityId,
      },
      {
        onSuccess: (response) => {
          if (user) {
            user.venueId = response.data;
            loginState(user);
          }
          nav(`/dashboard/venue/${response.data}`);
        },
      }
    );
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    onSubmit,
    isPending: AddVenue.isPending,
    t,
  };
}
