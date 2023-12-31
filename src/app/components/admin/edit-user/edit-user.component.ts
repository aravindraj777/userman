import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user/user.service';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../../store/user/user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  user!:User;
  editForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:User,
    private _dialogRef:MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    private _store:Store
    ){

      if(data){

      this.editForm = this.fb.group({
        username: [this.data.username, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        phone:[this.data.phone,[Validators.required]],
        role: [this.data.role, Validators.required],
  })
  };
}

  
  onSaveChanges() {
    if (this.editForm.valid) {
      const userId = this.data.id; 
      const updatedUserData = this.editForm.value;
      
      // Call the user service
      this._userService.updateUserDetails(userId, updatedUserData).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);
          //  close the dialog 
          this._dialogRef.close(response);
          this._store.dispatch(loadUsers());


        },
        (error) => {
          console.error('Error updating user details:', error);
         
        }
      );
    }
  }
  
    
    
    
}



