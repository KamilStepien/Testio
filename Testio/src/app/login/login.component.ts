import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin:boolean

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder ) { }

  loginForm = this.fb.group(
    {
      username: ['',Validators.required],
      email: ['',Validators.email],
      password: ['', [Validators.minLength(8),Validators.required]]
    }
  )

  login()
  {
    const credentials = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password
    }

    this.http.post("https://localhost:5001/api/auth/login", credentials)
    .subscribe(response => {
      const token = (<any> response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    },
    err =>
    {
      this.invalidLogin = true;
    })

  }

}
