import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonTypeDto } from './create-person-type.dto';

export class UpdatePersonTypeDto extends PartialType(CreatePersonTypeDto) {}
