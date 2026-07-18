import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyController } from './supply.controller';
import { SupplyService } from './supply.service';
import { Supply, SupplySchema } from './entities/supply.entity';

@Module({
  controllers: [SupplyController],
  providers: [SupplyService],
    imports: [
    MongooseModule.forFeature([
      {
        name: Supply.name,
        schema: SupplySchema,
      },
    ])
  ]
})
export class SupplyModule {}
