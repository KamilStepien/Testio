import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/auth/register.model';
import { AuthService } from 'src/app/services/auth.service';
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
    login: ['',[Validators.required,Validators.maxLength(20)]],
    password: ['',[Validators.required,Validators.maxLength(20)]],
    email:['',[Validators.email,Validators.maxLength(30)]]
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
