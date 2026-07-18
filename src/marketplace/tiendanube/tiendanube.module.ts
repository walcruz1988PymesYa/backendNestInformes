import { Module } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TiendanubeController } from './tiendanube.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MarketplaceConnection,
  MarketplaceConnectionSchema,
} from '../tiendanube/schema/marketplace-connection.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: MarketplaceConnection.name,
        schema: MarketplaceConnectionSchema,
      },
    ]),
  ],
  controllers: [TiendanubeController],
  providers: [TiendanubeService],
})
export class TiendanubeModule { }
