import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../../store/auth/auth.selector';
import { User } from '../../../model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menuheader',
  templateUrl: './menuheader.component.html',
  styleUrl: './menuheader.component.css'
})
export class MenuheaderComponent implements OnInit{


  loggedInUser$!:Observable<User|null>
  constructor(private _router:Router,private _authService:AuthService,private _store:Store){}
  ngOnInit(): void {
    this.loggedInUser$ = this._store.select(selectLoggedInUser)
  }

  logOut(){
    this._authService.logOut();
  }
  
  

}
