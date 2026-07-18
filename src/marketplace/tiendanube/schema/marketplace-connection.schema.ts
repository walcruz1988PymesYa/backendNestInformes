import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MarketplaceConnectionDocument =
  HydratedDocument<MarketplaceConnection>;

@Schema({
  timestamps: true,
  collection: 'marketplace_connections',
})
export class MarketplaceConnection {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Company',
    index: true,
  })
  idCompany: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['tiendanube', 'mercadolibre'],
  })
  platform: string;

  @Prop({
    required: true,
  })
  userId: number;

  @Prop({
    required: true,
  })
  accessToken: string;

  @Prop({
    type: [String],
    default: [],
  })
  scopes: string[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const MarketplaceConnectionSchema =
  SchemaFactory.createForClass(MarketplaceConnection);