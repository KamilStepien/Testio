import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/login.model';
import { AuthService } from 'src/app/services/auth.service';


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
      login: ['',Validators.required],
      password: ['', Validators.required]
    }
  )

  login()
  {
    let user: LoginModel =
    {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    }

    this.auth.login(user);
  }



}
