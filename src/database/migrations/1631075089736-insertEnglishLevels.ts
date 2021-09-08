import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertEnglishLevels1631075089736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('A1');`,
    );
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('A2');`,
    );
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('B1');`,
    );
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('B2');`,
    );
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('C1');`,
    );
    await queryRunner.query(
      `INSERT INTO public.english_level (value) VALUES('C2');`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
