import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { GetPersonDto } from '../person/dto/get-person.dto';
import { GetPersonTypeDto } from '../person-type/dto/get-person-type.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetEnglishLevelDto } from '../person/dto/get-english-level.dto';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const accountCreated = await this.accountRepository.save(createAccountDto);
    const account: Account = await this.accountRepository.findOne({
      id: accountCreated.id,
    });
    return new GetAccountDto(
      account.id,
      account.name,
      account.client,
      account.person
        ? new GetPersonDto(
            account.person.id,
            account.person.fullName,
            account.person.email,
            new GetPersonTypeDto(
              account.person.personType.id,
              account.person.personType.value,
            ),
            account.person.resumeUrl,
            account.person.skills,
            account.person.englishLevel
              ? new GetEnglishLevelDto(
                  account.person.englishLevel.id,
                  account.person.englishLevel.value,
                )
              : null,
          )
        : null,
    );
  }

  async findAll(take: number, skip: number): Promise<GetAccountDto[]> {
    const accounts: Account[] = await this.accountRepository.find({
      take,
      skip,
    });

    const getAccountsDto: GetAccountDto[] = accounts.map(
      (account) =>
        new GetAccountDto(
          account.id,
          account.name,
          account.client,
          account.person
            ? new GetPersonDto(
                account.person.id,
                account.person.fullName,
                account.person.email,
                new GetPersonTypeDto(
                  account.person.personType.id,
                  account.person.personType.value,
                ),
                account.person.resumeUrl,
                account.person.skills,
                account.person.englishLevel
                  ? new GetEnglishLevelDto(
                      account.person.englishLevel.id,
                      account.person.englishLevel.value,
                    )
                  : null,
              )
            : null,
        ),
    );
    return getAccountsDto;
  }

  async findOne(id: string) {
    const account: Account = await this.accountRepository.findOne({
      select: ['id', 'name', 'client', 'person'],
      where: { id },
    });
    return new GetAccountDto(
      account.id,
      account.name,
      account.client,
      new GetPersonDto(
        account.person.id,
        account.person.email,
        account.person.fullName,
        new GetPersonTypeDto(
          account.person.personType.id,
          account.person.personType.value,
        ),
        account.person.resumeUrl,
        account.person.skills,
        account.person.englishLevel
          ? new GetEnglishLevelDto(
              account.person.englishLevel.id,
              account.person.englishLevel.value,
            )
          : null,
      ),
    );
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<GetAccountDto> {
    await this.accountRepository.update({ id }, { ...updateAccountDto });

    const account: Account = await this.accountRepository.findOne({
      select: ['id', 'name', 'client', 'person'],
      where: { id },
    });
    if (!account) {
      this.logger.log({
        level: 'info',
        message: 'account not exists',
        params: { id, updateAccountDto },
      });
      throw new NotFoundException('account not exists');
    }

    return new GetAccountDto(
      account.id,
      account.name,
      account.client,
      new GetPersonDto(
        account.person.id,
        account.person.email,
        account.person.fullName,
        new GetPersonTypeDto(
          account.person.personType.id,
          account.person.personType.value,
        ),
        account.person.resumeUrl,
        account.person.skills,
        account.person.englishLevel
          ? new GetEnglishLevelDto(
              account.person.englishLevel.id,
              account.person.englishLevel.value,
            )
          : null,
      ),
    );
  }

  async remove(id: string): Promise<{ isDeleted: boolean }> {
    const deleteResult = await this.accountRepository.delete({ id });
    return deleteResult.affected > 0
      ? { isDeleted: true }
      : { isDeleted: false };
  }
}
