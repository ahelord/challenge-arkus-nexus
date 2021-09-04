import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignUpDto, LoginDto } from "./dto";
import { ResponseDto } from '../shared/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async signup(@Body() createSignupDto: CreateSignUpDto): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.authService.signUp(createSignupDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }

    return responseDto;
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.authService.login(loginDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }

    return responseDto;
  }
}
