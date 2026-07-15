import type { GUID } from "../shared/Guid";

export interface InitiatePaymentCommandResponse{
    link:string;
    targetId: GUID;
    targetTableId?: GUID;
    userId: GUID;
}