import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';
import { GetTeamDto } from '../../team/dto/get-team.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;

  @ApiProperty()
  @IsString()
  person: GetPersonDto;

  @ApiProperty()
  @IsString()
  team: GetTeamDto;
}
