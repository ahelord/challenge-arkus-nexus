import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Index('english_level_pk', ['id'], { unique: true })
@Entity('english_level', { schema: 'public' })
export class EnglishLevel {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'value' })
  value: string;

  @OneToMany(() => Person, (person) => person.englishLevel)
  people: Person[];
}
