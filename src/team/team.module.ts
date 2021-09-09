import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Team } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), AuthModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
