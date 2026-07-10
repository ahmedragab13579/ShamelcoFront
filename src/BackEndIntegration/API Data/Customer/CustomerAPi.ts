import type { SearchPlacesQuery, UpdateCustomerProfileCommand } from "../../Types/Customer/Request";
import type { CustomerProfileDto, PlaceSearchDto } from "../../Types/Customer/Response";
import type PagedResult from "../../Types/Result/PagedResult";
import type SuccessResult from "../../Types/Result/Success";
import type { PaginationParams } from "../Booking/BookingApi";
import apiClient from "../SharedAPIConfig/api";

export const CustomerApi = {
  GetTopRating: async (data:PaginationParams): Promise<SuccessResult<PagedResult<PlaceSearchDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<PlaceSearchDto>>>(
      `customer/places/top-rated`,
      {params:data}
    );
    
  },
  GetProfile: async (): Promise<SuccessResult<CustomerProfileDto>> => {
    return await apiClient.get<never,SuccessResult<CustomerProfileDto>>(
      `customer/profile`,
    );
    
  },
  GetSearchingPlaces: async (
    data: SearchPlacesQuery,
  ): Promise<SuccessResult<PagedResult<PlaceSearchDto>>> => {
    return await apiClient.get<never,SuccessResult<PagedResult<PlaceSearchDto>>>(
      `customer/places/search`,
      {
        params: data,
      },
    );
    
  },
  UpdateProfile: async (data: UpdateCustomerProfileCommand): Promise<SuccessResult<boolean>> => {
  const formData = new FormData();

  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  formData.append('phoneNumber', data.phoneNumber);
  
  if (data.image) {
    formData.append('image', data.image);
  }

  return await apiClient.put<never, SuccessResult<boolean>>(
    "customer/profile",
    formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
},
};
