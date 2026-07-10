export default interface PagedResult<T> extends Page {
  items: T[];
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page{
  pageNumber:number;
  pageSize:number;
}



