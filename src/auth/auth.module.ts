import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from '../person-type/entities/person-type.entity';
import { Person } from '../person/entities/person.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
@Module({
  imports: [
    TypeOrmModule.forFeature([PersonType, Person]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtConfig.jwtSecret,
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // agrege esto jwyStrategy
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
