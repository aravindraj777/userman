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


  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginRequest),
      switchMap((action) => {
        const loginData = action.login;
        console.log("Requesting login with data:", loginData);
        return this._authService.login(loginData).pipe(
          map((response: any) => {
            console.log("Response from login API:", response);
            if (response && response.user) {
              const { user } = response;
              console.log("User dataaaaaa:", user);
              return loginSuccess({ user });
            } else {
              console.error("Invalid response structure. Response or response.user is undefined:", response);
              return loginFailure({ error: new Error('Invalid response structure') });
            }
          }),
          catchError((error) => {
            console.error("Error in login API:", error);
            return of(loginFailure({ error }));
          })
        );
      })
    )
  );

}