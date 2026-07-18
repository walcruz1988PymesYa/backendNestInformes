import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Query } from '@nestjs/common';
import { TiendanubeService } from './tiendanube.service';
import { CreateTiendanubeDto } from './dto/create-tiendanube.dto';
import { UpdateTiendanubeDto } from './dto/update-tiendanube.dto';

@Controller('tiendanube')
export class TiendanubeController {
  constructor(private readonly tiendanubeService: TiendanubeService) { }

  @Get('connect')
  @Redirect()
  connect() {
    return {
      url: this.tiendanubeService.connect(),
    };
  }

  @Get('callback')
  async  callback(
    @Query('code') code: string,
    @Query('state') state?: string,
  ) {
    // return this.tiendanubeService.callback(code, state);
    return this.tiendanubeService.exchangeCodeForToken(code);
  }



  @Post()
  create(@Body() createTiendanubeDto: CreateTiendanubeDto) {
    return this.tiendanubeService.create(createTiendanubeDto);
  }

  @Get()
  findAll() {
    return this.tiendanubeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiendanubeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiendanubeDto: UpdateTiendanubeDto) {
    return this.tiendanubeService.update(+id, updateTiendanubeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiendanubeService.remove(+id);
  }


}
