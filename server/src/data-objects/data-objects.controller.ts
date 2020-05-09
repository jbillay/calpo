import { CreateDataObjectsDto } from './dto/create-data-objects.dto';
import { DataObjectsEntity } from './data-objects.entity';
import { DataObjects } from './data-objects.class';
import { IDataObjects } from './data-objects.interface';
import { DataObjectsService } from './data-objects.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
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

@ApiBearerAuth()
@ApiTags('data-objects')
@Controller('data-objects')
@UseInterceptors(ClassSerializerInterceptor)
export class DataObjectsController {
  constructor(private readonly dataObjectsService: DataObjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Data Object' })
  @ApiResponse({
    status: 200,
    description: 'New Data Object',
    type: DataObjects,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createDataObjectDto: CreateDataObjectsDto,
  ): Promise<DataObjectsEntity> {
    try {
      const createdDataObject: IDataObjects = await this.dataObjectsService.createObject(
        createDataObjectDto,
      );
      if (createdDataObject) {
        const dataObjectEntity: DataObjectsEntity = new DataObjectsEntity({
          id: createdDataObject.id,
          name: createdDataObject.name,
          slug: createdDataObject.slug,
          fields: createdDataObject.fields,
        });
        return dataObjectEntity;
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all data objects' })
  @ApiResponse({
    status: 200,
    description: 'List of Data Objects',
    type: DataObjects,
  })
  async getAll(): Promise<IDataObjects[]> {
    try {
      const dataObjects: IDataObjects[] = await this.dataObjectsService.getAllObjects();
      return dataObjects;
    } catch (error) {
      throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get one data object definition' })
  @ApiResponse({
    status: 200,
    description: 'Data Object Definition',
    type: DataObjects,
  })
  async getOne(@Param('slug') slug: string): Promise<IDataObjects> {
    try {
      const dataObject: IDataObjects = await this.dataObjectsService.getOneObject(slug);
      return dataObject;
    } catch (error) {
      throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete one data object' })
  @ApiResponse({
    status: 200,
    description: 'Data Object removed status',
    type: Boolean,
  })
  async removeObject(@Query('slug') slug: string): Promise<Boolean> {
    try {
      const removeStatus: Boolean = await this.dataObjectsService.removeObject(slug);
      return removeStatus;
    } catch (error) {
      throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
    }
  }

}
