import { IsString } from 'class-validator';

export class UpdateSkillsDto {
  @IsString()
  skills: string;
}
