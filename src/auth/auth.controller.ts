import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignUpDto, LoginDto } from './dto';
import { ResponseDto } from '../shared/dto/response.dto';
import { PersonTypes } from '../person-type/decorators/person-type.decorator';
import { PersonTypeGuard } from '../shared/guards/person-type.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  @PersonTypes('SUPER_ADMIN')
  @UseGuards(AuthGuard(), PersonTypeGuard)
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
