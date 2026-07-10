import type { GUID } from "../shared/Guid";

export default interface OwnerProfileDto{
  id: GUID;
  fullName: string;
  email: string;
  phoneNumber: string;
   businessName: string;
  taxNumber: string;
   imagePath:string
}
