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

@UseGuards(AuthGuard())
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
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
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
