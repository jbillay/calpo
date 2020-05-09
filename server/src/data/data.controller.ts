import { DataService } from './data.service';
import { Get, Post, Delete, Param, Body, Controller, HttpException, HttpStatus} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('data')
@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get(':slug')
    @ApiOperation({ summary: 'Get all data from dynamic object' })
    @ApiResponse({
      status: 200,
      description: 'List of Data Objects'
    })
    async getAll(@Param() params): Promise<any[]> {
      try {
        const dataObjects: any[] = await this.dataService.getAll(params.slug);
        return dataObjects;
      } catch (error) {
        throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
      }
    }

    @Post(':slug')
    @ApiOperation({ summary: 'Add data to a dynamic object' })
    @ApiResponse({
      status: 200,
      description: 'Add data to dynamic object'
    })
    async create(@Param() params, @Body() body): Promise<any> {
      try {
        const dataObjects: any = await this.dataService.create(params.slug, body);
        return dataObjects;
      } catch (error) {
        throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
      }
    }

    @Delete(':slug/:id')
    @ApiOperation({ summary: 'Remove data to a dynamic object' })
    @ApiResponse({
      status: 200,
      description: 'Remove data to dynamic object'
    })
    async remove(@Param() params): Promise<Boolean> {
      try {
        const removeStatus: Boolean = await this.dataService.remove(params.slug, params.id);
        return removeStatus;
      } catch (error) {
        throw new HttpException('Bad Request: ' + error, HttpStatus.BAD_REQUEST);
      }
    }
}
