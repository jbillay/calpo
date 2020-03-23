import { AuthUserDto } from './dto/auth-user.dot';
import { UserEntity } from '../user/entities/user.entity';
import { IUser } from './../interfaces/users';
import {
  Controller,
  Get,
  Post,
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
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Who am I',
    type: String,
  })
  whoAmI(): string {
    return this.authService.whoAmI();
  }

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 403, description: 'Login Failed' })
  async login(@Body() user: AuthUserDto): Promise<UserEntity> {
    const authUser: IUser = await this.authService.login(
      user.email,
      user.password,
    );
    if (authUser) {
      const userEntity: UserEntity = new UserEntity({
        id: authUser.id,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        password: authUser.password,
      });
      return userEntity;
    } else {
      throw new HttpException('Login Failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
