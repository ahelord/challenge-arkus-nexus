import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { GetTeamDto } from './dto/get-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  async findAll(take: number, skip: number): Promise<GetTeamDto[]> {
    const teams: Team[] = await this.teamRepository.find({
      select: ['id', 'name', 'account'],
      take,
      skip,
    });
    const getTeamsDto: GetTeamDto[] = teams.map(
      (team) => new GetTeamDto(team.id, team.name, team.account.id),
    );
    return getTeamsDto;
  }

  async findOne(id: string): Promise<GetTeamDto> {
    const team: Team = await this.teamRepository.findOne({
      select: ['id', 'name', 'account'],
      where: { id },
    });
    if (!team) throw new NotFoundException('team not exists');

    return new GetTeamDto(team.id, team.name, team.account.id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
