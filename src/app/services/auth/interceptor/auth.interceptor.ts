import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../../../model/user.model";

@Injectable()
 export class AuthInterceptor implements HttpInterceptor{


    intercept(request:HttpRequest<unknown>,next:HttpHandler){
        const _BASE_URL = 'http://localhost:8080/api/v1/'

        let apiRequest = request.clone({
            url:_BASE_URL+request.url
        })
        console.log(request)
        return next.handle(apiRequest).pipe(



            tap((event)=>{
                if(event.type === HttpEventType.Response && event.status === 200){
                    const {token,refreshToken,user} = event.body;
                    localStorage.setItem('accessToken',token);
                    localStorage.setItem('refreshToken',refreshToken);
                    console.log("acc",localStorage.getItem('refreshToken'))
                }

               
            })
        )
    }

}