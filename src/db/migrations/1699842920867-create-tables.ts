import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1699842920867 implements MigrationInterface {
  name = 'CreateTables1699842920867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(100) NOT NULL, "profile_image_url" character varying(255), "state" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "number" integer NOT NULL, "zipcode" character varying(10) NOT NULL, "userId" uuid, CONSTRAINT "REL_51cb79b5555effaf7d69ba1cff" UNIQUE ("userId"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ticket_ticket_category_enum" AS ENUM('normal', 'vip', 'half_price')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "available_quantity" integer NOT NULL, "ticket_category" "public"."ticket_ticket_category_enum" NOT NULL DEFAULT 'normal', "price" numeric(8,2) NOT NULL, "eventId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tickets_sold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity_purchased" integer NOT NULL, "total_payment" numeric(8,2) NOT NULL, "ticketId" uuid, "userId" uuid, CONSTRAINT "PK_f16196abf64f13e00325f457f35" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'event_owner')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(120) NOT NULL, "username" character varying(80) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(120) NOT NULL, "description" text NOT NULL, "icon_url" character varying(255), "banner_url" character varying(255), "is_enabled" boolean NOT NULL DEFAULT true, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "state" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "number" integer NOT NULL, "zipcode" character varying(10) NOT NULL, "userId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, "comment" text, "eventId" uuid, "userId" uuid, CONSTRAINT "PK_981b7f01cef558ed12a3b34b62a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets_sold" ADD CONSTRAINT "FK_7e2c54740ac5361b4d602d82035" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets_sold" ADD CONSTRAINT "FK_b680267f71d9c779839983bdc04" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_review" ADD CONSTRAINT "FK_91375507155a497bbdd3a77c27d" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_review" ADD CONSTRAINT "FK_1fccbe977aca5bb80f61ef70e19" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_review" DROP CONSTRAINT "FK_1fccbe977aca5bb80f61ef70e19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_review" DROP CONSTRAINT "FK_91375507155a497bbdd3a77c27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets_sold" DROP CONSTRAINT "FK_b680267f71d9c779839983bdc04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets_sold" DROP CONSTRAINT "FK_7e2c54740ac5361b4d602d82035"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`,
    );
    await queryRunner.query(`DROP TABLE "event_review"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "tickets_sold"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TYPE "public"."ticket_ticket_category_enum"`);
    await queryRunner.query(`DROP TABLE "user_profile"`);
  }
}
