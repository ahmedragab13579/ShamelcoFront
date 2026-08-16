import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setupPitchSchema, type SetupPitchInput } from "../../validations/setupSchema";
import { useAuth } from "../../../Context/Auth/AuthContext";
import type { PitchType } from "../../../BackEndIntegration/Types/Enums/AppEnums";
import { useAddPitchMutation } from "../../../BackEndIntegration/Hooks/Mutations/usePitchMutations";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useSetupPitch() {
  const nav = useNavigate();
  const AddPitch = useAddPitchMutation();
  const { user, loginState } = useAuth();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SetupPitchInput>({
    resolver: zodResolver(setupPitchSchema),
  });

  const onSubmit = (data: SetupPitchInput) => {
    AddPitch.mutate(
      {
        name: data.Name,
        type: data.Type as PitchType,
        hourlyRate: data.HourlyRate,
        capacity: data.Capacity,
        governorateId: data.GovernorateId,
        cityId: data.CityId,
      },
      {
        onSuccess: (response) => {
          if (user) {
            user.pitchId = response.data;
            loginState(user);
          }
          nav(`/dashboard/pitch/${response.data}`);
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
    isPending: AddPitch.isPending,
    t,
  };
}
