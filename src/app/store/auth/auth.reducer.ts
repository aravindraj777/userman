import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginFailure, loginSuccess } from "./auth.actions";

export const authReducer = createReducer(initialState,
    on(loginSuccess,(state,{user})=>{
        console.log(user,"userrrrrrrrrrr")
        return{
            
            ...state,
            isLoggedIn:true,
            user:user,
            error:null
         }
    }),
    on(loginFailure,(state,{error})=>{
        return{
            ...state,
            isLoggedIn:false,
            user:null,
            error:error
        }
    })
    )
