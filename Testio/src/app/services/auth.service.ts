import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth/login.model';
import { RegisterModel } from '../models/auth/register.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged:boolean ;

  constructor(private router: Router, private http: HttpClient, private notificationService:NotificationService ) {
    this._isLogged = false;
   }

  public IsLogged = ():boolean => this._isLogged;

  login(user: LoginModel)
  {
    this.http.post("https://localhost:5001/api/auth/login", user)
    .subscribe(response => {
      const token = (<any> response).token;
      localStorage.setItem("jwt", token);
      this._isLogged = true;
      this.router.navigate(["/"]);
    },
    err =>
    {
      console.log(err);
      this.notificationService.notiWarning("Logowanie",err.error,3000);
      this._isLogged = false;
    })
  }

  register(user: RegisterModel)
  {
    this.http.post("https://localhost:5001/api/auth/register",  user)
    .subscribe(respons => {
      this.notificationService.notiInformation("Rejestracja","Konto zostało utworzone poprawanie. Witaj na pokładzie " + user.login, 300);
      setTimeout(()=> this.router.navigate(['/login']),5000);
    },
    err =>
    {
      this.notificationService.notiError("Rejestracja",err.error,3000);
    })
  }

  logOut()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }
}
