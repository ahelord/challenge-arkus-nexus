import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEnglishLevelDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  value: string;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}
