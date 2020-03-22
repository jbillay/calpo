import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IUser } from '../interfaces/users';
import { UserEntity } from './entities/user.entity';
import { User } from './classes/user.class';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 200,
    description: 'New user info',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() user: IUser): Promise<UserEntity> {
    const createdUser: IUser = await this.userService.create(user);
    if (createdUser) {
      const userEntity: UserEntity = new UserEntity({
        id: createdUser.id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        password: createdUser.password,
      });
      return userEntity;
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get User by email' })
  @ApiResponse({
    status: 200,
    description: 'User info',
    type: User,
  })
  async getUserByEmail(@Param('email') email): Promise<UserEntity> {
    const user: IUser = await this.userService.getByEmail(email);
    if (user) {
      const userEntity: UserEntity = new UserEntity({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      });
      return userEntity;
    } else {
      throw new HttpException('User Not Found', HttpStatus.NO_CONTENT);
    }
  }
}
