import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, EffectSources, createEffect, ofType } from "@ngrx/effects";
import { loginFailure, loginRequest, loginSuccess } from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { LoginResponse } from "../../model/user.model";

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

    login$ = createEffect(() =>
        this._actions$.pipe(
            ofType(loginRequest),


            switchMap((action) => {
                const loginData = action.login;

                return this._authService.login(loginData).pipe(
                    map((response: LoginResponse) => {
                        const { user, accessToken, refreshToken } = response.data;
                        return loginSuccess({ user, accessToken, refreshToken });
                    }),
                    catchError((error) => of(loginFailure({ error })))

                )
            })
        )

    )
}