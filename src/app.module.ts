import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import PostgresConfig from './config/postgres.config';
import { EnglishLevel } from './database/entities/english-level.entity';
import { AuthModule } from './auth/auth.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { PersonModule } from './person/person.module';
import { AccountModule } from './account/account.module';
import { TeamModule } from './team/team.module';
import { MemberModule } from './member/member.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        // other transports...
      ],
    }),
    TypeOrmModule.forFeature([EnglishLevel]),
    TypeOrmModule.forRootAsync({
      useFactory: async function () {
        return PostgresConfig as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    PersonTypeModule,
    PersonModule,
    AccountModule,
    TeamModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
