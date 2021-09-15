import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAccountDto {
  constructor(id: string, name: string, client: string, person: GetPersonDto) {
    this.id = id;
    this.name = name;
    this.client = client;
    this.person = person;
  }
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  client: string;

  @ApiProperty()
  person: GetPersonDto;
}
