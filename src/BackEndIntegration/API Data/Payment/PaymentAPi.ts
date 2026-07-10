import type { InitiatePaymentCommand } from "../../Types/Payment/Request";
import type { InitiatePaymentCommandResponse } from "../../Types/Payment/Response";
import type SuccessResult from "../../Types/Result/Success";
import apiClient from "../SharedAPIConfig/api";

export const PaymentAPi={
    InitiatePayment: async (data: InitiatePaymentCommand): Promise<SuccessResult<InitiatePaymentCommandResponse>> => {
    return await apiClient.post<never,SuccessResult<InitiatePaymentCommandResponse>>(
      "payment/initiate",
      data,
    );
    
  },
   

}