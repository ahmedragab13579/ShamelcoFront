import type { PlaceType } from "../../../../BackEndIntegration/Types/Enums/AppEnums";
import { SetupPitchForm } from "./SetupPitchForm";
import { SetupVenueForm } from "./SetupVenueForm";

interface SetupStepTwoProps {
  businessType: PlaceType;
  userId: string;
}

export default function SetupStepTwo({ businessType }: SetupStepTwoProps) {
  return businessType === "Pitch" ? <SetupPitchForm /> : <SetupVenueForm />;
}