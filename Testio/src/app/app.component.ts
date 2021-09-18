import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Testio';

  constructor(private authService : AuthService, private router:Router ){

    if(authService.IsLogged)
    {
      router.navigate(["/dashboard"]);
    }
    else
    {
      router.navigate(["/login"])
    }

  }
}
