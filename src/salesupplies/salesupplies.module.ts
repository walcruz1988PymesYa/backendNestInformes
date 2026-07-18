import { Module } from '@nestjs/common';
import { SalesuppliesService } from './salesupplies.service';
import { SalesuppliesController } from './salesupplies.controller';
import {Salesupply,SalesupplySchema} from "./entities/salesupply.entity";
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [SalesuppliesController],
  providers: [SalesuppliesService],
  imports: [
      MongooseModule.forFeature([
        {
          name: Salesupply.name,
          schema: SalesupplySchema,
        }
      ])
    ]
})
export class SalesuppliesModule {}
