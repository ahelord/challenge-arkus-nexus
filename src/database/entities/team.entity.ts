import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Member } from './member.entity';
import { Account } from '../../account/entities/account.entity';

@Index('team_pk', ['id'], { unique: true })
@Entity('team', { schema: 'public' })
export class Team {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @OneToMany(() => Member, (member) => member.team)
  members: Member[];

  @ManyToOne(() => Account, (account) => account.teams, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;
}
