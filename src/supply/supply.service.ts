import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supply } from "./entities/supply.entity"
import { StockBatch } from "./entities/stockBatch.entity"
import { Types } from 'mongoose';

@Injectable()
export class SupplyService {

    constructor(
        @InjectModel(Supply.name)
        private readonly supplyModel: Model<Supply>,
        @InjectModel(StockBatch.name)
        private readonly stockbatchModel: Model<StockBatch>
    ) { }

    async findOne(id: string) {
        const supply = await this.supplyModel.findById(id)
        return supply
    }

    async grandTotalCostSupplyStock(idCompany: string) {
        if (!Types.ObjectId.isValid(idCompany)) {
            throw new BadRequestException('idCompany inválido');
        }
        const sumaTotalCostStockCurrent = await this.stockbatchModel.aggregate([
            {
                $match: {
                    idCompany: new Types.ObjectId(idCompany),
                    quantity: { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalInventoryValue: {
                        $sum: {
                            $multiply: [
                                "$quantity",
                                "$unitCost"
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalInventoryValue: 1
                }
            }
        ]);

        return {
            capitalInvertido: sumaTotalCostStockCurrent[0]?.totalInventoryValue ?? 0
        };

    }
}
