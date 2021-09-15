import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PersonTypes } from '../person-type/decorators/person-type.decorator';
import { PersonTypeGuard } from '../shared/guards/person-type.guard';
import appConfig from '../config/app.config';
import { ResponseDto } from '../shared/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@ApiTags('account')
@ApiSecurity('bearer')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async create(@Body() createAccountDto: CreateAccountDto) {
    let responseDto;
    try {
      const data = await this.accountService.create(createAccountDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Get()
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async findAll(
    @Query('skip') skip: number = appConfig.skip,
    @Query('take') take: number = appConfig.take,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.accountService.findAll(take, skip);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Get(':id')
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.accountService.findOne(id);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Patch(':id')
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.accountService.update(id, updateAccountDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Delete(':id')
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async remove(@Param('id') id: string): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.accountService.remove(id);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }
}
