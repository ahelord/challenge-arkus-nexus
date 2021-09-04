import { Controller, Get } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';

@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Get()
  findAll() {
    return this.personTypeService.findAll();
  }
}
