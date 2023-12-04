import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, EffectSources, createEffect, ofType } from "@ngrx/effects";
import { LOGIN_FAILURE, loginFailure, loginRequest, loginSuccess } from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { LoginResponse, User } from "../../model/user.model";

@Injectable()
export class AuthEffects {


    constructor(private _actions$: Actions, private _http: HttpClient, private _authService: AuthService) { }


    // login$ = createEffect(() =>
    //     this._actions$.pipe(
    //         ofType(loginRequest),


    //         switchMap((action) => {
    //             const loginData = action.login;

    //             return this._authService.login(loginData).pipe(
    //                 map((response: LoginResponse) => {
    //                     const { user, accessToken, refreshToken } = response.data;
    //                     return loginSuccess({user,accessToken,refreshToken});
    //                 }),
    //                 catchError((error) => of(loginFailure({ error })))

    //             )
    //         })
    //     )

    // )

    // login$ = createEffect(() =>
    //     this._actions$.pipe(
    //         ofType(loginRequest),


    //         switchMap((action) => {
    //             const loginData = action.login;

    //             return this._authService.login(loginData).pipe(
    //                 // map((response: LoginResponse) => {
    //                 //     console.log(response,"response")
    //                 //     const userData = response.data.user;
    //                 //     if(userData){
                            
    //                 //     return loginSuccess({ user:userData });
    //                 //     }
    //                 //     else{
    //                 //         return loginFailure({error:new Error('Invalid')})
    //                 //     }
                        
    //                 // }),

    //                 map((response:LoginResponse) => {
    //                     console.log('API Responseeee:', response);
                      
    //                     const { user, accessToken, refreshToken } = response.data;
                      
    //                     if (user ) {
    //                         console.log(user.email)
    //                       const { id, username, email, phone, password, role } = user;
                      
    //                       // Dispatch the login success action
    //                       return loginSuccess({
    //                         user: { id, username, email, phone, password, role }
                    
    //                       });
    //                     } else {
    //                       console.error('Invalid response structure:', response);
    //                       return loginFailure({ error: new Error('Invalid response structure') });
    //                     }
    //                   }),
                      
                      
    //                 catchError((error) => of(loginFailure({ error })))

    //             )
    //         })
    //     )

    // )



    login$ = createEffect(() =>
  this._actions$.pipe(
    ofType(loginRequest),
    switchMap((action) => {
      const loginData = action.login;
      console.log("Requesting login with data:", loginData);

      return this._authService.login(loginData).pipe(
        map((response: any) => { // Change the type to 'any' if the response structure is not fixed
          console.log("Response from login API:", response);

          // Check if response and response.user are defined
          if (response && response.user) {
            const { user } = response;
            console.log("User data:", user);

            // Dispatch loginSuccess with user data
            return loginSuccess({ user });
          } else {
            console.error("Invalid response structure. Response or response.user is undefined:", response);

            // Dispatch a loginFailure action
            return loginFailure({ error: new Error('Invalid response structure') });
          }
        }),
        catchError((error) => {
          console.error("Error in login API:", error);

          // Dispatch loginFailure action
          return of(loginFailure({ error }));
        })
      );
    })
  )
);

}