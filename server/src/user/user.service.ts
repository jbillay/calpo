import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { IUser } from '../interfaces/users'
import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getByEmail(email: string): Promise<IUser> {
        const user: IUser = await this.userModel.findOne({ email });
        return user;
    }

    async create(user: IUser): Promise<IUser> {
        const salt = bcrypt.genSaltSync(10);
        const hashPwd = bcrypt.hashSync(user.password, salt);
        const md5 = crypto.createHash("md5").update(user.email).digest("hex");
        const userPicture = `https://gravatar.com/avatar/${md5}?s=200`;
        user.password = hashPwd;
        user.picture = userPicture;
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
}
