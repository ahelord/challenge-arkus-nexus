import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { GetMemberDto } from './dto/get-member-dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<GetMemberDto> {
    const memberCreated = await this.memberRepository.save(createMemberDto);
    const member: Member = await this.memberRepository.findOne({
      id: memberCreated.id,
    });
    return new GetMemberDto(
      member.id,
      member.startDate,
      member.endDate,
      member.person ? member.person.id : null,
      member.team ? member.team.id : null,
    );
  }

  async findAll(take: number, skip: number): Promise<GetMemberDto[]> {
    const members: Member[] = await this.memberRepository.find({
      select: ['id', 'startDate', 'endDate', 'person', 'team'],
      take,
      skip,
    });
    const getMembersDto: GetMemberDto[] = members.map(
      (member) =>
        new GetMemberDto(
          member.id,
          member.startDate,
          member.endDate,
          member.person ? member.person.id : null,
          member.team ? member.team.id : null,
        ),
    );
    return getMembersDto;
  }

  async findOne(id: string): Promise<GetMemberDto> {
    const member: Member = await this.memberRepository.findOne({
      select: ['id', 'startDate', 'endDate', 'person', 'team'],
      where: { id },
    });
    if (!member) {
      this.logger.log({
        level: 'info',
        message: 'member not exists',
        params: { id },
      });
      throw new NotFoundException('member not exists');
    }

    return new GetMemberDto(
      member.id,
      member.startDate,
      member.endDate,
      member.person ? member.person.id : null,
      member.team ? member.team.id : null,
    );
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<GetMemberDto> {
    await this.memberRepository.update({ id }, { ...updateMemberDto });
    const member: Member = await this.memberRepository.findOne({
      select: ['id', 'startDate', 'endDate', 'team', 'person'],
      where: { id },
    });

    if (!member) {
      this.logger.log({
        level: 'info',
        message: 'member not exists',
        params: { id },
      });
      throw new NotFoundException('member not exists');
    }

    return new GetMemberDto(
      member.id,
      member.startDate,
      member.endDate,
      member.person ? member.person.id : null,
      member.team ? member.team.id : null,
    );
  }

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const deleteResult = await this.memberRepository.delete({ id });
    return deleteResult.affected > 0
      ? { isDeleted: true }
      : { isDeleted: false };
  }
}
