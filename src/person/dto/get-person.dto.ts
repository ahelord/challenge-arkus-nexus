import { IsNotEmpty } from 'class-validator';
import { GetPersonTypeDto } from '../../person-type/dto/get-person-type.dto';

export class GetPersonDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  personType: GetPersonTypeDto;

  constructor(
    id: string,
    email: string,
    fullName: string,
    personType: GetPersonTypeDto,
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.personType = personType;
  }
}
