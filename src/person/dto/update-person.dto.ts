import { IsString } from 'class-validator';
import { GetEnglishLevelDto } from './get-english-level.dto';

export class UpdatePersonDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  resumeUrl: string;

  @IsString()
  skills: string;

  @IsString()
  englishLevel: GetEnglishLevelDto;

}
