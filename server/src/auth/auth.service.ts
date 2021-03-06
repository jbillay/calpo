import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/users';
import * as bcrypt from 'bcrypt-nodejs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: IUser): string {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const authUser: IUser = await this.userService.getByEmail(email);
    if (authUser && bcrypt.compareSync(password, authUser.password)) {
      return authUser;
    } else {
      return null;
    }
  }
}
