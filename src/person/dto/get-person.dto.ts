import { IsNotEmpty } from 'class-validator';

export class GetPersonDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  personTypeId: string;

  @IsNotEmpty()
  personTypeValue: string;
}
