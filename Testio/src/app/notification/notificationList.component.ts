import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import { NotificationModel } from '../models/notification/notification.model';
import { NotificationService } from '../services/notification.service';
import { NotificationItemComponent } from './notification-item/notification-item.component';

@Component({
  selector: 'app-notificationList',
  templateUrl: './notificationList.component.html',
  styleUrls: ['./notificationList.component.scss']
})
export class NotificationListComponent{
  @ViewChild('notificatioList', {static : false, read : ViewContainerRef}) target: ViewContainerRef;

  constructor(public notiServics:NotificationService,private resolver: ComponentFactoryResolver) {


    this.notiServics.notifications$.subscribe(
      {
        next:(notification) =>
        {
          if(notification)
          {
            this.createNewNotifcationItem(notification)
          }
        }
      }
    );
  }

  private createNewNotifcationItem(model:NotificationModel)
  {
    let childComponent = this.resolver.resolveComponentFactory(NotificationItemComponent);
    let componentRef = this.target.createComponent(childComponent);
    componentRef.instance.createNotification(model);
    componentRef.instance.displayNotification();
  }
}
