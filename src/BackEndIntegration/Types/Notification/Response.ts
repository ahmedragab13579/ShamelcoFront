import type { NotificationType } from "../Enums/AppEnums";
import type { GUID } from "../shared/Guid";


export interface NotificationDto {
    id: GUID;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
}