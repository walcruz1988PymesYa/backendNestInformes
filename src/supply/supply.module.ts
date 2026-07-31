import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyController } from './supply.controller';
import { SupplyService } from './supply.service';
import { Supply, SupplySchema} from './entities/supply.entity';
import { StockBatch,StockBatchSchema } from './entities/stockBatch.entity';


@Module({
  controllers: [SupplyController],
  providers: [SupplyService],
    imports: [
    MongooseModule.forFeature([
      {
        name: Supply.name,
        schema: SupplySchema
      },
      {
        name:StockBatch.name,
        schema:StockBatchSchema
      }
    ])
  ]
})
export class SupplyModule {}
