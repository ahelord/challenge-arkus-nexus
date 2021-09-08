import { IsNotEmpty, IsString } from 'class-validator';
import { GetPersonTypeDto } from '../../person-type/dto/get-person-type.dto';
import { GetEnglishLevelDto } from './get-english-level.dto';

export class GetPersonDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  personType: GetPersonTypeDto;

  @IsString()
  resumeUrl: string;

  @IsString()
  skills: string;

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
