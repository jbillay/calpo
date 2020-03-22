import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { IUser } from '../interfaces/users'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async getAll(): Promise<IUser[]> {
        const users: IUser[] = await this.userModel.find().exec();
        console.log(users);
        return users;
    }

    async getByEmail(email: string): Promise<IUser> {
        const user: IUser = await this.userModel.findOne({ email }).exec();
        console.log(user);
        return user;
    }

    async create(user: IUser): Promise<IUser> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
}
