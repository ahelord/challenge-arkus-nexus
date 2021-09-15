import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { GetPersonDto } from './dto/get-person.dto';
import { GetPersonTypeDto } from '../person-type/dto/get-person-type.dto';
import { GetEnglishLevelDto } from './dto/get-english-level.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findAll(take: number, skip: number): Promise<GetPersonDto[]> {
    const persons: Person[] = await this.personRepository.find({
      select: [
        'id',
        'email',
        'fullName',
        'personType',
        'englishLevel',
        'resumeUrl',
        'skills',
      ],
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
          person.resumeUrl,
          person.skills,
          person.englishLevel
            ? new GetEnglishLevelDto(
                person.englishLevel.id,
                person.englishLevel.value,
              )
            : null,
        ),
    );
    return getPersonsDto;
  }

  async findOne(id: string): Promise<GetPersonDto> {
    const person: Person = await this.personRepository.findOne({
      select: [
        'id',
        'email',
        'fullName',
        'personType',
        'englishLevel',
        'resumeUrl',
        'skills',
      ],
      where: { id },
    });
    if (!person) {
      this.logger.log({
        level: 'info',
        message: 'person not exists',
        params: { id },
      });
      throw new NotFoundException('person not exists');
    }

    return new GetPersonDto(
      person.id,
      person.email,
      person.fullName,
      new GetPersonTypeDto(person.personType.id, person.personType.value),
      person.resumeUrl,
      person.skills,
      person.englishLevel
        ? new GetEnglishLevelDto(
            person.englishLevel.id,
            person.englishLevel.value,
          )
        : null,
    );
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<GetPersonDto> {
    await this.personRepository.update({ id }, { ...updatePersonDto });

    const person: Person = await this.personRepository.findOne({
      select: [
        'id',
        'email',
        'fullName',
        'personType',
        'englishLevel',
        'resumeUrl',
        'skills',
      ],
      where: { id },
    });
    if (!person) {
      this.logger.log({
        level: 'info',
        message: 'person not exists',
        params: { id, updatePersonDto },
      });
      throw new NotFoundException('person not exists');
    }

    return new GetPersonDto(
      person.id,
      person.email,
      person.fullName,
      new GetPersonTypeDto(person.personType.id, person.personType.value),
      person.resumeUrl,
      person.skills,
      person.englishLevel
        ? new GetEnglishLevelDto(
            person.englishLevel.id,
            person.englishLevel.value,
          )
        : null,
    );
  }

  async updateSkills(
    id: string,
    updateSkillsDto: UpdateSkillsDto,
  ): Promise<GetPersonDto> {
    await this.personRepository.update({ id }, { ...updateSkillsDto });

    const person: Person = await this.personRepository.findOne({
      select: [
        'id',
        'email',
        'fullName',
        'personType',
        'englishLevel',
        'resumeUrl',
        'skills',
      ],
      where: { id },
    });
    if (!person) {
      this.logger.log({
        level: 'info',
        message: 'person not exists',
        params: { id, updateSkillsDto },
      });
      throw new NotFoundException('person not exists');
    }

    return new GetPersonDto(
      person.id,
      person.email,
      person.fullName,
      new GetPersonTypeDto(person.personType.id, person.personType.value),
      person.resumeUrl,
      person.skills,
      person.englishLevel
        ? new GetEnglishLevelDto(
            person.englishLevel.id,
            person.englishLevel.value,
          )
        : null,
    );
  }

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const deleteResult = await this.personRepository.delete({ id });
    return deleteResult.affected > 0
      ? { isDeleted: true }
      : { isDeleted: false };
  }
}
