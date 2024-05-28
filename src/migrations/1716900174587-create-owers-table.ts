import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOwersTable1716900174587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS owers (
                id UUID PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                person_id UUID UNIQUE NOT NULL,
                CONSTRAINT fk_persons_id FOREIGN KEY (person_id) REFERENCES persons(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS owers;
        `)
    }

}
