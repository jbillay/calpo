import { CreateDataObjectsDto } from './dto/create-data-objects.dto';
import { IDataObjects } from './data-objects.interface';
import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DataObjectsService {
  constructor(
    @InjectModel('DataObjects')
    private readonly dataObjects: Model<IDataObjects>,
  ) {}

  async getAllObjects(): Promise<IDataObjects[]> {
    const dataObjects: IDataObjects[] = await this.dataObjects.find().lean();
    return dataObjects;
  }

  async getOneObject(slug: string): Promise<IDataObjects> {
    const dataObject: IDataObjects = await this.dataObjects
      .findOne({ slug: slug })
      .lean();
    return dataObject;
  }

  async createObject(dataObject: CreateDataObjectsDto): Promise<IDataObjects> {
    const createObject = new this.dataObjects(dataObject);
    try {
      const newDataObject: IDataObjects = await createObject.save();
      return newDataObject;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeObject(slug: string): Promise<boolean> {
    try {
      const deleteRes: any = await this.dataObjects.deleteOne({ slug: slug });
      if (deleteRes.ok === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
