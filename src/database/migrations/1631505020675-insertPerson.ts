import { MigrationInterface, QueryRunner } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import appConfig from '../../config/app.config';

export class insertPerson1631505020675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await genSalt(10);
    const passwordEncrypted = await hash(appConfig.superAdmin.password, salt);
    await queryRunner.query(
      `INSERT INTO public.person (email,full_name,password_encrypted,person_type_id) VALUES('${appConfig.superAdmin.email}','Super Admin','${passwordEncrypted}','7666c58b-4557-40d0-b51a-30d519ffe61b');`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
