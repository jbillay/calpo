import { UserService } from './user.service';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { IUser } from '../interfaces/users';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUser(): Promise<IUser[]> {
        const users: IUser[] = await this.userService.getAll();
        return users;
    }

    @Post()
    async create(@Body() user: IUser): Promise<IUser> {
        const createdUser: IUser = await this.userService.create(user);
        return createdUser;
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email): Promise<IUser> {
        const user: IUser = await this.userService.getByEmail(email);
        return user;
    }
}
