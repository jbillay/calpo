import { IDataObjects } from './../data-objects/data-objects.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DataService {
  constructor(
    @InjectModel('DataObjects')
    private readonly dataObjects: Model<IDataObjects>,
    @InjectConnection() private connection: Connection,
  ) {}

  buildSchema(schemaObjects: []): Schema {
    const schemaObject: any = {};
    const schemaTypes = [
      { tag: 'type' },
      { tag: 'required', default: false },
      { tag: 'default' },
      { tag: 'index', default: false },
      { tag: 'unique', default: false },
      { tag: 'lowercase', default: false },
      { tag: 'uppercase', default: false },
      { tag: 'trim', default: true },
    ];
    schemaObjects.forEach(item => {
      const itemSchema = {};
      schemaTypes.forEach(type => {
        if (item[type.tag]) {
          itemSchema[type.tag] = item[type.tag];
        } else if (type.default) {
          itemSchema[type.tag] = type.default;
        }
      });
      schemaObject[item['name']] = itemSchema;
    });
    var objectSchema = new Schema(schemaObject);
    return objectSchema;
  }

  buildModel(objectName: string, objectSchema: Schema) {
    const objectModel = this.connection.model(objectName, objectSchema);
    return objectModel;
  }

  async getObjectModel(slug: string) {
    const dataObject: IDataObjects = await this.dataObjects.findOne({
      slug: slug,
    });
    const objectSchema = this.buildSchema(dataObject.fields);
    const objectModel =
      this.connection.models[slug] || this.buildModel(slug, objectSchema);
    return objectModel;
  }

  async getAll(slug: string): Promise<any[]> {
    const dataObject: IDataObjects = await this.dataObjects.findOne({
      slug: slug,
    });
    const objectSchema = this.buildSchema(dataObject.fields);
    const objectModel =
      this.connection.models[slug] || this.buildModel(slug, objectSchema);
    try {
      const objectData = await objectModel.find().lean();
      return objectData;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async create(slug: string, objectData: any): Promise<any> {
    const dataObject: IDataObjects = await this.dataObjects.findOne({
      slug: slug,
    });
    const objectSchema = this.buildSchema(dataObject.fields);
    const objectModel =
      this.connection.models[slug] || this.buildModel(slug, objectSchema);
    try {
      const newObjectData = new objectModel(objectData);
      const createdObjectData = await newObjectData.save();
      return createdObjectData;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    return [];
  }

  async remove(slug: string, id: string): Promise<boolean> {
    const dataObject = await this.getObjectModel(slug);
    try {
        const deleteRes: any = await dataObject.deleteOne({_id: id});
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
