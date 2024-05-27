import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokensTable1716676610498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TYPE token_purpose AS ENUM ('verify-email', 'password-recovery');

            CREATE TABLE IF NOT EXISTS tokens (
                id UUID PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                purpose token_purpose NOT NULL,
                person_id UUID NOT NULL,
                CONSTRAINT fk_persons_id FOREIGN KEY (person_id) REFERENCES persons(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS tokens;

            DROP TYPE IF EXISTS token_purpose;
        `)
    }

}
