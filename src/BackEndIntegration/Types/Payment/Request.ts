import type { JsonValue, PaymentMethod } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";

export interface InitiatePaymentCommand {
    BookingId:GUID;
    PaymentMethod:PaymentMethod;
    WalletMobileNumber?:string;
}

export interface ProcessPaymobWebhookCommand {
    Hmac:string;
    Payload:JsonValue;
}