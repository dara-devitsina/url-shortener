import { MigrationInterface, QueryRunner } from "typeorm"

export class addUrlsTable1657283909604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "urls" ("code" varchar NOT NULL, "original_url" varchar NOT NULL, "short_url" varchar NOT NULL, "clicks_num" int NOT NULL DEFAULT 0, CONSTRAINT "uniq" UNIQUE ("short_url"), PRIMARY KEY ("code"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
