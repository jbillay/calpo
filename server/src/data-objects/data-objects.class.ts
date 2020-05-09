import { ApiProperty } from '@nestjs/swagger';

export class DataObjects {
  @ApiProperty({ example: "12345", description: 'ID of the Data Object' })
  id: string;

  @ApiProperty({ example: 'Person', description: 'Data Object name' })
  name: string;

  @ApiProperty({ example: 'person', description: 'Slug for a Data Object' })
  slug: string;

  @ApiProperty({ example: 'Fields schema', description: 'Fields schema' })
  fields: [];
}