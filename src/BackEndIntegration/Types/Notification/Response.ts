import type { GUID } from "../shared/Guid";


export interface NotificationDto {
    id: GUID;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: Date;
}