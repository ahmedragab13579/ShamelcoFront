
export interface UpdateCustomerProfileCommand {
  fullName: string;
  email: string;
  phoneNumber: string;  
  image?:File|null;
}


export interface SearchPlacesQuery {
  searchTerm: string;
  category: string;
  typeFilter?: string; 
  page?: number;       
  pageSize?: number;   
}


