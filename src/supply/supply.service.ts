import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supply } from "./entities/supply.entity"
@Injectable()
export class SupplyService {

    constructor(
        @InjectModel(Supply.name)
        private readonly supplyModel: Model<Supply>,
    ) { }

    async findOne(id: string) {
        const supply = await this.supplyModel.findById(id)
        return supply
    }
}
