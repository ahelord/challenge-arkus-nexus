import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Account } from '../../database/entities/account.entity';
import { Member } from '../../database/entities/member.entity';
import { EnglishLevel } from '../../database/entities/english-level.entity';
import { PersonType } from '../../person-type/entities/person-type.entity';

@Index('person_pk', ['id'], { unique: true })
@Entity('person', { schema: 'public' })
export class Person {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'full_name' })
  fullName: string;

  @Column('character varying', { name: 'resume_url', nullable: true })
  resumeUrl: string | null;

  @Column('character varying', { name: 'email' })
  email: string;

  @Column('character varying', { name: 'password_encrypted' })
  passwordEncrypted: string;

  @Column('text', { name: 'skills', nullable: true })
  skills: string | null;

  @OneToMany(() => Account, (account) => account.person)
  accounts: Account[];

  @OneToMany(() => Member, (member) => member.person)
  members: Member[];

  @ManyToOne(() => EnglishLevel, (englishLevel) => englishLevel.people, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'english_level_id', referencedColumnName: 'id' }])
  englishLevel: EnglishLevel;

  @ManyToOne(() => PersonType, (personType) => personType.people, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'person_type_id', referencedColumnName: 'id' }])
  personType: PersonType;
}
