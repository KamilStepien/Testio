import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef} from '@angular/core';
import { NotificationModel } from 'src/app/models/notification/notification.model';
import { NotificationLevelEnum } from 'src/app/models/notification/notificationEnums.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class NotificationItemComponent {

  protected _notification: NotificationModel
  protected aShow = true;

  public get Title ()
  {
    return this._notification.title
  }

  public get Description ()
  {
    return this._notification.description
  }

  public get Level ()
  {
    return this._notification.level
  }

  public get NotificationLevelEnum()
  {
    return NotificationLevelEnum
  }

  get stateName() {
    return this.aShow ? 'show' : 'hide'
  }

  constructor(private ref: ElementRef){}

  public displayNotification()
  {
     if(this._notification.interval)
     {
      setTimeout(() => this.deleteNotification() , this._notification.interval);
     }
  }

  public createNotification(notyfication:NotificationModel)
  {
    this._notification = notyfication
  }

  public deleteNotification()
  {
    this.aShow = !this.aShow;
  }

  public animEnd(event)
  {
    if(event.toState == "hide")
    {
      this.ref.nativeElement.remove();
    }
  }

}
