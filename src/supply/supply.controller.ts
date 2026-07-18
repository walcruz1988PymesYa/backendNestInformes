import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyService } from './supply.service';

@Controller('supply')
export class SupplyController {

    constructor(private readonly supplyService: SupplyService) { }

    @Get(':id')
    findSupply(@Param('id') id: string) {
        return this.supplyService.findOne(id)
    }

}
