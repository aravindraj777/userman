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

 
  private readonly _ACCESS_TOKEN_KEY = 'access token';
  private readonly _REFRESH_TOKEN_KEY = 'refresh token';
  private readonly _AUTH_HEADER = 'authorization';


  login(loginData:LoginModel):Observable<LoginResponse>{
    const body = loginData;
    return this._http.post<LoginResponse>(`auth/signIn`,body)
  }
  

}
