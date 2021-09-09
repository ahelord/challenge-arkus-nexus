import { IsString } from 'class-validator';

export class GetTeamDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  accountId: string;

  constructor(id: string, name: string, accountId: string) {
    this.id = id;
    this.name = name;
    this.accountId = accountId;
  }
}
