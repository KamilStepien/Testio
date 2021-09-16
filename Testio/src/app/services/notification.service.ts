import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {NotificationModel } from '../models/notification/notification.model';
import { NotificationLevelEnum } from '../models/notification/notificationEnums.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifications$: Subject<NotificationModel>

  constructor() {
    this.notifications$ = new Subject<NotificationModel>();
  }

  private noti(model:NotificationModel)
  {
    this.notifications$.next(model);
  }

  public notiInformation(title: string, description:string, interval?:number)
  {
    let model: NotificationModel =
    {
      title: title,
      description : description,
      level: NotificationLevelEnum.Information,
      interval: interval
    }

    this.noti(model);
  }

  public notiWarning(title: string, description:string, interval?:number)
  {
    let model: NotificationModel =
    {
      title: title,
      description : description,
      level: NotificationLevelEnum.Warning,
      interval: interval
    }

    this.noti(model);
  }

  public notiError(title: string, description:string, interval?:number)
  {
    let model: NotificationModel =
    {
      title: title,
      description : description,
      level: NotificationLevelEnum.Error,
      interval: interval
    }

    this.noti(model);
  }

}
