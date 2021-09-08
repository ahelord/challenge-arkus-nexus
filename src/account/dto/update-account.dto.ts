import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';

export class UpdateAccountDto {
  @IsString()
  name: string;

  @IsString()
  client: string;

  person: GetPersonDto;

  constructor(name: string, client: string, person: GetPersonDto) {
    this.name = name;
    this.client = client;
    this.person = person;
  }
}
