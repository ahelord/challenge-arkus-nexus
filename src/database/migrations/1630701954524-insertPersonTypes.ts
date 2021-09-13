import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPersonTypes1630701954524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.person_type (id,value) VALUES('7666c58b-4557-40d0-b51a-30d519ffe61b','SUPER_ADMIN');`,
    );
    await queryRunner.query(
      `INSERT INTO public.person_type (id,value) VALUES('88fd61f6-4c8d-4f1f-9ab7-e2708513678c','ADMIN');`,
    );
    await queryRunner.query(
      `INSERT INTO public.person_type (id,value) VALUES('281ab8e2-dc6f-43a4-bc1d-9cc1a927d483','USER');`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
