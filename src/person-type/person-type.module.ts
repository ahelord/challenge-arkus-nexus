import { Module } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { PersonTypeController } from './person-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType]), AuthModule],
  controllers: [PersonTypeController],
  providers: [PersonTypeService],
})
export class PersonTypeModule {}
