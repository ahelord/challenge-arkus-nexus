import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import PostgresConfig from './config/postgres.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async function () {
        return PostgresConfig as TypeOrmModuleOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
