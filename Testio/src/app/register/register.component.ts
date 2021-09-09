import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from '../models/auth/register.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor(public auth:AuthService, private fb:FormBuilder) { }


  ngOnInit(): void {
    
  }

  registerForm =  this.fb.group({
    login: ['',Validators.required],
    password: ['', Validators.required],
    email:['', Validators.email]
  })

  register()
  {
    let user:RegisterModel =
    {
      login: this.registerForm.value.login,
      password : this.registerForm.value.password,
      email : this.registerForm.value.email
    }

    this.auth.register(user);
  }

}
