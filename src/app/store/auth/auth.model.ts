import { User } from "../../model/user.model";

export interface AuthState{
    isLoggedIn:boolean;
    user:null | User;
    error:Error | null;
}

export interface LoginModel{
    email:string;
    password:string;

}
