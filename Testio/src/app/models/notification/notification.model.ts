import { NotificationLevelEnum } from "./notificationEnums.model";

export class NotificationModel
{
  title: string;
  description: string;
  level:NotificationLevelEnum;
  interval?:number
}
