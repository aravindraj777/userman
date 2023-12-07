

// import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { tap } from "rxjs";
// import { AuthService } from "../auth.service";

// @Injectable()
//  export class AuthInterceptor implements HttpInterceptor{


//     constructor(private _authService:AuthService){}

//     intercept(request:HttpRequest<unknown>,next:HttpHandler){
//         const _BASE_URL = 'http://localhost:8080/api/v1/'

//         let apiRequest = request.clone({
//             url:_BASE_URL+request.url
//         })
//         console.log(request)
        
//         const accessToken = this._authService.getAccessToken();
//         const refreshToken = this._authService.getRefreshToken();
//         console.log(accessToken,"ggg")
//         console.log("jbfsnkjbns")

        
//         if (accessToken) {
//             apiRequest = apiRequest.clone({  // Assign the result of clone back to apiRequest
//                 setHeaders: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//         }
        
//         return next.handle(apiRequest).pipe(
//             tap((event)=>{
//                 if(event.type === HttpEventType.Response && event.status === 200){
//                     console.log(event.body,"Response from bodyy")
//                   const {token,refreshToken,user} = event.body;
//                   this._authService.setAccessToken(token);
//                     this._authService.setRefreshToken(refreshToken);
//                     console.log(accessToken,"accccccc")

//                     if (token) {
//                         this._authService.setAccessToken(token);
//                         console.log(token, "Updated access token");
//                     }
                   
                   
//                  }
                
                
                

                 
               
//             })
            
//         )
//     }

// }


import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError, switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<any> {
        const _BASE_URL = 'http://localhost:8080/api/v1/';

        let apiRequest = request.clone({
            url: _BASE_URL + request.url
        });

        let accessToken = this._authService.getAccessToken();

        if (accessToken) {
            // Add the Authorization header only if an access token is present
           apiRequest = apiRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(apiRequest).pipe(
            tap(
                (event) => {
                    if (event.type === HttpEventType.Response && event.status === 200) {
                        const { token, refreshToken, user } = event.body;

                        if (token) {
                            // Update the access token in the service
                            this._authService.setAccessToken(token);
                            apiRequest.clone({
                                setHeaders:{
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            console.log("Updated access token:", token);
                        }

                        if (refreshToken) {
                            // Update the refresh token in the service
                            this._authService.setRefreshToken(refreshToken);
                            console.log("Updated refresh token:", refreshToken);
                        }

                        console.log("Response from body:", event.body);
                    }
                },
                catchError((error) => {
                    if (error.status === 403 ) {
                       
                        console.log("Unauthorized error. Redirect to login page or refresh token.");
                        
                        // return this.handleUnauthorizedError();
                        this._authService.refreshToken();

                    }
                    return throwError(error);
                })
            )
        );
    }
}


