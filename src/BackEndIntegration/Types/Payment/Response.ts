import type { GUID } from "../shared/Guid";

export interface InitiatePaymentCommandResponse{
    Link:string;
    targetId: GUID;
    targetTableId?: GUID;
    userId: GUID;
}