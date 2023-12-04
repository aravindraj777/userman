import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.action";

export const _userReducer = createReducer(userState,
    on(loadUsers, (state) => ({ ...state, loading: true, error: null })),

    on(loadUsersSuccess, (state, { users }) => 
    ({ ...state, users, loading: false })),

    on(loadUsersFailure, (state, { error }) =>
     ({ ...state, loading: false, error }))
    
    )