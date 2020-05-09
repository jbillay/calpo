import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDataObjectsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;

  readonly fields: [];
}
