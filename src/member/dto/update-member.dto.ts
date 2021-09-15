import { IsString } from 'class-validator';
import { GetPersonDto } from '../../person/dto/get-person.dto';
import { GetTeamDto } from '../../team/dto/get-team.dto';

export class UpdateMemberDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  person: GetPersonDto;

  @IsString()
  team: GetTeamDto;
}
