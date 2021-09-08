import { IsNotEmpty, IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  client: string;

  @IsString()
  person: GetPersonDto;
}
