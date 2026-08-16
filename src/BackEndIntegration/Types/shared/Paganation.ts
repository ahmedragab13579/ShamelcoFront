export default interface Pagination {
  pageSize: number;
  page: number;
}

export interface PlaceFilterParams extends Pagination {
  governorateId?: number;
  cityId?: number;
}
