import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStablishmentsTable1720388009145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS stablishments (
                id UUID PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                nm VARCHAR(100) UNIQUE NOT NULL,
                slug VARCHAR(20) UNIQUE NOT NULL,
                owner_id UUID UNIQUE NOT NULL,
                CONSTRAINT fk_owners_id FOREIGN KEY (owner_id) REFERENCES owners(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS stablishments;
        `)
    }

}
