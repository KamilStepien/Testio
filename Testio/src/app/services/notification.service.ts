import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { notificationModel } from '../models/notification/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public subject: Subject<string>

  constructor() {
    this.subject = new Subject<string>();
  }

  public addNotification(message:string)
  {
    this.subject.next(message);
  }

}
