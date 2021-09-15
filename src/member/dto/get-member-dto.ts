import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMemberDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  endData: Date;

  @ApiProperty()
  @IsString()
  personId: string;

  @ApiProperty()
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
