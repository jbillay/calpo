import { EmailUserDto } from './dto/email-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const createdUser: IUser = await this.userService.create(createUserDto);
      if (createdUser) {
        const userEntity: UserEntity = new UserEntity({
          id: createdUser.id,
          email: createdUser.email,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          password: createdUser.password,
          picture: createdUser.picture,
          role: createdUser.role,
        });
        return userEntity;
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException('Bad Request: ' + e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get User by email' })
  @ApiResponse({
    status: 200,
    description: 'User info',
    type: User,
  })
  async getUserByEmail(@Param() params: EmailUserDto): Promise<UserEntity> {
    const user: IUser = await this.userService.getByEmail(params.email);
    if (user) {
      const userEntity: UserEntity = new UserEntity({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        picture: user.picture,
        role: user.role,
      });
      return userEntity;
    } else {
      throw new HttpException('User Not Found', HttpStatus.NO_CONTENT);
    }
  }
}
