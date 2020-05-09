export interface IUser {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    picture?: string;
    role: string;
}