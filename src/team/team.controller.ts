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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthGuard } from '@nestjs/passport';
import { PersonTypes } from '../person-type/decorators/person-type.decorator';
import { PersonTypeGuard } from '../shared/guards/person-type.guard';
import { ResponseDto } from '../shared/dto/response.dto';
import appConfig from '../config/app.config';

@UseGuards(AuthGuard())
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
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
      const data = await this.teamService.findAll(take, skip);
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
      const data = await this.teamService.findOne(id);
      responseDto = new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      responseDto = new ResponseDto({}, HttpStatus.BAD_REQUEST, error.message);
    }
    return responseDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
