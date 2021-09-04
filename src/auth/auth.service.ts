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
import { JwtPayload } from './jwt-payload.interface';

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
    console.log(person)
    if (!person) throw new NotFoundException('email not exists');
    const isSamePassword = await compare(password, person.passwordEncrypted);
    if (!isSamePassword){
      throw new UnauthorizedException('invalidad credentials');
    }
    const payload: JwtPayload = {
      id: person.id,
      email: person.email,
      personTypeId: person.personType.id,
      personTypeValue: person.personType.value,
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
