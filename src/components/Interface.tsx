export interface IBaseUser {
    firstName : string;
    lastName : string;
    email : string;
    password : string
}

export interface IUser extends IBaseUser {
    id: number;
}