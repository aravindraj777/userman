import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../../store/auth/auth.selector';
import { User } from '../../../model/user.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { loadUsers } from '../../../store/user/user.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  loggedInUser$!:Observable<User|null>
  profileForm: FormGroup;
  selectedProfilePicture: File | null = null;

  constructor(private _store:Store,private fb: FormBuilder,private _authService:AuthService){

    this.profileForm = this.fb.group({
      profilePicture: ['']

    });
    
  }


  onFileSelected(event: any): void {
    this.selectedProfilePicture = event.target.files[0];
  }



  onUpdateProfilePicture(userId:number): void {
    if (this.selectedProfilePicture) {
    
      if (userId) {
        this._authService.updateProfilePicture(userId, this.selectedProfilePicture).subscribe(
          (response) => {
            console.log('Profile picture updated successfully', response);
           
            this.loggedInUser$ = this._authService.getCurrentUser();
          },
          (error) => {
            console.error('Error updating profile picture', error);
          }
        );
        this.selectedProfilePicture = null; // Reset selected picture after submitting the form
      }
    }
  }


  ngOnInit(): void {
    this.loggedInUser$ = this._store.select(selectLoggedInUser); 
  }



}
