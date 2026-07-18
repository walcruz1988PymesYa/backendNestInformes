import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesuppliesService } from './salesupplies.service';
import { CreateSalesupplyDto } from './dto/create-salesupply.dto';
import { UpdateSalesupplyDto } from './dto/update-salesupply.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('salesupplies')
export class SalesuppliesController {
  constructor(private readonly salesuppliesService: SalesuppliesService) { }

  @Get(':idCompany')
  findAllSales(@Param('idCompany', ParseMongoIdPipe) idCompany: string) {

    return this.salesuppliesService.findAllSales(idCompany);
  }

  @Get('bestSelling/:idCompany')
  bestSellingProduct(@Param('idCompany', ParseMongoIdPipe) idCompany: string) {
    console.log(idCompany)
    return this.salesuppliesService.bestSellingProduct(idCompany);
  }

  @Get('lessSelling/:idCompany')
  lessSellingProduct(@Param('idCompany', ParseMongoIdPipe) idCompany: string) {
    return this.salesuppliesService.lessSellingProduct(idCompany);
  }
}

