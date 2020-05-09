import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataObjectsSchema } from './../data-objects/data-objects.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'DataObjects', schema: DataObjectsSchema },
      ]),
    ],
    controllers: [DataController],
    providers: [DataService],
  })
export class DataModule {}
