import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TaskService]
})
export class HomeComponent{

  constructor(public auth:AuthService) { }

}
