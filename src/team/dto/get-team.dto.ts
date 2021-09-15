import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTeamDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  accountId: string;

  constructor(id: string, name: string, accountId: string) {
    this.id = id;
    this.name = name;
    this.accountId = accountId;
  }
}
