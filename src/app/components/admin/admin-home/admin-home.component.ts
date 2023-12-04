import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../../store/user/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../model/user.model';
import { getError, getUsers } from '../../../store/user/user.selector';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{


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
