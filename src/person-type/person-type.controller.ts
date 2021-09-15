import { Controller, Get, UseGuards } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@ApiSecurity('bearer')
@ApiTags('person-type')
@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Get()
  findAll() {
    return this.personTypeService.findAll();
  }
}
