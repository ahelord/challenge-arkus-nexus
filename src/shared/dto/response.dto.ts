import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  data: any;

  @ApiProperty()
  @IsNotEmpty()
  errorMessage: string;

  @ApiProperty()
  @IsNotEmpty()
  statusCode: number;

  constructor(data: any, statusCode: number, errorMessage = '') {
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}
