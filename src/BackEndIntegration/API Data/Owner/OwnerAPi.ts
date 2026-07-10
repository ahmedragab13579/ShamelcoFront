import type { UpdateOwnerProfileCommand } from "../../Types/Owner/Request";
import type OwnerProfileDto from "../../Types/Owner/Response";
import type SuccessResult from "../../Types/Result/Success";
import apiClient from "../SharedAPIConfig/api";

export const OwnerAPi={
    UpdateOwnerProfile:async(data:UpdateOwnerProfileCommand):Promise<SuccessResult<boolean>>=>{
      const formData = new FormData();
   formData.append('fullName', data.fullName);
   formData.append('email', data.email);
   formData.append('phoneNumber', data.phoneNumber);
   formData.append('taxNumber', data.taxNumber);
   formData.append('businessName', data.businessName);
   if (data.image) {
    formData.append('image', data.image);
  }
        return await apiClient.put<never,SuccessResult<boolean>>(`Owner`,formData,{
           headers: {
        'Content-Type': 'multipart/form-data'
      }});
    },
    GetOwnerProfile: async (): Promise<SuccessResult<OwnerProfileDto>> => {
    return await apiClient.get<never,SuccessResult<OwnerProfileDto>>(`Owner/profile`);
    
  },
}

