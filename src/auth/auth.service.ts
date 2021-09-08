import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, CreateSignUpDto } from './dto';
import { Person } from '../person/entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from '../person-type/entities/person-type.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { GetPersonDto } from '../person/dto/get-person.dto';
import { GetPersonTypeDto } from '../person-type/dto/get-person-type.dto';
import { GetEnglishLevelDto } from '../person/dto/get-english-level.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PersonType)
    private readonly personTypeRepository: Repository<PersonType>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    createSignUpDto: CreateSignUpDto,
  ): Promise<{ isCreated: boolean }> {
    const { fullName, password, email, personTypeId } = createSignUpDto;
    const person = new Person();
    person.fullName = fullName;
    person.email = email;

    const personExists = await this.personRepository.findOne({
      where: {
        email,
      },
    });

    if (personExists) throw new ConflictException('email exists');

    const personType = await this.personTypeRepository.findOne({
      where: { id: personTypeId },
    });
    person.personType = personType;
    const salt = await genSalt(10);
    person.passwordEncrypted = await hash(password, salt);
    const personCreated = await this.personRepository.save(person);
    let isCreated = false;
    if (personCreated) isCreated = true;
    return { isCreated };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const person: Person = await this.personRepository.findOne({
      where: { email },
    });
    console.log(person);
    if (!person) throw new NotFoundException('email not exists');
    const isSamePassword = await compare(password, person.passwordEncrypted);
    if (!isSamePassword) {
      throw new UnauthorizedException('invalidad credentials');
    }
    const payload: GetPersonDto = {
      id: person.id,
      fullName: person.fullName,
      email: person.email,
      personType: new GetPersonTypeDto(
        person.personType.id,
        person.personType.value,
      ),
      resumeUrl: person.resumeUrl,
      skills: person.skills,
      englishLevel: person.englishLevel
        ? new GetEnglishLevelDto(
            person.englishLevel.id,
            person.englishLevel.value,
          )
        : null,
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
