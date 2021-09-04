import { Module } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { PersonTypeController } from './person-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType])],
  controllers: [PersonTypeController],
  providers: [PersonTypeService],
})
export class PersonTypeModule {}
