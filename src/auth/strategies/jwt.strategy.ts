import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../../config/jwt.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../../person/entities/person.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../jwt-payload.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtSecret,
    });
  }
  async validate(payload: JwtPayload) {
    const { email } = payload;
    const person = await this.personRepository.findOne({
      where: {
        email,
      },
    });
    if (!person) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
