import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsString()
  skills: string;
}
