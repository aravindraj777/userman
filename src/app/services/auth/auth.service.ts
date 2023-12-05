import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../model/user.model';
import { LoginModel } from '../../store/auth/auth.model';
import { Store } from '@ngrx/store';
import { RootState } from '../../store/Global/Root.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _store:Store<RootState>,private _router:Router) { }

 
  private readonly _ACCESS_TOKEN_KEY = 'token';
  private readonly _REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly _AUTH_HEADER = 'authorization';


  // login(loginData:LoginModel):Observable<LoginResponse>{
  //   const body = loginData;
  //   return this._http.post<LoginResponse>(`auth/signIn`,body)
  // }

  // login(loginData: LoginModel): Observable<LoginResponse> {
  //   const body = loginData;
  //   return this._http.post<LoginResponse>(`auth/signIn`, body).pipe(
  //     tap(response => {
  //       const user = response?.data?.user;

  //       console.log(user)
  //       if (user) {
  //         // Redirect based on the user's role
  //         if (user.role === "ADMIN") {
  //           this._router.navigate(['adminhome']); // Redirect admin to admin-panel
  //         } else {
  //           this._router.navigate(['userhome']); // Redirect other users to userhome
  //         }
  //       }
  //     })
  //   );
  // }


  login(loginData: LoginModel): Observable<LoginResponse> {
    const body = loginData;
    return this._http.post<LoginResponse>(`auth/signIn`, body).pipe(
      tap(response => {
        const user = response?.user;

        console.log(user);

        if (user) {
          // Redirect based on the user's role
          if (user.role === "ADMIN") {
            this._router.navigate(['adminhome']); // Redirect admin to admin-panel
          } else {
            this._router.navigate(['userhome']); // Redirect other users to userhome
          }
        }
      })
    );
  }

  
  getAccessToken():string | null{
    return localStorage.getItem(this._ACCESS_TOKEN_KEY);
  }

  setAccessToken(token:string):void{
    localStorage.setItem(this._ACCESS_TOKEN_KEY,token);
  }

  getRefreshToken():string | null{
    return localStorage.getItem(this._REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token:string):void{
    localStorage.setItem(this._REFRESH_TOKEN_KEY,token);
  }


  logOut():void{
    localStorage.removeItem(this._ACCESS_TOKEN_KEY);
    localStorage.removeItem(this._REFRESH_TOKEN_KEY);
    this._router.navigate([""])
  }

  

  refreshToken(): Observable<any> {
    const refreshTokenRequest = {
      token: localStorage.getItem(this._REFRESH_TOKEN_KEY) // Assuming you store the refresh token in localStorage
    };

    return this._http.post<any>('auth/refresh', refreshTokenRequest);
  }

  getCurrentUser(){
    
     const user =  this._store.select(state=>state.auth.user);
     console.log(user);
     return user;
  }

  

}
