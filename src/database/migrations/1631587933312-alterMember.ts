import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterMember1631587933312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."member" ALTER COLUMN "start_date" SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" ALTER COLUMN "end_date" DROP NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" ALTER COLUMN "person_id" SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" ALTER COLUMN "team_id" SET NOT NULL;`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
