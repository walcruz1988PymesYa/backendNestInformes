
//MODEL de NODE
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema()
export class StockBatch extends Document {
    idSupply:string;
    quantiity:number;
    unitCost:number;
    idCompany:Object
}

export const StockBatchSchema =SchemaFactory.createForClass(StockBatch)