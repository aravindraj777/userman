

import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
 export class AuthInterceptor implements HttpInterceptor{


    constructor(private _authService:AuthService){}

    intercept(request:HttpRequest<unknown>,next:HttpHandler){
        const _BASE_URL = 'http://localhost:8080/api/v1/'

        let apiRequest = request.clone({
            url:_BASE_URL+request.url
        })
        console.log(request)
        
        const accessToken = this._authService.getAccessToken();
        const refreshToken = this._authService.getRefreshToken();

        
        if(accessToken){
            apiRequest.clone({
                setHeaders:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }

        
        return next.handle(apiRequest).pipe(
            tap((event)=>{
                if(event.type === HttpEventType.Response && event.status === 200){
                    console.log(event.body)
                    const {token,refreshToken,user} = event.body;
                    localStorage.setItem('accessToken',token);
                    localStorage.setItem('refreshToken',refreshToken);
                   
                   
                 }
               
            })
            
        )
    }

}

