import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonsTable1716592417655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS persons (
                id UUID PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                cpf CHAR(11) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                pass CHAR(60) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                is_email_verified BOOLEAN NOT NULL,
                is_first_login BOOLEAN NOT NULL,
                is_banned BOOLEAN NOT NULL
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS persons;
        `)
    }

}
