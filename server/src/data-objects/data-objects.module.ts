import { DataObjectsSchema } from './data-objects.schema';
import { Module } from '@nestjs/common';
import { DataObjectsController } from './data-objects.controller';
import { DataObjectsService } from './data-objects.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DataObjects', schema: DataObjectsSchema },
    ]),
  ],
  controllers: [DataObjectsController],
  providers: [DataObjectsService],
})
export class DataObjectsModule {}
