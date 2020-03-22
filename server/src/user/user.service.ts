import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { IUser } from '../interfaces/users'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getByEmail(email: string): Promise<IUser> {
        const user: IUser = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async create(user: IUser): Promise<IUser> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
}
