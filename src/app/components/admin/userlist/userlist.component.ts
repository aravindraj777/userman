import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  error$: Observable<any>;
  users$: Observable<User[]>;
  
  constructor(private _store:Store,private _dialog:MatDialog,private _userService:UserService){
    this.users$ = this._store.select(getUsers);
    this.error$ = this._store.select(getError);

    this.users$.subscribe((users)=>{
      this.users = users;
    })

  }
  
  ngOnInit(): void {
   this._store.dispatch(loadUsers());
  }

  
  editUser(user:User) {
    const dialogRef = this._dialog.open(EditUserComponent, {
      data: user,
    });

   
  }
}
