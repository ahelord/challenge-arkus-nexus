import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from '../person-type/entities/person-type.entity';
import { Person } from './entities/person.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType, Person]), AuthModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
