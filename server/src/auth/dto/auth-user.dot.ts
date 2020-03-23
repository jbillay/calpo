import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}