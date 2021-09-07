import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(take: number, skip: number): Promise<GetPersonDto[]> {
    const persons: Person[] = await this.personRepository.find({
      take,
      skip,
    });

    const getPersonsDto: GetPersonDto[] = persons.map(
      (person) =>
        new GetPersonDto(
          person.id,
          person.email,
          person.fullName,
          new GetPersonTypeDto(person.personType.id, person.personType.value),
        ),
    );
    return getPersonsDto;
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

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const deleteResult = await this.personRepository.delete({ id });
    return deleteResult.affected > 0
      ? { isDeleted: true }
      : { isDeleted: false };
  }
}
