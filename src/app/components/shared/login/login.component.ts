import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('',Validators.compose([Validators.required,Validators.email])),
      password:this.formBuilder.control('',Validators.compose( [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))

    });
  }


  proceedToLogin(){
    if(this.loginForm.valid){
      const {email,password} = this.loginForm.value;
      this
    }
  }
}
