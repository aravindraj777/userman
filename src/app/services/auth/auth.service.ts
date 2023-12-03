import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../model/user.model';
import { LoginModel } from '../../store/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

 
  private readonly _ACCESS_TOKEN_KEY = 'accessToken';
  private readonly _REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly _AUTH_HEADER = 'authorization';


  login(loginData:LoginModel):Observable<LoginResponse>{
    const body = loginData;
    return this._http.post<LoginResponse>(`auth/signIn`,body)
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

  // refreshToken():Observable<string>{
  //   const refreshToken = this.getRefreshToken();
  //   return this._http.post<string>(`auth/refresh`,{refreshToken});
  // }

  logOut():void{
    localStorage.removeItem(this._ACCESS_TOKEN_KEY);
    localStorage.removeItem(this._REFRESH_TOKEN_KEY);
  }

  

  refreshToken(): Observable<any> {
    const refreshTokenRequest = {
      token: localStorage.getItem(this._REFRESH_TOKEN_KEY) // Assuming you store the refresh token in localStorage
    };

    return this._http.post<any>('auth/refresh', refreshTokenRequest);
  }

}
