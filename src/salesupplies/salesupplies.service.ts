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
          status: "completed",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.idGlobalSupply",

          nameSupply: {
            $first: "$items.nameSupply",
          },

          totalQuantitySold: {
            $sum: {
              $subtract: [
                "$items.quantitySale",
                {
                  $ifNull: ["$items.quantityReturned", 0],
                },
              ],
            },
          },

          totalSale: {
            $sum: "$items.subtotal",
          },

          totalProfit: {
            $sum: "$items.profit",
          },
        },
      },

      // Buscar el insumo en la colección supplies
      {
        $lookup: {
          from: "supplies",
          localField: "_id",
          foreignField: "_id",
          as: "supply",
        },
      },

      // Convertir supply de array a objeto
      {
        $unwind: {
          path: "$supply",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $sort: {
          totalQuantitySold: -1,
        },
      },

      // Darle una estructura más clara a la respuesta
      {
        $project: {
          _id: 0,

          idSupply: "$_id",
          nameSupply: 1,
          totalQuantitySold: 1,
          totalSale: 1,
          totalProfit: 1,

          supply: 1,
        },
      },
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
          status: "completed",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.idGlobalSupply",

          nameSupply: {
            $first: "$items.nameSupply",
          },

          totalQuantitySold: {
            $sum: {
              $subtract: [
                "$items.quantitySale",
                {
                  $ifNull: ["$items.quantityReturned", 0],
                },
              ],
            },
          },

          totalSale: {
            $sum: "$items.subtotal",
          },

          totalProfit: {
            $sum: "$items.profit",
          },
        },
      },

      {
        $lookup: {
          from: "supplies",
          localField: "_id",
          foreignField: "_id",
          as: "supply",
        },
      },

      {
        $unwind: {
          path: "$supply",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $sort: {
          totalQuantitySold: 1,
        },
      },

      {
        $project: {
          _id: 0,

          idSupply: "$_id",

          nameSupply: {
            $ifNull: ["$supply.nameSupply", "$nameSupply"],
          },

          description: "$supply.description",
          imgStore: "$supply.imgStore",
          idBrand: "$supply.idBrand",
          idCategory: "$supply.idCategory",

          totalQuantitySold: 1,
          totalSale: 1,
          totalProfit: 1,

          supply: 1,
        },
      },
    ]);
    return aggregation;
  }

  async byPlatform(idCompany: string) {
    if (!Types.ObjectId.isValid(idCompany)) {
      throw new Error('El idCompany no es válido');
    }
    const aggregation = await this.salesuppliesModel.aggregate([
      {
        $match: {
          idCompany: new Types.ObjectId(idCompany),
          status: 'completed',
        },
      },
      {
        $group: {
          _id: {
            $ifNull: ['$platformMethod', 'Sin especificar'],
          },

          totalSales: {
            $sum: 1,
          },

          totalRevenue: {
            $sum: {
              $ifNull: ['$totalSale', 0],
            },
          },

          totalCost: {
            $sum: {
              $ifNull: ['$totalCost', 0],
            },
          },

          totalProfit: {
            $sum: {
              $ifNull: ['$totalProfit', 0],
            },
          },

          totalReturned: {
            $sum: {
              $ifNull: ['$totalReturned', 0],
            },
          },
        },
      },
      {
        $addFields: {
          profitMargin: {
            $cond: [
              { $gt: ['$totalRevenue', 0] },
              {
                $multiply: [
                  {
                    $divide: ['$totalProfit', '$totalRevenue'],
                  },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },
      {
        $sort: {
          totalRevenue: -1,
        },
      },
      {
        $project: {
          _id: 0,
          platform: '$_id',
          totalSales: 1,
          totalRevenue: 1,
          totalCost: 1,
          totalProfit: 1,
          totalReturned: 1,
          profitMargin: {
            $round: ['$profitMargin', 2],
          },
        },
      },
    ]);
    return aggregation;
  }

  async mostProfitable(idCompany: string) {
    if (!Types.ObjectId.isValid(idCompany)) {
      throw new Error('El idCompany no es válido');
    }
    const aggregation = await this.salesuppliesModel.aggregate([
      {
        $match: {
          idCompany: new Types.ObjectId(idCompany),
          status: 'completed',
        },
      },

      {
        $unwind: '$items',
      },

      {
        $group: {
          _id: '$items.idGlobalSupply',

          nameSupply: {
            $first: '$items.nameSupply',
          },

          totalQuantitySold: {
            $sum: {
              $subtract: [
                {
                  $ifNull: ['$items.quantitySale', 0],
                },
                {
                  $ifNull: ['$items.quantityReturned', 0],
                },
              ],
            },
          },

          totalRevenue: {
            $sum: {
              $ifNull: ['$items.subtotal', 0],
            },
          },

          totalCost: {
            $sum: {
              $multiply: [
                {
                  $ifNull: ['$items.unitCost', 0],
                },
                {
                  $subtract: [
                    {
                      $ifNull: ['$items.quantitySale', 0],
                    },
                    {
                      $ifNull: ['$items.quantityReturned', 0],
                    },
                  ],
                },
              ],
            },
          },

          totalProfit: {
            $sum: {
              $ifNull: ['$items.profit', 0],
            },
          },
        },
      },

      {
        $addFields: {
          profitMargin: {
            $cond: [
              {
                $gt: ['$totalRevenue', 0],
              },
              {
                $multiply: [
                  {
                    $divide: ['$totalProfit', '$totalRevenue'],
                  },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },

      {
        $sort: {
          totalProfit: -1,
        },
      },

      {
        $project: {
          _id: 0,
          idGlobalSupply: '$_id',
          nameSupply: 1,
          totalQuantitySold: 1,
          totalRevenue: 1,
          totalCost: 1,
          totalProfit: 1,

          profitMargin: {
            $round: ['$profitMargin', 2],
          },
        },
      },
    ]);

    return aggregation;
  }

}
