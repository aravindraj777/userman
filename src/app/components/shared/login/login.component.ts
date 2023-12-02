import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../../store/auth/auth.actions';
import { LoginModel } from '../../../store/auth/auth.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,private _store:Store) {
    
    
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control('',Validators.compose([Validators.required,Validators.email])),
      password:this._formBuilder.control('',Validators.compose( [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))

    });
  }


  proceedToLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      const loginData: LoginModel = { email, password };
      this._store.dispatch(loginRequest({ login: loginData }));
     }
  }


}
