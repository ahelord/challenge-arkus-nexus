import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { GetPersonDto } from './dto/get-person.dto';
import { GetPersonTypeDto } from '../person-type/dto/get-person-type.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findAll() {
    return `This action returns all person`;
  }

  async findOne(id: string): Promise<GetPersonDto> {
    const person: Person = await this.personRepository.findOne({
      select: ['id', 'email', 'fullName', 'personType'],
      where: { id },
    });
    if (!person) throw new NotFoundException('person not exists');

    return new GetPersonDto(
      person.id,
      person.email,
      person.fullName,
      new GetPersonTypeDto(person.personType.id, person.personType.value),
    );
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<GetPersonDto> {
    await this.personRepository.update({ id }, { ...updatePersonDto });

    const person: Person = await this.personRepository.findOne({
      select: ['id', 'email', 'fullName', 'personType'],
      where: { id },
    });
    if (!person) throw new NotFoundException('person not exists');

    return new GetPersonDto(
      person.id,
      person.email,
      person.fullName,
      new GetPersonTypeDto(person.personType.id, person.personType.value),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
