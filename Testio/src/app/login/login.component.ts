import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/auth/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin:boolean

  constructor(private fb: FormBuilder, public auth:AuthService ) { }

  loginForm = this.fb.group(
    {
      username: ['',Validators.required],
      email: ['',Validators.email],
      password: ['', [Validators.minLength(8),Validators.required]]
    }
  )

  login()
  {
    let login: LoginModel =
    {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.auth.login(login);
  }



}
