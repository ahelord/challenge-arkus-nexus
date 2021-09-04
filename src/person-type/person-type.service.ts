import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private readonly personTypeRepository: Repository<PersonType>,
  ) {}

  findAll() {
    return this.personTypeRepository.find();
  }
}
