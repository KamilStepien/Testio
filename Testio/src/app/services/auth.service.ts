import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged:boolean;

  constructor(private router: Router, private http: HttpClient, ) { }

  isLogged()
  {
    return this._isLogged
  }

  login(login: LoginModel):boolean
  {
    this.http.post("https://localhost:5001/api/auth/login", login)
    .subscribe(response => {
      const token = (<any> response).token;
      localStorage.setItem("jwt", token);
      this._isLogged = false;
      this.router.navigate(["/"]);
      return true;
    },
    err =>
    {
      this._isLogged = true;

    })
    return false;
  }

  logOut()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"])
  }



}
