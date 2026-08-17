import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPitch } from "../../../BackEndIntegration/Hooks/Queries/usePitchQueries";
import asGUID from "../../../BackEndIntegration/Types/shared/Guid";
import soccerField from "../../Images/premium_synthetic_turf_football_field_at_nig.webp";
import padelCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.webp";
import tennisCourt from "../../Images/professional_hardcourt_tennis_court_at_twili.webp";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function usePitchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const result = useGetPitch(asGUID(id!));
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { t } = useLanguage();

  const getFallback = (type: string) => {
    if (type === "Padel") return padelCourt;
    if (type === "Tennis") return tennisCourt;
    return soccerField;
  };

  return {
    navigate,
    result,
    showDetails,
    setShowDetails,
    getFallback,
    t,
  };
}
