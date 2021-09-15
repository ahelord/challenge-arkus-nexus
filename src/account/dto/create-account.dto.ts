import { IsNotEmpty, IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  client: string;

  @ApiProperty()
  @IsString()
  person: GetPersonDto;
}
