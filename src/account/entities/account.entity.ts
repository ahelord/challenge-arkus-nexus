import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Team } from '../../database/entities/team.entity';

@Index('account_pk', ['id'], { unique: true })
@Entity('account', { schema: 'public' })
export class Account {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'client' })
  client: string;

  @ManyToOne(() => Person, (person) => person.accounts, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'person_id', referencedColumnName: 'id', }])
  person: Person;

  @OneToMany(() => Team, (team) => team.account)
  teams: Team[];
}
