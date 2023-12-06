import { Injectable } from '@angular/core';
import { RegisterApiResponse, User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient,private _toaster:ToastrService){ }


  registerUser(userData:FormData):Observable<RegisterApiResponse>{
    return this._http.post<RegisterApiResponse>('auth/signup',userData)
  }

  getAllUsers():Observable<any>{
    return this._http.get('auth/all-users');
  }

  
  updateUserDetails(userId: number, updatedUserData: any): Observable<any> {
    const url = `auth/edit-user/${userId}`;
    return this._http.put<User>(url, updatedUserData);
  }

  deleteUser(userId:number):Observable<any>{
    const url = `auth/delete-user/${userId}`;
    return this._http.delete(url);
  }

  showDeleteSuccessAlert():void{
    this._toaster.success("USER DELETED");
  }

  
}
