import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-menuheader',
  templateUrl: './menuheader.component.html',
  styleUrl: './menuheader.component.css'
})
export class MenuheaderComponent {


  constructor(private _router:Router,private _authService:AuthService){}

  logOut(){
    this._authService.logOut();
  }
  

}
