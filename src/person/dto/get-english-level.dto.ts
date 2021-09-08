import { IsString } from 'class-validator';

export class GetEnglishLevelDto {
  @IsString()
  id: string;

  @IsString()
  value: string;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}
