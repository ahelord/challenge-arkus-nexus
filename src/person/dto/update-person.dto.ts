import { IsString } from 'class-validator';

export class UpdatePersonDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  constructor(id: string, email: string, password: string, fullName: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
