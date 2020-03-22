import { IUser } from './../interfaces/users';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('me')
    whoAmI(): string {
        return this.authService.whoAmI();
    }

    @Post()
    async login(@Body() user: IUser): Promise<IUser> {
        const authUser: IUser = await this.authService.login(user.email, user.password);
        if (authUser) {
            return authUser;
        } else {
            return null;
        }
    }
}
