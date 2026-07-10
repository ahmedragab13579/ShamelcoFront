export interface ReviewDto {
  id: string;
  placeName?: string; 
  rating: number;
  comment?: string;   
  createdAt: Date;  
}