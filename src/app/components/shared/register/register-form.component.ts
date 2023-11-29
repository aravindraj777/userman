import { Component,  OnDestroy,  OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { RegisterApiResponse } from '../../../model/user.model';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit,OnDestroy{

  registerForm!:FormGroup;
  status:boolean=false;
  private _registerSubscription!:Subscription;

  constructor(private formBuilder:FormBuilder,private _userService:UserService,private _dialog:MatDialog ){}
 
  


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:this.formBuilder.control('',Validators.required),
      email: this.formBuilder.control('',Validators.compose([Validators.required,Validators.email])),
      phone: this.formBuilder.control('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
      password: this.formBuilder.control('',Validators.compose( [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    })
  }


 proceedToRegister() {
    console.log(this.registerForm.value);
  
      if (this.registerForm.valid) {
      this._registerSubscription = this._userService.registerUser(this.registerForm.value).subscribe({
        next: (res: RegisterApiResponse) => {
          this.showModal(res.status, res.message);
        },
        error: (error) => {
          if (error.status === 400 && error.error.status === 'Failed') {
            this.showModal('error', error.error.message || 'Failed to register user');
          } else {
            this.showModal('error', 'Unexpected error. Please try again later.');
          }
        },
        complete: () => {
         this.registerForm.reset()
        }
      });
    }


  }

  showModal(status: string, message: string) {
    this._dialog.open(ModalComponent, {
      width: '300px',
      data: { title: status.toUpperCase(), message: message },
    });
  }

  ngOnDestroy(): void {
    if(this._registerSubscription){
      this._registerSubscription.unsubscribe();
    }
  }


  
}

  
   

  
 


