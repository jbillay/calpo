import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 12345, description: 'ID of the user' })
  id: number;

  @ApiProperty({ example: 'jbillay@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'Jeremy', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Billay', description: 'User last name' })
  lastName: string;

  @ApiProperty({ example: 'Jeremy Billay', description: 'User full name' })
  fullName: string;

}