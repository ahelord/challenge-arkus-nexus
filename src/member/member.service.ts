import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { GetMemberDto } from './dto/get-member-dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
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
    if (!member) throw new NotFoundException('person not exists');

    return new GetMemberDto(
      member.id,
      member.startDate,
      member.endDate,
      member.person ? member.person.id : null,
      member.team ? member.team.id : null,
    );
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const deleteResult = await this.memberRepository.delete({ id });
    return deleteResult.affected > 0
      ? { isDeleted: true }
      : { isDeleted: false };
  }
}
