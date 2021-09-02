import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateDatabase1630595984674 implements MigrationInterface {
  name = 'updateDatabase1630595984674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "account_id" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "team_pk" ON "public"."team" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "person_id" uuid, "team_id" uuid, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "member_pk" ON "public"."member" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."english_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_f04fb26812e7c3b4571d45583c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "english_level_pk" ON "public"."english_level" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."person_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_f900a8c313411c7da8fcbba7975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "person_type_pk" ON "public"."person_type" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "resume_url" character varying, "email" character varying NOT NULL, "password_encrypted" character varying NOT NULL, "skills" text, "english_level_id" uuid, "person_type_id" uuid, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "person_pk" ON "public"."person" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "client" character varying NOT NULL, "person_id" uuid, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "account_pk" ON "public"."account" ("id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."team" ADD CONSTRAINT "FK_0e7dd0fde7074d415ce31255cb4" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" ADD CONSTRAINT "FK_a4daf9e28a691fc39703f61bd38" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" ADD CONSTRAINT "FK_33b34d353655d8bb902a632b05e" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."person" ADD CONSTRAINT "FK_be615735a561b597a8dbb673c19" FOREIGN KEY ("english_level_id") REFERENCES "public"."english_level"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."person" ADD CONSTRAINT "FK_1711d76c14c9146c23087558bb3" FOREIGN KEY ("person_type_id") REFERENCES "public"."person_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account" ADD CONSTRAINT "FK_73b5a14ecc8f5529ea98a746d51" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."account" DROP CONSTRAINT "FK_73b5a14ecc8f5529ea98a746d51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."person" DROP CONSTRAINT "FK_1711d76c14c9146c23087558bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."person" DROP CONSTRAINT "FK_be615735a561b597a8dbb673c19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" DROP CONSTRAINT "FK_33b34d353655d8bb902a632b05e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."member" DROP CONSTRAINT "FK_a4daf9e28a691fc39703f61bd38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."team" DROP CONSTRAINT "FK_0e7dd0fde7074d415ce31255cb4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."account_pk"`);
    await queryRunner.query(`DROP TABLE "public"."account"`);
    await queryRunner.query(`DROP INDEX "public"."person_pk"`);
    await queryRunner.query(`DROP TABLE "public"."person"`);
    await queryRunner.query(`DROP INDEX "public"."person_type_pk"`);
    await queryRunner.query(`DROP TABLE "public"."person_type"`);
    await queryRunner.query(`DROP INDEX "public"."english_level_pk"`);
    await queryRunner.query(`DROP TABLE "public"."english_level"`);
    await queryRunner.query(`DROP INDEX "public"."member_pk"`);
    await queryRunner.query(`DROP TABLE "public"."member"`);
    await queryRunner.query(`DROP INDEX "public"."team_pk"`);
    await queryRunner.query(`DROP TABLE "public"."team"`);
  }
}
