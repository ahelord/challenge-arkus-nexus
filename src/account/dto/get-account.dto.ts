import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';

export class GetAccountDto {
  constructor(id: string, name: string, client: string, person: GetPersonDto) {
    this.id = id;
    this.name = name;
    this.client = client;
    this.person = person;
  }
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  client: string;

  person: GetPersonDto;
}
