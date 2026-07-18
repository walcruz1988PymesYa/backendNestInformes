
//MODEL de NODE
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema()
export class Supply extends Document {
    nameSupply:string;
    description:string;
    imgStore:string
}

export const SupplySchema =SchemaFactory.createForClass(Supply)