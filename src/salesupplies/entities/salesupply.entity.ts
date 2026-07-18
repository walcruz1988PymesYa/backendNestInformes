
//MODEL de NODE
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SalesupplyDocument = HydratedDocument<Salesupply>;

@Schema({ timestamps: true })
export class Salesupply {

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  idCompany: Types.ObjectId;

}

export const SalesupplySchema = SchemaFactory.createForClass(Salesupply);