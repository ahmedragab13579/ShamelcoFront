export interface GovernorateDto {
  id: number;
  nameEn: string;
  nameAr: string;
}

export interface CityDto {
  id: number;
  governorateId: number;
  nameAr: string;
  nameEn: string;
}
