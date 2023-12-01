import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  private readonly _API_BASE_URL = 'http://localhost:8080/api/v1/auth';
  private readonly _ACCESS_TOKEN_KEY = 'access token';
  private readonly _REFRESH_TOKEN_KEY = 'refresh token';
  private readonly _AUTH_HEADER = 'authorization';


  login(email:string,password:string):Observable<LoginResponse>{
    const signInRequest = {email,password}
    return this._http.get<LoginResponse>(this._API_BASE_URL+'/login',{})
  }
  

}
