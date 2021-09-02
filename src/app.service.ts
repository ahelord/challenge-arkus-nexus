import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Person } from './database/entities/person.entity';
import { EnglishLevel } from './database/entities/english-level.entity';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    return await getConnection().getRepository(EnglishLevel).find();
  }
}
