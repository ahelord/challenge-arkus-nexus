import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPersonTypes1630701954524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.person_type (value) VALUES('SUPER_ADMIN');`,
    );
    await queryRunner.query(
      `INSERT INTO public.person_type (value) VALUES('ADMIN');`,
    );
    await queryRunner.query(
      `INSERT INTO public.person_type (value) VALUES('USER');`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
