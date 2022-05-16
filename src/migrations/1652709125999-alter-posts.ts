import { MigrationInterface, QueryRunner } from "typeorm";

export class alterPosts1652709125999 implements MigrationInterface {
    name = 'alterPosts1652709125999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "mime_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "mime_url"`);
    }

}
