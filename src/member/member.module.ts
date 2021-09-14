import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Member } from './entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), AuthModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
