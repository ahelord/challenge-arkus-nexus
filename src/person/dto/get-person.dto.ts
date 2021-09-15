import { IsNotEmpty, IsString } from 'class-validator';
import { GetPersonTypeDto } from '../../person-type/dto/get-person-type.dto';
import { GetEnglishLevelDto } from './get-english-level.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetPersonDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  personType: GetPersonTypeDto;

  @ApiProperty()
  @IsString()
  resumeUrl: string;

  @ApiProperty()
  @IsString()
  skills: string;

  @ApiProperty()
  englishLevel: GetEnglishLevelDto;

  constructor(
    id: string,
    fullName: string,
    email: string,
    personType: GetPersonTypeDto,
    resumeUrl: string,
    skills: string,
    englishLevel: GetEnglishLevelDto,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.personType = personType;
    this.resumeUrl = resumeUrl;
    this.skills = skills;
    this.englishLevel = englishLevel;
  }
}
