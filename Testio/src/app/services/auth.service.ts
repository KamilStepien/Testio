import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth/login.model';
import { RegisterModel } from '../models/auth/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged:boolean ;
  private _responseMessage:string;

  constructor(private router: Router, private http: HttpClient, ) {
    this._isLogged = false;
    this._responseMessage = null;
   }

  isResponseMessage()
  {
    return this._responseMessage != null;
  }

  isLogged()
  {
    return this._isLogged;
  }

  responseMessage()
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
      this._isLogged = false;
      this.router.navigate(["/"]);
    },
    err =>
    {
      this._isLogged = true;
    })
  }

  register(user: RegisterModel)
  {
    this.http.post("https://localhost:5001/api/auth/register",  user)
    .subscribe(respons => {
      this._responseMessage = "Konto zostało utworzone poprawanie";
      setTimeout(()=> this.router.navigate(['/login']),5000);
    },
    err =>
    {
      this._responseMessage = "Wystąpił błąd podczas tworzenia konta";
    })
  }

  logOut()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }
}
