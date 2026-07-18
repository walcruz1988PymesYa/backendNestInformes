import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesupplyDto } from './create-salesupply.dto';

export class UpdateSalesupplyDto extends PartialType(CreateSalesupplyDto) {}
