import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../model/user.model';
import { loadUsers } from '../../../store/user/user.action';
import { getUsers, getError } from '../../../store/user/user.selector';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{


  users$: Observable<User[]>;
  error$: Observable<any>;
  
  constructor(private _store:Store){
    this.users$ = this._store.select(getUsers);
    this.error$ = this._store.select(getError);

  }
  ngOnInit(): void {
   this._store.dispatch(loadUsers());
  }
}
