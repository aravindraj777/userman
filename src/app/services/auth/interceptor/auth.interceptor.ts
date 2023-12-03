// import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable, catchError, switchMap, tap, throwError } from "rxjs";
// import { AuthService } from "../auth.service";

// @Injectable()
//  export class AuthInterceptor implements HttpInterceptor{

//     constructor(private _authService:AuthService){}

//     intercept(request:HttpRequest<unknown>,next:HttpHandler):Observable<any>{
//         const _BASE_URL = 'http://localhost:8080/api/v1/'

//         let apiRequest = request.clone({
//             url:_BASE_URL+request.url
//         });

//         const accessToken = this._authService.getAccessToken();
//         const refreshToken = this._authService.getRefreshToken();


//         if(accessToken){
//             apiRequest = apiRequest.clone({
//                 setHeaders:{
//                     Authorization:`Bearer ${accessToken}`
//                 }
//             });
//         } 


//         return next.handle(apiRequest).pipe(
//             tap((event)=>{
//                 if(event.type === HttpEventType.Response && event.status === 200){
//                     const {token,refreshToken,user} = event.body;
//                     localStorage.setItem('accessToken',token);
//                     localStorage.setItem('refreshToken',refreshToken);
//                     console.log("acc",localStorage.getItem('refreshToken'))
//                  }

               
//             })
//         )


//       }

//     }


import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

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

