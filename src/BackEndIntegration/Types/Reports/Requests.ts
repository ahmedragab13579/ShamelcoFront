import type { PlaceType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";

export interface BaseReportRequest {
  Id: GUID; 
  type:PlaceType;
  startDate: Date; 
  endDate: Date; 
}