import { PartialType } from '@nestjs/mapped-types';
import { CreateTiendanubeDto } from './create-tiendanube.dto';

export class UpdateTiendanubeDto extends PartialType(CreateTiendanubeDto) {}
