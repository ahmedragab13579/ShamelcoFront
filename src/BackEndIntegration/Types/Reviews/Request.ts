import type { PlaceType } from "../Enums/AppEnums";

export interface SubmitReviewCommand {
  placeId: string;
  placeType: PlaceType;
  rating: number;
  comment?: string; 
}


