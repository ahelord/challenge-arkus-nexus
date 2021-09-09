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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
