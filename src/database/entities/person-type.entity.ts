import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Person } from './person.entity';

@Index('person_type_pk', ['id'], { unique: true })
@Entity('person_type', { schema: 'public' })
export class PersonType {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'value' })
  value: string;

  @OneToMany(() => Person, (person) => person.personType)
  people: Person[];
}
