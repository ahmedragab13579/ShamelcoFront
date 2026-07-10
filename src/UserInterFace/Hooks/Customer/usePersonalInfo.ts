import { useState } from "react";
import type { CustomerProfileDto } from "../../../BackEndIntegration/Types/Customer/Response";
import type { UpdateCustomerProfileCommand } from "../../../BackEndIntegration/Types/Customer/Request";
import { useUpdateCustomerProfileMutation } from "../../../BackEndIntegration/Hooks/Mutations/useCustomerMutations";

export function usePersonalInfo({profileData,image}: {profileData:CustomerProfileDto | undefined,image:File|null}) {
  const [formData, setFormData] = useState<UpdateCustomerProfileCommand>({
    fullName: profileData?.fullName || "",
    email: profileData?.email || "",
    phoneNumber: profileData?.phoneNumber || "",
  });

  const mutate = useUpdateCustomerProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isChanged =
    formData.fullName !== (profileData?.fullName || "") ||
    formData.email !== (profileData?.email || "") ||
    formData.phoneNumber !== (profileData?.phoneNumber || "")||
    image !== null;

  const handleUpdate = () => {
    mutate.mutate({...formData,image: image});
  };

  return {
    formData,
    handleChange,
    isChanged,
    handleUpdate,
  };
}