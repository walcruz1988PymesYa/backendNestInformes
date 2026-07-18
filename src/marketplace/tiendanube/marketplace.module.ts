import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  MarketplaceConnection,
  MarketplaceConnectionSchema,
} from './schema/marketplace-connection.schema';

import { TiendanubeModule } from './tiendanube.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketplaceConnection.name,
        schema: MarketplaceConnectionSchema,
      },
    ]),
    TiendanubeModule,
  ],
  exports: [MongooseModule],
})
export class MarketplaceModule {}