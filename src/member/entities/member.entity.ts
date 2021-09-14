import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Team } from '../../team/entities/team.entity';

@Index('member_pk', ['id'], { unique: true })
@Entity('member', { schema: 'public' })
export class Member {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('timestamp without time zone', { name: 'start_date' })
  startDate: Date;

  @Column('timestamp without time zone', {
    name: 'end_date',
    nullable: true,
  })
  endDate: Date;

  @ManyToOne(() => Person, (person) => person.members, {
    onDelete: 'CASCADE',
    eager:true
  })
  @JoinColumn([{ name: 'person_id', referencedColumnName: 'id' }])
  person: Person;

  @ManyToOne(() => Team, (team) => team.members, {
    onDelete: 'CASCADE',
    eager:true

  })
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  team: Team;
}
