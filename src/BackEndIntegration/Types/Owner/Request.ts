import type { UpdateCustomerProfileCommand } from "../Customer/Request";

export interface UpdateOwnerProfileCommand extends UpdateCustomerProfileCommand {
  businessName: string;
  taxNumber: string;
}