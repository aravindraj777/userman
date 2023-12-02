export interface AuthState{
    isLoggedIn:boolean;
    user:null;
    error:Error | null;
}

export interface LoginModel{
    email:string;
    password:string;

}
