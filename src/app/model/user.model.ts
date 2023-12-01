 export interface RegisterApiResponse{
    status:string;
    message:string;

}

interface LoginResponse{
    accessToken:string;
    refreshToken:string;
}

 export type user = {
    name:string;
}