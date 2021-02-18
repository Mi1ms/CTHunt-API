import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestAndReview1613674615573 implements MigrationInterface {
    name = 'QuestAndReview1613674615573';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "review" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "quest" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "level" "quest_level_enum" NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "solution" character varying NOT NULL, "tip" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "quest" ADD CONSTRAINT "FK_5d02a590f660db13e4f8488d087" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "quest" DROP CONSTRAINT "FK_5d02a590f660db13e4f8488d087"`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
        );
        await queryRunner.query(`DROP TABLE "quest"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }
}
