import { IsString } from 'class-validator';

export class GetPersonTypeDto {
  @IsString()
  id: string;

  @IsString()
  value: string;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}
