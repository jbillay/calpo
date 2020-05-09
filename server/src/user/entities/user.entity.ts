import { Exclude, Expose, Transform } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  picture?: string;
  role: string;

  @Exclude()
  password: string;

  @Exclude()
  iat: string;

  @Exclude()
  exp: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}