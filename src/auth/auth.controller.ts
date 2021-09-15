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
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSecurity('bearer')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResponseDto,
  })
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

  @ApiCreatedResponse({
    description: 'login success.',
    type: ResponseDto,
  })
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
