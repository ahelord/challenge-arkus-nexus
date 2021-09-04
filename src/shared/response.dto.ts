import { IsNotEmpty } from 'class-validator';

export class ResponseDto {
  @IsNotEmpty()
  data: any;
  @IsNotEmpty()
  errorMessage: string;
  @IsNotEmpty()
  statusCode: number;

  constructor(data: any, statusCode: number, errorMessage = '') {
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}
