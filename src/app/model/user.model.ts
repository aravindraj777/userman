 export interface User{
    id:number;
    username:string;
    email:string;
    phone:string;
    password:string;
 }
 
 export interface RegisterApiResponse{
    status:string;
    message:string;

}

export interface LoginResponse{
    data:{
        user:User;
        accessToken:string;
        refreshToken:string;
    }
    
   
}

