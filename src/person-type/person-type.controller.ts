import { Controller, Get, UseGuards } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Get()
  findAll() {
    return this.personTypeService.findAll();
  }
}
