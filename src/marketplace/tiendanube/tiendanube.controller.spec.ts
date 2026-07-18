import { Test, TestingModule } from '@nestjs/testing';
import { TiendanubeController } from './tiendanube.controller';
import { TiendanubeService } from './tiendanube.service';

describe('TiendanubeController', () => {
  let controller: TiendanubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendanubeController],
      providers: [TiendanubeService],
    }).compile();

    controller = module.get<TiendanubeController>(TiendanubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
