import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth/login.model';
import { RegisterModel } from '../models/auth/register.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged:boolean ;
  private _responseMessage:string;

  constructor(private router: Router, private http: HttpClient, private notiService:NotificationService ) {
    this._isLogged = false;
    this._responseMessage = null;
   }

  public IsResponseMessage = ():boolean => this._responseMessage != null;
  public IsLogged = ():boolean => this._isLogged;


  public ResponseMessage():string
  {
    setTimeout(()=> this._responseMessage = null,5000);
    return  this._responseMessage;
  }

  login(user: LoginModel)
  {
    this.http.post("https://localhost:5001/api/auth/login", user)
    .subscribe(response => {
      const token = (<any> response).token;
      localStorage.setItem("jwt", token);
      this._isLogged = true;
      this.router.navigate(["/"]);
      this.notiService.notiInformation("Logowanie", "Jesteś zalogowany");
    },
    err =>
    {
      this.notiService.notiError("Logowanie","Nieprawidłowe hasło lub nazwa użytkownika",3000);
      this._isLogged = false;
    })
  }

  register(user: RegisterModel)
  {
    this.http.post("https://localhost:5001/api/auth/register",  user)
    .subscribe(respons => {
      this._responseMessage = "Konto zostało utworzone poprawanie";
      this.notiService.notiInformation("Rejestracja","Konto zostało utworzone poprawanie");
      setTimeout(()=> this.router.navigate(['/login']),5000);
    },
    err =>
    {
      this.notiService.notiError("Rejestracja","Wystąpił błąd podczas tworzenia konta");
      this._responseMessage = "Wystąpił błąd podczas tworzenia konta";
    })
  }

  logOut()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }
}
