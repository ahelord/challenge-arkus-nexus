import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EnglishLevel } from './database/entities/english-level.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EnglishLevel)
    private readonly englishLevelRepository: Repository<EnglishLevel>,
  ) {}
  async getHello(): Promise<any> {
    return await this.englishLevelRepository.find();
  }
}
