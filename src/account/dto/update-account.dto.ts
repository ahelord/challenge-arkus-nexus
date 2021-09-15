import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  client: string;

  @ApiProperty()
  person: GetPersonDto;

  constructor(name: string, client: string, person: GetPersonDto) {
    this.name = name;
    this.client = client;
    this.person = person;
  }
}
