import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { GetPersonDto } from '../person/dto/get-person.dto';
import { Person } from '../person/entities/person.entity';
import { GetPersonTypeDto } from '../person-type/dto/get-person-type.dto';
import { GetAccountDto } from './dto/get-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountService: Repository<Account>,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  async findAll(take: number, skip: number): Promise<GetAccountDto[]> {
    const accounts: Account[] = await this.accountService.find({
      take,
      skip,
    });

    const getAccountsDto: GetAccountDto[] = accounts.map(
      (account) =>
        new GetAccountDto(
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
          ),
        ),
    );
    return getAccountsDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
