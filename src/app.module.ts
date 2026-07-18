import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyModule } from './supply/supply.module';
//import { CommonModule } from './common/common.module';
import { SalesuppliesModule } from './salesupplies/salesupplies.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TiendanubeModule } from './marketplace/tiendanube/tiendanube.module';
import dotenv from 'dotenv';
dotenv.config();
const {USER,PASSWORD} = process.env;

@Module({
  imports: [

    MongooseModule.forRoot(`mongodb://${USER}:${PASSWORD}@cluster0-shard-00-00.b5p91.mongodb.net:27017,cluster0-shard-00-01.b5p91.mongodb.net:27017,cluster0-shard-00-02.b5p91.mongodb.net:27017/BDAPlicacionMascotas?ssl=true&replicaSet=atlas-rjqw2o-shard-0&authSource=admin&appName=Cluster0`),

    SupplyModule,

    SalesuppliesModule,

    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TiendanubeModule,

    // CommonModule,

  ],
})
export class AppModule { }