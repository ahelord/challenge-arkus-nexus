import { IsString } from 'class-validator';
import { GetEnglishLevelDto } from './get-english-level.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  resumeUrl: string;

  @ApiProperty()
  @IsString()
  skills: string;

  @ApiProperty()
  @IsString()
  englishLevel: GetEnglishLevelDto;
}
