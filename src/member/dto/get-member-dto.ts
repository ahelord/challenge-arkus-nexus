import { IsString } from 'class-validator';

export class GetMemberDto {
  @IsString()
  id: string;

  @IsString()
  startDate: Date;

  @IsString()
  endData: Date;

  @IsString()
  personId: string;

  @IsString()
  teamId: string;

  constructor(
    id: string,
    startDate: Date,
    endData: Date,
    personId: string,
    teamId: string,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endData = endData;
    this.personId = personId;
    this.teamId = teamId;
  }
}
