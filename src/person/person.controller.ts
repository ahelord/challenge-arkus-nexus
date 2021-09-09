import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ResponseDto } from '../shared/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { PersonTypes } from '../person-type/decorators/person-type.decorator';
import { PersonTypeGuard } from '../shared/guards/person-type.guard';
import appConfig from '../config/app.config';
import { UpdateSkillsDto } from './dto/update-skills.dto';

@UseGuards(AuthGuard())
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @PersonTypes('ADMIN', 'USER', 'SUPER_ADMIN')
  @UseGuards(PersonTypeGuard)
  async findAll(
    @Query('skip') skip: number = appConfig.skip,
    @Query('take') take: number = appConfig.take,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.personService.findAll(take, skip);
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
      const data = await this.personService.findOne(id);
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
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.personService.update(id, updatePersonDto);
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
      const data = await this.personService.remove(id);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Patch(':id/skills')
  @PersonTypes('USER')
  @UseGuards(PersonTypeGuard)
  async updateSkills(
    @Param('id') id: string,
    @Body() updateSkillsDto: UpdateSkillsDto,
  ): Promise<ResponseDto> {
    let responseDto;
    try {
      const data = await this.personService.updateSkills(id, updateSkillsDto);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }
}
