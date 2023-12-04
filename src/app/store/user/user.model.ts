import { User } from "../../model/user.model";

export interface UserState {
    users:User[];
    loading:boolean;
    error:Error | null;
}

