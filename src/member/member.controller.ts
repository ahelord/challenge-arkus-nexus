import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PersonTypes } from '../person-type/decorators/person-type.decorator';
import { PersonTypeGuard } from '../shared/guards/person-type.guard';
import { ResponseDto } from '../shared/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import appConfig from '../config/app.config';

@UseGuards(AuthGuard())
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @PersonTypes('ADMIN', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async create(@Body() createMemberDto: CreateMemberDto) {
    let responseDto;
    try {
      const data = await this.memberService.create(createMemberDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Get()
  @PersonTypes('ADMIN', 'USER', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async findAll(
    @Query('skip') skip: number = appConfig.skip,
    @Query('take') take: number = appConfig.take,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.memberService.findAll(take, skip);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Get(':id')
  @PersonTypes('ADMIN', 'USER', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.memberService.findOne(id);
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
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.memberService.update(id, updateMemberDto);
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
      const data = await this.memberService.remove(id);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }
}
