import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salesupply } from './entities/salesupply.entity';
import { Types } from 'mongoose';
@Injectable()
export class SalesuppliesService {

  constructor(
    @InjectModel(Salesupply.name)
    private readonly salesuppliesModel: Model<Salesupply>
  ) { }

  async findAllSales(idCompany: string) {

    const listSale = await this.salesuppliesModel.find({ idCompany: new Types.ObjectId(idCompany), })
    return listSale
  }

  async findOne(id: string) {
    const salesupply = await this.salesuppliesModel.findById(id)
    return salesupply
  }

  async bestSellingProduct(idCompany: string) {
    if (!Types.ObjectId.isValid(idCompany)) {
      throw new Error('El idCompany no es válido');
    }
    const aggregation = await this.salesuppliesModel.aggregate([
      {
        $match: {
          idCompany: new Types.ObjectId(idCompany),
          status: "completed"
        }
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.idGlobalSupply",
          nameSupply: {
            $first: "$items.nameSupply"
          },
          totalQuantitySold: {
            $sum: {
              $subtract: [
                "$items.quantitySale",
                {
                  $ifNull: ["$items.quantityReturned", 0]
                }
              ]
            }
          },
          totalRevenue: {
            $sum: "$items.subtotal"
          },
          totalProfit: {
            $sum: "$items.profit"
          }
        }
      },
      {
        $sort: {
          totalQuantitySold: -1
        }
      }
    ]);
    return aggregation;
  }

  async lessSellingProduct(idCompany: string) {
    if (!Types.ObjectId.isValid(idCompany)) {
      throw new Error('El idCompany no es válido');
    }
    const aggregation = await this.salesuppliesModel.aggregate([
      {
        $match: {
          idCompany: new Types.ObjectId(idCompany),
          status: "completed"
        }
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.idGlobalSupply",
          nameSupply: {
            $first: "$items.nameSupply"
          },
          totalQuantitySold: {
            $sum: {
              $subtract: [
                "$items.quantitySale",
                {
                  $ifNull: ["$items.quantityReturned", 0]
                }
              ]
            }
          },
          totalRevenue: {
            $sum: "$items.subtotal"
          },
          totalProfit: {
            $sum: "$items.profit"
          }
        }
      },
      {
        $sort: {
          totalQuantitySold: 1   // <-- Ascendente
        }
      }
    ]);
    return aggregation;
  }
}
