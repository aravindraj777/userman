import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user.model";

export const LOAD_USERS =  '[Auth] load Users';
export const LOAD_USERS_SUCCESS = '[Auth] load Users Success';
export const LOAD_USERS_FAILURE = '[Auth] load Users Failure';


export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS,props<{users:User[]}>());
export const loadUsersFailure = createAction(LOAD_USERS_FAILURE,props<{error:Error}>());