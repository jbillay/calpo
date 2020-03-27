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
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Who am I',
    type: String,
  })
  whoAmI(@Request() req): UserEntity {
    const authUser: UserEntity = new UserEntity(req.user);
    return authUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req): Promise<UserEntity> {
    const token: string = this.authService.login(req.user);
    if (token) {
      const userEntity: UserEntity = new UserEntity({
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        password: req.user.password,
        picture: req.user.picture,
        token: token
      });
      return userEntity;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return;
  }
}
