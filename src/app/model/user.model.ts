 export interface User{
    id:number;
    username:string;
    email:string;
    phone:string;
    password:string;
    role:string;
 }
 
 export interface RegisterApiResponse{
    status:string;
    message:string;

}

export interface LoginResponse{
        user:User;
        accessToken:string;
        refreshToken:string;
    
   
}

