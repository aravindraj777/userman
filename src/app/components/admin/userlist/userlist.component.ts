import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../model/user.model';
import { loadUsers } from '../../../store/user/user.action';
import { getUsers, getError } from '../../../store/user/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{


  users:User[] = []
  filteredUsers: User[] = [];
  error$: Observable<any>;
  users$: Observable<User[]>;
  searchTerm: string = '';
  
  constructor(private _store:Store,private _dialog:MatDialog,private _userService:UserService){
    this.users$ = this._store.select(getUsers);
    this.error$ = this._store.select(getError);

   

    this.users$.subscribe((users)=>{
      this.users = users;
      this.filteredUsers = users;
    })

  }

  ngOnInit(): void {
   this._store.dispatch(loadUsers());
   console.log(this._store)
  }

  
  editUser(user:User) {
    const dialogRef = this._dialog.open(EditUserComponent, {
      data: user,
    });
  }

  deleteUser(user:User){
    const userId = user.id;
    this._userService.deleteUser(userId).subscribe(
      (response)=>{
        console.log("success",response)
        this._userService.showDeleteSuccessAlert();
      },
      (error)=>{
        console.log("erro",error);
      }
    )
  }


  onSearchInputChange(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // If there are no matching users
    if (this.filteredUsers.length === 0 && this.searchTerm.trim() !== '') {
      
      console.log("No user found with this email");
    }
  }
  

}
