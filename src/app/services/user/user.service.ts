import { Injectable } from '@angular/core';
import { RegisterApiResponse } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }


  registerUser(userData:FormData):Observable<RegisterApiResponse>{
    return this._http.post<RegisterApiResponse>('auth/signup',userData)
  }

  getAllUsers():Observable<any>{
    return this._http.get('auth/all-users');
  }

  
  
}
