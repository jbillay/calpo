import { UserService } from './../user/user.service';
import { Injectable, Query } from '@nestjs/common';
import { IUser } from "../interfaces/users";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    
    whoAmI(): string {
        return 'Jeremy Billay !';
    }

    async login(email: string, password: string): Promise<IUser> {
        const authUser: IUser = await this.userService.getByEmail(email);
        if (authUser && authUser.password === password) {
            return authUser;
        } else {
            return null;
        }
    }
}
