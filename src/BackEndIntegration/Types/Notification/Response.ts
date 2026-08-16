import type { GUID } from "../shared/Guid";


export interface NotificationDto {
  id: GUID;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}