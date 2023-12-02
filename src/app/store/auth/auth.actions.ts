import { createAction, props } from "@ngrx/store";
import { LoginModel } from "./auth.model";
import { User } from "../../model/user.model";

export const LOGIN_REQUEST = '[Auth] loginRequest';
export const LOGIN_SUCCESS = '[Auth] loginSuccess';
export const LOGIN_FAILURE = '[Auth] loginFailure';

export const loginRequest = createAction(LOGIN_REQUEST,props<{login:LoginModel}>())
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user:User,accessToken:string,refreshToken:string}>())
export const loginFailure = createAction(LOGIN_FAILURE,props<{error:Error}>())